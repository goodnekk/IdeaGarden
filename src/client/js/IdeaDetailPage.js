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
                m("span", {class:"label"}, i18next.t('idea.data.votecount'))
            ]),
            m("span", {class: "metric"}, [
                m("span", {class:"number"}, idea.additions.length),
                m("span", {class:"label"}, i18next.t('idea.data.votecount'))
            ]),
            m.component(ShareButtons, idea)
        ]);
    }
};

var ShareButtons = {
    controller: function(){

    },
    view: function(ctrl, idea){
        return m("",[
            m("a", {target: "_blank", href: "https://www.facebook.com/sharer/sharer.php?u=https%3A//www.ideeenvijver.nl/%23/idea/"+idea._id},
                m("img", {class: "ui sharebutton", src:"/static/fb_share.png", title: i18next.t('idea.share.facebook')})
            ),
            m("a", {target: "_blank", href: "https://twitter.com/home?status=Bekijk%20mijn%20idee%20op%20%23idee%C3%ABnvijver!%20https%3A//www.ideeenvijver.nl/%23/idea/"+idea._id},
                m("img", {class: "ui sharebutton", src:"/static/tw_share.png", title: i18next.t('idea.share.twitter')})
            )
        ]);
    }
};

var IdeaText = {
    controller: function(idea){
        this.owner = false;
        if(idea.owner.name){
          if(idea.owner.name === Model.token().name){
            this.owner = true;
          }
        }

        this.editmode = false;
        this.edit = function(){
            this.editmode = true;
        };

        this.update = function(e){
            e.preventDefault();
            var elements = e.target.elements;
            Model.updateIdea({
                _id: idea._id,
                summary: elements.summary.value,
                content: elements.content.value
            });
            this.editmode = false;
        };
    },
    view: function(ctrl, idea) {
        if(!idea.content) {idea.content="";}
        return m("div", {class: "ui card"}, [
            (function(){
              if(idea.owner.name){
                  return m("p", {class: "label left"}, i18next.t('idea.text.by') + ' ' ,m("span", {class:"name"}, idea.owner.name));
              }
            })(),
            (function(){
                if(!ctrl.editmode){
                    return [
                        (function(){
                            if(ctrl.owner) return m("button", {class: "ui", onclick: ctrl.edit.bind(ctrl)},i18next.t('idea.text.edit'));
                        })(),
                        m("h1", {class: "ui break"}, idea.title),
                        m("p", {class: "label"}, i18next.t('idea.text.summary')),
                        m("p", {class: ""}, idea.summary),
                        (function(){
                            if(idea.content===""){
                                if(ctrl.owner) {
                                    return [
                                        m("p", {class: "label"}, i18next.t('idea.text.full')),
                                        m("p", i18next.t('idea.text.fulldesc')),
                                        m("button", {class: "ui middle", onclick: ctrl.edit.bind(ctrl)}, i18next.t('button.submit'))
                                    ];
                                }
                            } else {
                                return [
                                    m("p", {class: "label"}, i18next.t('idea.text.full')),
                                    m.component(MarkupBlock, {type: "content", text: idea.content})
                                ];
                            }

                        })()
                    ];
                } else  {
                    return m("form", {onsubmit:ctrl.update.bind(ctrl)}, [
                        m("h1", {class: "ui break"}, idea.title),
                        m("p", {class: "label"}, i18next.t('idea.text.summary_desc')),
                        m("textarea", {
                          name: "summary",
                          maxlength: "150",
                          class: "ui",
                          placeholder: i18next.t('idea.text.summaryplaceholder'),
                          value:idea.summary
                        }),
                        m("p", {class: "label"}, i18next.t('idea.text.full')),
                        m("textarea", {
                          class: "ui large",
                          name: "content",
                          placeholder: i18next.t('idea.text.fullplaceholder'),
                          value: idea.content
                        }),
                        m("button", {action: "submit", class: "ui"}, i18next.t('button.submit'))
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
        this.mediaDataUrl = m.prop("");

        this.onSwitch = function(id){
            this.category = id;
        };

        this.update = function(e){
            this.addition = e.target.value;
        };

        this.error = "";

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
                    }, function(){
                        window.scrollTo(0,document.body.scrollHeight);
                        this.addition = "";
                    }.bind(this));


                } else if(category === "image") {
                    Model.addAddition({
                        category: category,
                        content: {
                            description: this.addition,
                            image: this.mediaDataUrl()
                        }
                    },function(answer){
                        if(answer.succes){
                            this.addition = "";
                            this.mediaDataUrl("");
                            window.scrollTo(0,document.body.scrollHeight);
                        } else {
                          if(answer.message === "the image is too large"){
                            this.error = i18next.t('message.image_too_large');
                          } else if (answer.message === "not a jpeg image"){
                            this.error = i18next.t('message.no_jpeg');
                          } else {
                            this.error = i18next.t('error.general');
                          }
                        }
                    }.bind(this));
                }
            }
            return false;
        };
    },
    view: function(ctrl) {
        return m("div", {class: "ui card"}, [
            m.component(SwitchBar,
              [
                i18next.t('idea.tabs.addition'),
                i18next.t('idea.tabs.question'),
                i18next.t('idea.tabs.image')
              ],
              ctrl.onSwitch.bind(ctrl)),
            m("form", {onsubmit: ctrl.submit.bind(ctrl)},[
                function(){
                    if(ctrl.category === 0){
                        return m("textarea", {
                            value: ctrl.addition,class: "ui", placeholder: i18next.t('idea.tabs.addition_desc'),
                            onchange: ctrl.update.bind(ctrl)
                        });
                    } else if(ctrl.category === 1){
                        return m("textarea", {
                            value: ctrl.addition, class: "ui", placeholder: i18next.t('idea.tabs.question_desc'),
                            onchange: ctrl.update.bind(ctrl)
                        });
                    } else {
                        return m("div",[
                            m("textarea", {
                                value: ctrl.addition, class: "ui", placeholder: i18next.t('idea.tabs.image_desc'),
                                onchange: ctrl.update.bind(ctrl)
                            }),
                            m.component(MediaInput, ctrl.mediaDataUrl)
                        ]);

                    }
                }(),
                m("p", {class: "ui errorhelp"}, ctrl.error),
                m("button", {action: "submit", class: "ui"}, i18next.t('button.submit'))
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
        if(addition.category === "addition") {message = i18next.t('idea.log.addition');}
        if(addition.category === "question") {message = i18next.t('idea.log.question');}
        if(addition.category === "image") {message = i18next.t('idea.log.image');}

        return m("div", {class: "ui card addition"}, [
            (function(){
                if(addition.owner) return m("p", {class: "label"}, m("span", {class: "name"}, addition.owner.name), ' ' + message);
            })(),
            m.component(PostSection, addition),
            m.component(CommentSection, addition.comments),
            m.component(ReactionBar, addition._id),
        ]);
    }
};

var PostSection = {
  controller: function(){

  },
    view: function(ctrl, data){
        if(data.category === "origin") {
            return m("div", {class: "section"}, [
                m("h2", data.content.title),
                m.component(MarkupBlock, {type: "addition", text: data.content.description})
            ]);
        } else if (data.category === "addition" || data.category === "question") {
            return m("div", {class: "section"}, [
                m.component(MarkupBlock, {type: "addition", text: data.content.description})
            ]);
        } else if (data.category === "image") {
            return m("div", [
                m.component(MarkupBlock, {type: "addition", text: data.content.description}),
                m("div", {class: "image"},[
                    m("img", {src: "/images/"+data.content.src})
                ])
            ]);
        }
    }
};

var CommentSection = {
  controller: function(){

  },
    view: function(ctrl, comments) {
        if(comments.length > 0){
            return m("div", {class: "comment"}, comments.map(function(e){
                return m("p", [
                  (function(){
                    if(e.owner) return m("span", {class: "name"}, e.owner.name);
                  })(),
                    m.component(MarkupBlock, {type: "comment", text: e.comment})
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
                    m("span", {class: "commentbutton", onclick: ctrl.comment.bind(ctrl)}, [
                        m("img", {src: "static/comment.png"}),
                        m("span", i18next.t('idea.text.comment'))
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
                    class: "ui", name: "comment", placeholder: i18next.t('idea.text.commentplaceholder'),
                    config: ctrl.focus.bind(ctrl)
                }),
                m("button", {type: "submit", class: "ui", value: "submit"}, i18next.t('button.submit'))
            ]);
        } else {
            return m("",[]);
        }

    }
};

var MarkupBlock = {
    controller: function(){
        this.linkify = function(inputText){
            inputTextArray = inputText.split(" ");
            for (i = 0; i < inputTextArray.length; i++) {
              inputNew = inputTextArray[i];
              var altered = false;
              var replacedText, replacePattern1, replacePattern2, replacePattern3;
              //URLs starting with http://, https://, or ftp://
              replacePattern1 = /(\b(https?|ftp):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/gim;
              if (inputNew.match(replacePattern1)) {
                altered = true;
                inputTextArray[i] = m("a", {class: "external-link", href: inputNew, target: '_blank'}, inputNew.trunc(80) + ' ');
              }
              //URLs starting with "www." (without // before it, or it'd re-link the ones done above).
              replacePattern2 = /(^|[^\/])(www\.[\S]+(\b|$))/gim;
              if (inputNew.match(replacePattern2)) {
                altered = true;
                inputTextArray[i] = m("a", {class: "external-link", href: 'http://' + inputNew, target: '_blank'}, inputNew.trunc(80) + ' ');
              }
              //Change email addresses to mailto:: links.
              replacePattern3 = /(([a-zA-Z0-9\-\_\.])+@[a-zA-Z\_]+?(\.[a-zA-Z]{2,6})+)/gim;
              if (inputNew.match(replacePattern3)) {
                altered = true;
                inputTextArray[i] = m("a", {class: "external-link", href: 'mailto:' + inputNew}, inputNew.trunc(80));
              }
              if(!altered){
                inputTextArray[i] = inputNew + ' ';
              }
            }
            return inputTextArray;
        };
    },
    view: function(ctrl, args){
        if(args.type === "comment"){
            return m("span", {class: "message"}, ctrl.linkify(args.text));
        } else if(args.type === "addition"){
            return m("p",{class: "description"}, ctrl.linkify(args.text));
        } else if(args.type === "content"){
            return m("p", {class: ""}, ctrl.linkify(args.text));
        }

    }
};
