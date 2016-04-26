//=require Menu.js
//=require VoteButtons.js
//=require Models.js

var IdeaDetailPage = {
    controller: function(){
        this.idea = Model.getDetail();
    },
    view: function(ctrl) {
        var idea = ctrl.idea();
        return m("div", [
            m.component(Menu),
            m("div", {class: "ui page"}, [
                m("div", {class: "ui grid"}, [
                    m("div", {class: "ui col-3"}, [
                        m("div", {class: "ui card"}, "hello this is a card"),
                    ]),
                    m("div", {class: "ui col-7"}, [
                        m.component(IdeaText, idea),
                        m.component(DoAddition),
                        m.component(AdditionOverview, idea.additions),
                    ])
                ]),
            ])
        ]);
    }
};

var IdeaText = {
    view: function(ctrl, idea) {
        return m("div", {class: "ui card"}, [
            m("h1", {class: "ui"}, idea.title),
            m("p", {class: ""}, idea.summary)
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
    view: function(ctrl, additions) {
        return m("div", additions.map(function(e, index){
            return m.component(AdditionCard, e, index);
        }));
    }
};

var AdditionCard = {
    view: function(ctrl, addition, index) {
        return m("div", {class: "ui card addition"}, [
            m("p", {class: "label"}, addition.message),
            m.component(PostSection, addition),
            m.component(CommentSection, addition.comments),
            m.component(ReactionBar, index),
        ]);
    }
};

var PostSection = {
    view: function(ctrl, data){
        if(data.category === "origin") {
            return m("div", {class: "section"}, [
                m("h2", data.content.title),
                m("p",{class: "description"}, data.content.description)
            ]);
        } else if (data.category === "addition") {
            return m("div", {class: "section"}, [
                m("p",{class: "description"}, data.content.description)
            ]);
        } else if (data.category === "image") {
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
            this.close = function(){
                this.show = false;
            };
            this.show = false;
        },
        view: function(ctrl, index){
            return m("div",[
                m("div", {class:"reactionbar"}, [
                    m.component(VoteButtons),
                    m("span", {class: "commentbutton", onclick: ctrl.comment.bind(ctrl)}, [
                        m("img", {src: "static/comment.png"}),
                        m("span", "comment")
                    ]),
                ]),
                (function(){if(ctrl.show) return m.component(AddComment, index, ctrl.close.bind(ctrl));})()
            ]);
        }
};

var AddComment = {
    controller: function(index, closeCallback){
        this.focus = function(e){
            e.focus();
        };

        this.value = "";
        this.update = function(e){
            this.value = e.target.value;
        };
        this.comment = function(e){
            e.preventDefault();
            Model.commentOnAddition(index, this.value);
            this.value = "";
            closeCallback();
        };
    },
    view: function(ctrl, data) {
        return m("form", {onsubmit: ctrl.comment.bind(ctrl), class: "addcomment"}, [
            m("input", {value: ctrl.value, config: ctrl.focus, onchange: ctrl.update.bind(ctrl), class: "ui", placeholder: "Write your comment..."}),
            m("button", {type: "submit", class: "ui", value: "submit"}, "submit")
        ]);
    }
};
