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
            this.error = "";
        };

        this.forgetMode = function(){
            this.mode = "forget";
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
                    if(token.message === "no email"){ this.error = i18next.t('error.noemail');}
                    if(token.message === "no password"){ this.error = i18next.t('error.nopassword');}
                    if(token.message === "wrong password"){ this.error = i18next.t('error.wrongpassword');}
                    if(token.message === "unknown user"){ this.error = i18next.t('error.unknownuser');}
                    if(token.message === "unconfirmed user"){ this.error = i18next.t('error.unconfirmeduser');}
                } else {
                    this.hide();
                }
            }.bind(this));
            return false;
        };

        this.register = function(e){
            e.preventDefault();
            Model.registerAccount({
                email: e.target.elements.email.value
            }, function(answer){
                if(!answer.succes){
                    if(answer.message === "no email"){ this.error = i18next.t('error.noemail');}
                    if(answer.message === "new user failed"){ this.error = this.error = i18next.t('error.newuserfailed');}
                } else {
                    this.hide();
                    m.route("/welcomeregister");
                }
            }.bind(this));
            return false;
        };

        this.forget = function(e){
            e.preventDefault();
            Model.forgetPassword({
                email: e.target.elements.email.value
            }, function(answer){
                if(!answer.succes){
                    if(answer.message === "no email"){ this.error = i18next.t('error.noemail');}
                    if(answer.message === "new user failed"){ this.error = i18next.t('error.unknownuser');}
                } else {
                    this.hide();
                    m.route("/reset");
                }
            }.bind(this));
        };

        this.error = "";
    },
    view: function(ctrl) {
        if(ctrl.show()){
            if(ctrl.mode==="login"){
                return m("div", [
                    m("div", {class: "ui overlay", onclick: ctrl.hide.bind(ctrl)}),
                    m("form", {class: "ui card popup", onsubmit: ctrl.login.bind(ctrl)}, [
                        m("h2", "Login"),
                        m("input", {class: "ui", name: "email", placeholder: i18next.t('loginpopup.emailplaceholder')}),
                        m("input", {class: "ui", name: "password", type: "password", placeholder: "wachtwoord",}),
                        m("p", {class: "ui errorhelp"}, ctrl.error),
                        m("button", {type:"submit", class: "ui"}, i18next.t('button.login')),
                        m("p", {class: "ui right register", onclick: ctrl.switchMode.bind(ctrl)}, "registeren"),
                        m("p", {class: "ui register right", onclick: ctrl.forgetMode.bind(ctrl)}, "wachtwoord vergeten"),

                    ])
                ]);
            } else if(ctrl.mode ==="register") {
                return m("div", [
                    m("div", {class: "ui overlay", onclick: ctrl.hide.bind(ctrl)}),
                    m("form", {class: "ui card popup", onsubmit: ctrl.register.bind(ctrl)}, [
                        m("h2", "Account aanmaken"),
                        m("input", {class: "ui", name: "email", placeholder: i18next.t('loginpopup.emailplaceholder')}),
                        m("p", {class: "ui errorhelp"}, ctrl.error),
                        m("button", {type:"submit", class: "ui"}, i18next.t('button.register')),
                        m("p", {class: "ui left register", onclick: ctrl.switchMode.bind(ctrl)}, "Ik wil inloggen"),
                    ])
                ]);
            } else if(ctrl.mode ==="forget") {
                return m("div", [
                    m("div", {class: "ui overlay", onclick: ctrl.hide.bind(ctrl)}),
                    m("form", {class: "ui card popup", onsubmit: ctrl.forget.bind(ctrl)}, [
                        m("h2", "Wachtwoord herstellen"),
                        m("input", {class: "ui", name: "email", placeholder: i18next.t('loginpopup.emailplaceholder')}),
                        m("p", {class: "ui errorhelp"}, ctrl.error),
                        m("button", {type:"submit", class: "ui"}, i18next.t('button.reset')),
                        m("p", {class: "ui left register", onclick: ctrl.switchMode.bind(ctrl)}, "Ik wil inloggen"),
                    ])
                ]);
            }
        }
        return m("");

    }
};
