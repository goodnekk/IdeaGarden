//=require Menu.js

var ConfirmPage = {
    controller: function(){
        this.error = "";
        this.submit = function(e){
            e.preventDefault();
            var elements = e.target.elements;
            Model.confirmUser({
                email: elements.email.value,
                name: elements.name.value,
                password: elements.password.value
            }, function(response){
                if(response.succes) {
                  Model.login(user, function(response){
                    if(response.succes){
                      m.route("/ideas");
                    } else {
                      this.error = "Het email adres is niet juist";
                    }
                  }.bind(this));
                } else  {
                    if(response.message === "no name"){ this.error = "Je bent vergeten je naam in te vullen";}
                    if(response.message === "no password"){ this.error = "Verzin een wachtwoord";}
                }
            }.bind(this));
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
                                m("p","Welkom terug bij Ideeënvijver. Geef je naam en verzin een wachtwoord. Bevestig het email adres waarmee je hebt geregistreerd."),
                                m("input", {class: "ui", name: "name", placeholder: "Gebruikersnaam..."}),
                                m("input", {type: "password" ,class: "ui", name: "password", placeholder: "Wachtwoord..."}),
                                m("input", {class: "ui", name: "email", placeholder: "Email..."}),
                                m("p", {class: "ui errorhelp"}, ctrl.error),
                                m("button", {type:"submit", class: "ui"}, "Bevestig registratie")
                            ]),
                        ]),
                    ]),
                ]),
            ])
        ]);
    }
};
