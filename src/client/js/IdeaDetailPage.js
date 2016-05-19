//=require Menu.js
//=require VoteButtons.js
//=require Models.js
//=require SwitchBar.js
//=require MediaInput.js

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
    controller: function(){
        this.token = Model.token;
        this.addition = "";
        this.category = 0;

        //this if for file uploads
        this.mediaDataUrl = m.prop();

        this.onSwitch = function(id){
            this.category = id;
        };

        this.update = function(e){
            this.addition = e.target.value;
        };

        this.submit = function(e){
            e.preventDefault();

            var category = "addition";
            if(this.category === 1) category = "question";
            if(this.category === 2) category = "image";


            if(!Model.token().succes){
                ViewModel.loginPopup(true);
            } else {
                if(category === "addition" || category === "question"){
                    Model.addAddition({
                        category: category,
                        content: {
                            description: this.addition
                        }
                    });
                    this.addition = "";
                } else if(category === "image") {
                    Model.addAddition({
                        category: category,
                        content: {
                            description: this.addition,
                            image: this.mediaDataUrl()
                        }
                    });
                    this.addition = "";
                    this.mediaDataUrl("");
                }
            }
            return false;
        };
    },
    view: function(ctrl) {
        return m("div", {class: "ui card"}, [
            m.component(SwitchBar, ["Make Addition", "Ask Question", "Add Image"], ctrl.onSwitch.bind(ctrl)),
            m("form", {onsubmit: ctrl.submit.bind(ctrl)},[
                function(){
                    if(ctrl.category === 0){
                        return m("textarea", {
                            value: ctrl.addition,class: "ui", placeholder: "Write your Addition",
                            onchange: ctrl.update.bind(ctrl)
                        });
                    } else if(ctrl.category === 1){
                        return m("textarea", {
                            value: ctrl.addition, class: "ui", placeholder: "Ask your Question",
                            onchange: ctrl.update.bind(ctrl)
                        });
                    } else {
                        return m("div",[
                            m("textarea", {
                                value: ctrl.addition, class: "ui", placeholder: "Describe your image",
                                onchange: ctrl.update.bind(ctrl)
                            }),
                            m.component(MediaInput, ctrl.mediaDataUrl)
                        ]);

                    }
                }(),
                m("button", {action: "submit", class: "ui"}, "submit")
            ])
        ]);
    }
};

var AdditionOverview = {
    view: function(ctrl, additions) {
        return m("div", additions.map(function(e){
            return m.component(AdditionCard, e);
        }));
    }
};

var AdditionCard = {
    view: function(ctrl, addition, index) {
        return m("div", {class: "ui card addition"}, [
            m("p", {class: "label"}, addition.owner.name + " voegde een " + addition.category + " toe"),
            m.component(PostSection, addition),
            m.component(CommentSection, addition.comments),
            m.component(ReactionBar, addition._id),
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
        } else if (data.category === "addition" || data.category === "question") {
            return m("div", {class: "section"}, [
                m("p",{class: "description"}, data.content.description)
            ]);
        } else if (data.category === "image") {
            return m("div", [
                m("p", {class: "description"}, data.content.description),
                m("div", {style: "background-image: url('/images/"+data.content.src+"');", class: "image"})
            ]);
        }
    }
};

var CommentSection = {
    view: function(ctrl, comments) {
        return m("div", {class: "comment"}, comments.map(function(e){
            return m("p", [
                m("span", {class: "name"}, e.owner.name),
                m("span", {class: "message"}, e.comment)
            ]);
        }));
    }
};

var ReactionBar = {
        controller: function(){
            this.token = Model.token;

            this.comment = function(){
                if(!Model.token().succes){
                    ViewModel.loginPopup(true);
                } else {
                    this.show = true;
                }
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
                m.component(AddComment, ctrl.show ,index, ctrl.close.bind(ctrl))
            ]);
        }
};

var AddComment = {
    controller: function(show, index, closeCallback){
        this.exists = false;
        this.focus = function(e){
            if(!this.exists){
                e.focus();
                this.exists = true;
            }
        };

        this.comment = function(e){
            e.preventDefault();
            this.exists = false;
            Model.addComment(index, e.target.elements.comment.value);
            closeCallback();
        };
    },
    view: function(ctrl, show, index) {
        if(show){
            return m("form", {
                    class: "addcomment", onsubmit: ctrl.comment.bind(ctrl),
                }, [
                m("input", {
                    class: "ui", name: "comment", placeholder: "Write your comment...",
                    config: ctrl.focus.bind(ctrl)
                }),
                m("button", {type: "submit", class: "ui", value: "submit"}, "submit")
            ]);
        } else {
            return m("",[]);
        }

    }
};
