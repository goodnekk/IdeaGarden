//=require Menu.js
//=require VoteButtons.js

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
        this.focus = function(e){
            e.focus();
        }
    },
    view: function(ctrl) {
        return m("div", {class: "ui card"}, [
            m("input", {config: ctrl.focus, class: "ui", placeholder: "Give your idea a title..."}),
            m("textarea", {class: "ui", placeholder: "Describe your idea..."}),
            m("input", {class: "ui", placeholder: "Email Adress..."}),
            m("button", {class: "ui"}, "submit")
        ]);
    }
};


var IdeaGrid = {
    view: function(){
        var cards = [
            {
                "title": "Monorail",
                "summary": "Er moet een monorail komen van de Universiteit naar Strijp-s. Maar je moet zelf fietsen.",
                "votes": 20,
                "additions": 2,
                "age": 5
            },
            {
                "title": "We gaan per Schaap!",
                "summary": "We laten schapen heen en weer pendelen. De schapen trekken kleine karretjes vooruit waar we dan in kunnen zitten.",
                "votes": -2,
                "additions": 5,
                "age": 3
            },
            {
                "title": "Teleportatie",
                "summary": "We desintegreren je moleculaire structuur en bouwen die in strijp-s weer op. Het heeft nagenoeg geen bij-effecten.",
                "votes": 4,
                "additions": 0,
                "age": 10
            },
            {
                "title": "Je kan gewoon met de bus",
                "summary": "Serieus doe niet zo moeilijk",
                "votes": 30,
                "additions": 1,
                "age": 7
            }
        ];

        return m("div", {class: "ui grid"},
            cards.map(function(e){
                return m("div", {class: "ui col-6"}, [
                    m.component(IdeaCard, e)
                ]);
            })
        );
    }
};

var IdeaCard = {
    controller: function(data){
        this.open = function(){
            m.route("/idea/"+data.title);
        };
    },
    view: function(ctrl, data){
        return m("div", {class: "ui card ideacard", onclick: ctrl.open}, [
            m("div", {class: "top"},[
                m("div", {class: "status"}, [
                    m("img", {src:"static/stage2.png"})
                ]),
                m("div", {class: "info"}, [
                    m("h3",{class: "ui"}, data.title),
                    m("p", data.summary)
                ]),
            ]),
            m("div", {class: "bottom"},[
                m.component(VoteButtons),
                m("span", {class: "metric"}, [
                    m("span", {class:"number"}, data.votes),
                    m("span", {class:"label"}, "votes")
                ]),
                m("span", {class: "metric"}, [
                    m("span", {class:"number"}, data.additions),
                    m("span", {class:"label"}, "additions")
                ]),
                m("span", {class: "metric"}, [
                    m("span", {class:"number"}, data.age),
                    m("span", {class:"label"}, "days ago")
                ])
            ])
        ]);
    }
};
