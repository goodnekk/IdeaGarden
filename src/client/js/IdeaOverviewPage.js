//=require Menu.js
//=require VoteButtons.js
//=require Models.js
//=require Badge.js

var IdeaOverviewPage = {
    view: function() {
        return m("div",[
            m.component(Menu),
            m("div", {class: "ui page"}, [
                m("div", {class: "ui grid"}, [
                    m("div", {class: "ui col-3"}, m.component(QuestionCard)),
                    m("div", {class: "ui col-9"}, m.component(SubmitCard)),
                ]),

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
                email: Model.token().succes ? "" : elements.email.value,
                agree: elements.license_ok.checked
            }, function(response){
                if(response.succes) {
                    m.route("/thanks");
                } else  {
                    if(response.message === "no title"){ this.error = "Vergeet niet om je idee een titel te geven!";}
                    if(response.message === "no summary"){ this.error = "Vergeet niet om je idee te omschrijven!";}
                    if(response.message === "no email"){ this.error = "Vergeet niet om je email adres in te vullen!";}
                    if(response.message === "no agree"){ this.error = "Vergeet niet akkoord te gaan met de voorwaarden!";}
                    if(response.message === "duplicate"){ this.error = "Er is al een idee met deze titel!";}
                    if(response.message === "new user failed"){ViewModel.loginPopup(true);}
                }
            }.bind(this));
            return false;
        };

        this.emailisvisible = function(){
            return Model.token().succes;
        };

        this.error = "";
    },
    view: function(ctrl) {
        return m("form", {class: "ui card", onsubmit: ctrl.submit.bind(ctrl)}, [
            m("input", {class: "ui", name: "title", placeholder: "Titel..."}),
            m("textarea", {maxlength: "150", class: "ui", name: "summary", placeholder: "Omschrijf kort je idee (Je kunt dit later nog uitbreiden)..."}),
            (function(){
                if(!ctrl.emailisvisible()) return m("input", {class: "ui", name: "email", placeholder: "Email adres..."});
            })(),
            m("div",[
                m("input", {class: "checkbox", type:"checkbox", name: "license_ok", id: "license_ok"}),
                m("label", {for: 'license_ok'},"Mijn idee mag worden ", m("a", {target: "_blank", href:"/#/rules"}, "gedeeld en bewerkt")),
            ]),
            m("p", {class: "ui errorhelp"}, ctrl.error),
            m("button", {type:"submit", class: "ui"}, "Verstuur")
        ]);
    }
};


var IdeaGrid = {
    controller: function(){
        this.cards = Model.getOverview();
    },
    view: function(ctrl){
        return m("div", {class: "ui grid"},
            ctrl.cards().map(function(e){
                return m("div", {class: "ui col-6"}, [
                    m.component(IdeaCard, e)
                ]);
            })
        );
    }
};

var IdeaCard = {
    controller: function(data){
        this.id = "";
        this.open = function(){
            m.route("/idea/"+this.id);
        };

        this.onvote = function(value){
            Model.voteIdeaOverview(this.id, value);
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
                    m("span", {class:"label"}, "kudos")
                ])
            ])
        ]);
    }
};
