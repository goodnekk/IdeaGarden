//=require Menu.js
//=require Footer.js

var ConfirmPage = {
    controller: function(){
        this.error = "";
        this.submit = function(e){
            e.preventDefault();
            var elements = e.target.elements;
            Model.confirmUser({
                name: elements.name.value,
                password: elements.password.value
            }, function(response){
                if(response.succes) {
                    m.route("/welcome");
                } else {
                    if(response.message === "no name"){ this.error = "Je bent vergeten je naam in te vullen";}
                    if(response.message === "no password"){ this.error = "Verzin een wachtwoord";}
                    if(!response.message){ this.error = "Registratie mislukt";}
                }
            }.bind(this));
            return false;
        };
    },
    view: function(ctrl) {
        return m("div", [
            m.component(Menu),
            m("div", {class: "ui page"}, [
                m("div", {class: "ui grid"}, [
                    m("div", {class: "ui col-6 center"}, [
                        m("div", {class: "ui card"}, [
                            m("form", {class: "ui", onsubmit: ctrl.submit.bind(ctrl)}, [
                                m("p","Welkom terug bij Ideeënvijver. Geef je naam en verzin een wachtwoord."),
                                m("input", {class: "ui", name: "name", placeholder: "Gebruikersnaam..."}),
                                m("input", {type: "password" ,class: "ui", name: "password", placeholder: "Wachtwoord..."}),
                                m("p", {class: "ui errorhelp"}, ctrl.error),
                                m("button", {type:"submit", class: "ui"}, "Bevestig registratie")
                            ]),
                        ]),
                    ]),
                ])
            ])
        ]);
    }
};
