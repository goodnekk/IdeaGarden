//=require Menu.js
//=require VoteButtons.js

var IdeaDetailPage = {
    view: function() {
        return m("div", [
            m.component(Menu),
            m("div", {class: "ui page"}, [
                m("div", {class: "ui grid"}, [
                    m("div", {class: "ui col-3"}, [
                        m("div", {class: "ui card"}, "hello this is a card"),
                    ]),
                    m("div", {class: "ui col-7"}, [
                        m.component(IdeaText),
                        m.component(DoAddition),
                        m.component(AdditionOverview),
                    ])
                ]),
            ])
        ]);
    }
};

var IdeaText = {
    view: function() {
        return m("div", {class: "ui card"}, [
            m("h1", {class: "ui"}, "Fiets - Monorail"),
            m("p", {class: ""}, "Er moet een monorail komen van de Universiteit naar Strijp-s. Maar je moet zelf fietsen.")
        ]);
    }
};

var DoAddition = {
    view: function() {
        return m("div", {class: "ui card"}, [
            m("div", {class: "ui switchbar grid"}, [
                m("span", {class: "ui switch selected col-4"}, "Make Addition"),
                m("span", {class: "ui switch col-4"}, "Ask Question"),
                m("span", {class: "ui switch col-4"}, "Add Image")
            ]),
            m("textarea", {class: "ui", placeholder: "Write your Addition"}),
            m("button", {class: "ui"}, "submit")
        ]);
    }
};

var AdditionOverview = {
    view: function() {
        var AdditionList = [
            {
                message: "Kees heeft een idee geplant",
                type: "origin",
                content: {
                    title: "Monorail",
                    description: "Er moet een monorail komen."
                },
                comments: []
            },
            {
                message: "Anouk heeft een afbeelding toegevoegd",
                type: "image",
                content: {
                    description: "Misschien kunnen we er zo'n fiets monorail van maken.",
                    src: "static/shweeb.jpg"
                },
                comments: []
            },
            {
                message: "Peter stelde een vraag",
                type: "addition",
                content: {
                    description: "Wie gaat dat allemaal betalen?"
                },
                comments: [
                    {
                        name: "Anja",
                        comment: "Gaat de gemeente dat niet betalen?"
                    },
                    {
                        name: "Gijs",
                        comment: "Nee de gemeente kan dat allemaal niet betalen hoor, daar hebben ze geen geld voor."
                    },
                    {
                        name: "Fred",
                        comment: "Wij willen het wel bouwen maar alleen als we voor eeuwig de exploitatie rechten krijgen."
                    }
                ]
            },
        ];

        return m("div",AdditionList.map(function(e){
            return m.component(AdditionCard, e);
        }));
    }
};

var AdditionCard = {
    view: function(ctrl, data) {
        return m("div", {class: "ui card addition"}, [
            m("p", {class: "label"}, data.message),
            m.component(PostSection, data),
            m.component(CommentSection, data.comments),
            m.component(ReactionBar),
        ]);
    }
};

var PostSection = {
    view: function(ctrl, data){
        if(data.type === "origin") {
            return m("div", {class: "section"}, [
                m("h2", data.content.title),
                m("p",{class: "description"}, data.content.description)
            ]);
        } else if (data.type === "addition") {
            return m("div", {class: "section"}, [
                m("p",{class: "description"}, data.content.description)
            ]);
        } else if (data.type === "image") {
            return m("div", [
                m("p", {class: "description"}, data.content.description),
                m("div", {style: "background-image: url('"+data.content.src+"');", class: "image"})
            ]);
        }
    }
};

var CommentSection = {
    view: function(ctrl, comments) {
        return m("div", {class: "comment section"}, comments.map(function(e){
            return m("p", [
                m("span", {class: "name"}, e.name),
                m("span", {class: "message"}, e.comment)
            ]);
        }));
    }
};

var ReactionBar = {
        controller: function(){
            this.comment = function(){
                this.show = true;
            };
            this.show = false;
        },
        view: function(ctrl, data){
            return m("div",[
                m("div", {class:"reactionbar"}, [
                    m.component(VoteButtons),
                    m("span", {class: "commentbutton", onclick: ctrl.comment.bind(ctrl)}, [
                        m("img", {src: "static/comment.png"}),
                        m("span", "comment")
                    ]),
                ]),
                (function(){if(ctrl.show) return m.component(AddComment);})()
            ]);
        }
};

var AddComment = {
    controller: function(){
        this.focus = function(e){
            e.focus();
        };
    },
    view: function(ctrl, data) {
        return m("div", {class: "addcomment"}, [
            m("input", {config: ctrl.focus, class: "ui", placeholder: "Write your comment..."}),
            m("button", {class: "ui"}, "submit")
        ]);
    }
};
