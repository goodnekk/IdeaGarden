//=require Menu.js

var DashboardPage = {
    controller: function(){
        this.idea = Model.getDetail();
        this.token = Model.token;

        this.submit = function(e){
            
        }
    },
    view: function(ctrl) {
        var idea = ctrl.idea();
        return m("div", [
            m.component(Menu),
            m("div", {class: "ui page"}, [
                m("div", {class: "ui grid"}, [
                    m("div", {class: "ui col-6 center"}, [
                        m("div", {class: "ui card"}, [
                            m("form", {class: "ui", onsubmit: ctrl.submit.bind(ctrl)}, [
                                m("label", {class: "ui"}, "Gebruikersnaam"),
                                m("input", {class: "ui", name: "title", placeholder: "", value: ctrl.token().name}),
                                m("label", {class: "ui"}, "Email adres"),
                                m("input", {class: "ui", name: "title", placeholder: "", value: ctrl.token().email}),
                                m("button", {type:"submit", class: "ui"}, "wijzigingen opslaan")
                            ]),
                        ]),
                    ]),
                ]),
            ])
        ]);
    }
};
