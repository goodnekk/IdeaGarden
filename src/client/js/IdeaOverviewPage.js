//=require Menu.js
//=require VoteButtons.js
//=require Models.js
//=require Badge.js

var IdeaOverviewPage = {
    controller: function(){
        this.momentcheck = moment([2016, 6, 27]).diff(moment(),'days');
    },
    view: function(ctrl) {
        return m("div",[
            m.component(Menu),
            m("div", {class: "ui page"}, [
                m("div", {class: "ui card colorless"}, [
                    m("div", {class: "centerimage"},[
                        m("h1", {class: "center"},"Nog "+(ctrl.momentcheck+1)+" dagen om mee te doen!"),
                        m("p", "De Ideeënvijver is nog open tot en met 26 Juli. Van 27 juli tot en met 30 juli gaat de jury in beraad over wie de winnaars zijn. Op 31 juli worden de winnaars bekend gemaakt!")
                    ]),
                ]),
                (function(){
                    if(ctrl.momentcheck >= 0){
                        return m("div", {class: "ui grid"}, [
                            m("div", {class: "ui col-3"}, m.component(QuestionCard)),
                            m("div", {class: "ui col-9"}, m.component(SubmitCard)),
                        ]);
                    }
                })(),
                m.component(IdeaGrid),
                m.component(Footer)
            ])
        ]);
    }
};

var QuestionCard = {
    view: function(){
        return m("div", {class: "ui card"}, [
            m("img", {class: "ui fit", src: "static/route.png"}),
            m("h3", "Hoe zou jij het Centrum met Strijp-s verbinden?"),
        ]);
    }
};

var SubmitCard = {
    controller: function(){
        this.submit = function(e){
            e.preventDefault();

            var elements = e.target.elements;
            Model.addIdea({
                title: elements.title.value,
                summary: elements.summary.value,
                email: Model.token().success ? "" : elements.email.value,
                agree: elements.license_ok.checked
            }, function(response){
                if(response.success) {
                    m.route("/thanks");
                } else  {
                    if(response.message === "no title"){ this.error = i18next.t('error.notitle');}
                    if(response.message === "no summary"){ this.error = i18next.t('error.nosummary');}
                    if(response.message === "no email"){ this.error = i18next.t('error.noemail');}
                    if(response.message === "no agree"){ this.error = i18next.t('error.noagree');}
                    if(response.message === "duplicate"){ this.error = i18next.t('error.duplicatetitle');}
                    if(response.message === "new user failed"){ViewModel.loginPopup(true);}
                }
            }.bind(this));
            return false;
        };

        this.emailisvisible = function(){
            return Model.token().success;
        };

        this.error = "";
    },
    view: function(ctrl) {
        return m("form", {class: "ui card", onsubmit: ctrl.submit.bind(ctrl)}, [
            m("input", {class: "ui", name: "title", placeholder: i18next.t('idea.titleplaceholder')}),
            m("textarea", {maxlength: "150", class: "ui", name: "summary", placeholder: i18next.t('idea.summaryplaceholder')}),
            (function(){
                if(!ctrl.emailisvisible()) return m("input", {class: "ui", name: "email", placeholder: i18next.t('idea.emailplaceholder')});
            })(),
            m("div",[
                m("input", {class: "checkbox", type:"checkbox", name: "license_ok", id: "license_ok"}),
                m("label", {for: 'license_ok'}, i18next.t('idea.agree') + " ", m("a", {target: "_blank", href:"/#/rules"}, i18next.t('idea.rules'))),
            ]),
            m("p", {class: "ui errorhelp"}, ctrl.error),
            m("button", {type:"submit", class: "ui"}, i18next.t('button.submit'))
        ]);
    }
};


var IdeaGrid = {
    controller: function(){
        this.cards = Model.getOverview();
        this.mode = "0";
        this.changeSort = function(e){
            this.mode = e.target.value;
        };
    },
    view: function(ctrl){

        var cards = ctrl.cards();

        if(ctrl.mode === "1"){
            cards = cards.concat().sort(function(a,b){
                return moment(b.created).diff(moment(a.created));
            });
        }
        if(ctrl.mode === "2"){
            cards = cards.concat().sort(function(a,b){
                return moment(b.updated).diff(moment(a.updated));
            });
        }
        console.log(cards);

        return m("div", {class: "ui grid"},[
            m("div", {class: "ui col-12"},[
                m("div", {class: "ui card colorless nopadding"},[
                    m("select",{class:"ui", onchange: ctrl.changeSort.bind(ctrl)},[
                        m("option", {value: 0},i18next.t('idea.sort.popular')),
                        m("option", {value: 1},i18next.t('idea.sort.new')),
                        m("option", {value: 2},i18next.t('idea.sort.updated')),
                    ]),
                ]),
            ]),
            cards.map(function(e){
                return m("div", {class: "ui col-6"}, [
                    m.component(IdeaCard, e)
                ]);
            })
        ]);
    }
};

var IdeaCard = {
    controller: function(data){
        this.id = "";
        this.open = function(){
            m.route("/idea/"+this.id);
        };

        this.onvote = function(value){
            Model.voteIdeaOverview(this.id, value, function(d){
                if(!d.succes){
                    if(d.message === "verification failed"){
                        ViewModel.loginPopup(true);
                    }
                }
            });
        };
    },
    view: function(ctrl, data){
        ctrl.id = data._id;
        return m("div", {class: "ui card ideacard"}, [
            m("div", {class: "top"},[
                m("div", {class: "status"}, [
                    m.component(Badge, data.badge)
                ]),
                m("div", {class: "info"}, [
                    m("h3",{class: "ui", onclick: ctrl.open.bind(ctrl)}, data.title),
                    m("p", data.summary)
                ]),
            ]),
            m("div", {class: "bottom"},[
                m.component(VoteButtons, data.yourvote, ctrl.onvote.bind(ctrl)),
                m("span", {class: "metric"}, [
                    m("span", {class:"number"}, data.votecount),
                    m("span", {class:"label"}, i18next.t('idea.data.votecount'))
                ])
            ])
        ]);
    }
};
