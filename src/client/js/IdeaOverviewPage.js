//=require Menu.js
//=require VoteButtons.js
//=require Models.js

var IdeaOverviewPage = {
    view: function() {
        return m("div",[
            m.component(Menu),
            m("div", {class: "ui page"}, [
                m("div", {class: "ui grid"}, [
                    m("div", {class: "ui col-3"}, [
                        m("div", {class: "ui card"}, "hello this is a card"),
                    ]),
                    m("div", {class: "ui col-9"}, m.component(SubmitCard)),
                ]),

                m.component(IdeaGrid)
            ])
        ]);
    }
};

var SubmitCard = {
    controller: function(){
        this.title = "";
        this.onTitle = function(e){
            this.title = e.target.value;
        };

        this.summary = "";
        this.onSummary = function(e){
            this.summary = e.target.value;
        };

        this.email = "";
        this.onEmail = function(e){
            this.email = e.target.value;
        };

        this.submit = function(e){
            e.preventDefault();
            Model.addIdea({
                title: this.title,
                summary: this.summary,
                email: this.email
            });

            this.title = "";
            this.summary = "";
            this.email = "";

            return false;
        };
    },
    view: function(ctrl) {
        return m("form", {class: "ui card", onsubmit: ctrl.submit.bind(ctrl)}, [
            m("input", {
                class: "ui", placeholder: "Geef je idee een titel...",
                value: ctrl.title, onchange: ctrl.onTitle.bind(ctrl)
            }),
            m("textarea", {
                class: "ui", placeholder: "Omschrijf je idee...",
                value: ctrl.summary, onchange: ctrl.onSummary.bind(ctrl)
            }),
            m("input", {
                class: "ui", placeholder: "Email adres...",
                value: ctrl.email, onchange: ctrl.onEmail.bind(ctrl)
            }),
            m("button", {type:"submit", class: "ui"}, "submit")
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
        this.id = data.id;
        this.open = function(){
            m.route("/idea/"+this.id);
        };

        this.onvote = function(value){
            Model.voteIdeaOverview(this.id, value);
        };
    },
    view: function(ctrl, data){
        ctrl.id = data.id;
        return m("div", {class: "ui card ideacard"}, [
            m("div", {class: "top"},[
                m("div", {class: "status"}, [
                    m("img", {src:"static/stage2.png"})
                ]),
                m("div", {class: "info"}, [
                    m("h3",{class: "ui", onclick: ctrl.open.bind(ctrl)}, data.title),
                    m("p", data.summary)
                ]),
            ]),
            m("div", {class: "bottom"},[
                m.component(VoteButtons, ctrl.onvote.bind(ctrl)),
                m("span", {class: "metric"}, [
                    m("span", {class:"number"}, data.votes),
                    m("span", {class:"label"}, "kudos")
                ])
            ])
        ]);
    }
};
