//=require Menu.js

var ConfirmPage = {
    controller: function(){
        this.submit = function(e){
            e.preventDefault();

            var elements = e.target.elements;

            Model.confirmUser({
                email: elements.email.value,
                name: elements.name.value,
                password: elements.password.value
            });

            return false;
        };
    },
    view: function(ctrl) {
        return m("div", [
            m("div", {class: "ui page"}, [
                m("div", {class: "ui grid"}, [
                    m("div", {class: "ui col-6 center"}, [
                        m("div", {class: "ui card"}, [
                            m("form", {class: "ui", onsubmit: ctrl.submit.bind(ctrl)}, [
                                m("label", {class: "ui"}, "Email"),
                                m("input", {class: "ui", name: "email", placeholder: ""}),
                                m("label", {class: "ui"}, "Gebruikersnaam"),
                                m("input", {class: "ui", name: "name", placeholder: ""}),
                                m("label", {class: "ui"}, "Wachtwoord"),
                                m("input", {type: "password" ,class: "ui", name: "password", placeholder: ""}),
                                m("button", {type:"submit", class: "ui"}, "Registreren!")
                            ]),
                        ]),
                    ]),
                ]),
            ])
        ]);
    }
};
