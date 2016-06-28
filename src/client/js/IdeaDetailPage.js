//=require Menu.js
//=require VoteButtons.js
//=require Models.js
//=require SwitchBar.js
//=require MediaInput.js
//=require Badge.js

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
                    m("div", {class: "ui col-2"}, [
                        m.component(IdeaData, idea),
                    ]),
                    m("div", {class: "ui col-8"}, [
                        m.component(IdeaText, idea),
                        m.component(DoAddition),
                        m.component(AdditionOverview, idea.additions),
                    ]),
                    m.component(Footer)
                ]),
            ])
        ]);
    }
};

var IdeaData = {
    controller: function(idea){
        this.onvote = function(value){
            Model.voteIdeaDetail(idea._id, value);
        };
    },
    view: function(ctrl, idea) {
        return m("div", {class: "ui card stats"}, [
            m.component(Badge, idea.additions.length),
            m.component(VoteButtons, idea.yourvote, ctrl.onvote.bind(ctrl)),
            m("span", {class: "metric"}, [
                m("span", {class:"number"}, idea.votecount),
                m("span", {class:"label"}, "kudos")
            ]),
            m("span", {class: "metric"}, [
                m("span", {class:"number"}, idea.additions.length),
                m("span", {class:"label"}, "aanvullingen")
            ])
        ]);
    }
};

var IdeaText = {
    controller: function(idea){
        this.owner = false;
        if(idea.owner.name == Model.token().name){
            this.owner = true;
        }

        this.editmode = false;
        this.edit = function(){
            this.editmode = true;
        };

        this.update = function(e){
            e.preventDefault();
            var elements = e.target.elements;
            console.log({
                summary: elements.summary.value
            });
            Model.updateIdea({
                _id: idea._id,
                summary: elements.summary.value
            });
            this.editmode = false;
        };
    },
    view: function(ctrl, idea) {
        return m("div", {class: "ui card"}, [
            (function(){
                if(idea.owner.name) {return m("p", {class: "label left"}, "Idee van: "+idea.owner.name);}
            })(),
            (function(){
                if(!ctrl.editmode){
                    return [
                        (function(){
                            if(ctrl.owner) return m("button", {class: "ui", onclick: ctrl.edit.bind(ctrl)},"Idee Bewerken");
                        })(),
                        m("h1", {class: "ui break"}, idea.title),
                        m("p", {class: ""}, idea.summary)
                    ];
                } else  {
                    return m("form", {onsubmit:ctrl.update.bind(ctrl)}, [
                        m("h1", {class: "ui break"}, idea.title),
                        m("p", {class: "label"}, "Korte samenvatting:"),
                        m("textarea", {name: "summary", maxlength: "150", class: "ui", placeholder: "Samenvatting van je idee...", value:idea.summary}),
                        m("p", {class: "label"}, "Gedetailleerde uitwerking:"),
                        m("textarea", {class: "ui large", name: "content", placeholder: "Omschrijf je idee..."}),
                        m("button", {action: "submit", class: "ui"}, "Idee Opslaan")
                    ]);
                }
            })()

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
            m.component(SwitchBar, ["Aanvulling", "Vraag", "Afbeelding"], ctrl.onSwitch.bind(ctrl)),
            m("form", {onsubmit: ctrl.submit.bind(ctrl)},[
                function(){
                    if(ctrl.category === 0){
                        return m("textarea", {
                            value: ctrl.addition,class: "ui", placeholder: "Doe een aanvulling op dit idee",
                            onchange: ctrl.update.bind(ctrl)
                        });
                    } else if(ctrl.category === 1){
                        return m("textarea", {
                            value: ctrl.addition, class: "ui", placeholder: "Stel een vraag over dit idee",
                            onchange: ctrl.update.bind(ctrl)
                        });
                    } else {
                        return m("div",[
                            m("textarea", {
                                value: ctrl.addition, class: "ui", placeholder: "Omschrijf de afbeelding",
                                onchange: ctrl.update.bind(ctrl)
                            }),
                            m.component(MediaInput, ctrl.mediaDataUrl)
                        ]);

                    }
                }(),
                m("button", {action: "submit", class: "ui"}, "Verstuur")
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
        var message = "";
        if(addition.category === "addition") {message = " heeft een aanvulling gedaan:";}
        if(addition.category === "question") {message = " heeft een vraag gesteld:";}
        if(addition.category === "image") {message = " heeft een afbeelding toegevoed:";}

        return m("div", {class: "ui card addition"}, [
            m("p", {class: "label"}, addition.owner.name + message),
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
                //m("div", {style: "background-image: url('/images/"+data.content.src+"');", class: "image"})
                m("div", {class: "image"},[
                    m("img", {src: "/images/"+data.content.src})
                ])
            ]);
        }
    }
};

var CommentSection = {
    view: function(ctrl, comments) {
        if(comments.length > 0){
            return m("div", {class: "comment"}, comments.map(function(e){
                return m("p", [
                    m("span", {class: "name"}, e.owner.name),
                    m("span", {class: "message"}, e.comment)
                ]);
            }));
        } else {
            return m("");
        }
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
                    //m.component(VoteButtons),
                    m("span", {class: "commentbutton", onclick: ctrl.comment.bind(ctrl)}, [
                        m("img", {src: "static/comment.png"}),
                        m("span", "Reageer")
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
                    class: "ui", name: "comment", placeholder: "Uw reactie...",
                    config: ctrl.focus.bind(ctrl)
                }),
                m("button", {type: "submit", class: "ui", value: "submit"}, "Verstuur")
            ]);
        } else {
            return m("",[]);
        }

    }
};
