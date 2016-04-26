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
    view: function(ctrl) {
        return m("div", {class: "ui card"}, [
            m("input", {class: "ui", placeholder: "Give your idea a title..."}),
            m("textarea", {class: "ui", placeholder: "Describe your idea..."}),
            m("input", {class: "ui", placeholder: "Email Adress..."}),
            m("button", {class: "ui"}, "submit")
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
        this.open = function(){
            m.route("/idea/"+data.id);
        };

        this.onvote = function(value){
            Model.voteIdeaOverview(data.id, value);
        };
    },
    view: function(ctrl, data){
        return m("div", {class: "ui card ideacard"}, [
            m("div", {class: "top"},[
                m("div", {class: "status"}, [
                    m("img", {src:"static/stage2.png"})
                ]),
                m("div", {class: "info"}, [
                    m("h3",{class: "ui", onclick: ctrl.open}, data.title),
                    m("p", data.summary)
                ]),
            ]),
            m("div", {class: "bottom"},[
                m.component(VoteButtons, ctrl.onvote),
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
