//=require ViewModels.js

var LoginPopup = {
    controller: function(onLoginClick){

        this.show = ViewModel.loginPopup;

        this.hide = function(){
            this.show(false);
        };

        this.submit = function(e){
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

    },
    view: function(ctrl) {
        if(ctrl.show()){
            return m("div", [
                m("div", {class: "ui overlay", onclick: ctrl.hide.bind(ctrl)}),
                m("form", {class: "ui card popup", onsubmit: ctrl.submit.bind(ctrl)}, [
                    m("input", {class: "ui", name: "email", placeholder: "Email adres",}),
                    m("input", {class: "ui", name: "password", type: "password", placeholder: "wachtwoord",}),
                    m("button", {type:"submit", class: "ui"}, "login"),
                ])
            ]);
        }
        return m("");

    }
};
