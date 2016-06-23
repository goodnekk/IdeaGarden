//=require ViewModels.js

var LoginPopup = {
    controller: function(onLoginClick){

        this.mode = "login";
        this.switchMode = function(){
            if(this.mode==="login"){
                this.mode = "register";
            } else {
                this.mode = "login";
            }
        };

        this.show = ViewModel.loginPopup;

        this.hide = function(){
            this.show(false);
        };

        this.login = function(e){
            e.preventDefault();
            Model.login({
                email: e.target.elements.email.value,
                password: e.target.elements.password.value
            }, function(token){
                if(!token.succes){
                    return console.log(token);
                }
                this.hide();
            }.bind(this));
            return false;
        };

        this.register = function(e){
            e.preventDefault();
            Model.registerAccount({
                email: e.target.elements.email.value
            }, function(answer){
                if(!answer.succes){
                    return console.log(answer);
                }
                this.switchMode();
            }.bind(this));
            return false;
        };

    },
    view: function(ctrl) {
        if(ctrl.show()){
            if(ctrl.mode==="login"){
                return m("div", [
                    m("div", {class: "ui overlay", onclick: ctrl.hide.bind(ctrl)}),
                    m("form", {class: "ui card popup", onsubmit: ctrl.login.bind(ctrl)}, [
                        m("h2", "Login"),
                        m("input", {class: "ui", name: "email", placeholder: "Email adres",}),
                        m("input", {class: "ui", name: "password", type: "password", placeholder: "wachtwoord",}),
                        m("p", {class: "ui left register", onclick: ctrl.switchMode.bind(ctrl)}, "Ik heb nog geen account"),
                        m("button", {type:"submit", class: "ui"}, "login"),
                    ])
                ]);
            } else if(ctrl.mode ==="register") {
                return m("div", [
                    m("div", {class: "ui overlay", onclick: ctrl.hide.bind(ctrl)}),
                    m("form", {class: "ui card popup", onsubmit: ctrl.register.bind(ctrl)}, [
                        m("h2", "Account aanmaken"),
                        m("input", {class: "ui", name: "email", placeholder: "Email adres",}),
                        m("p", {class: "ui left register", onclick: ctrl.switchMode.bind(ctrl)}, "Ik wil inloggen"),
                        m("button", {type:"submit", class: "ui"}, "Registreren"),
                    ])
                ]);
            }
        }
        return m("");

    }
};
