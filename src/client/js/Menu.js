//=require LoginPopup.js

var Menu = {
    controller: function(){
        this.token = Model.token;

        this.ideas = function(){
            m.route("/ideas");
        };

        this.login = function(){};

        this.onLoginClick = function(callback){
            this.login = callback;
        };

        this.loginClick = function(){
            this.login();
        };
    },
    view: function(ctrl, data) {
        return m("nav", {class: "ui menu"}, [
            m.component(LoginPopup, ctrl.onLoginClick.bind(ctrl)),
            m("img", {src: "static/logo.png", class: "ui menuelement"}),
            m("h3", {class: "ui menuelement"}, "Ideeën Vijver"),
            m("a", {class: "ui menuelement"}, "Uitdaging"),
            m("a", {class: "ui menuelement", onclick: ctrl.ideas}, "Ideeën"),
            (function(){
                if(ctrl.token().succes) {
                    return m("a", {class: "ui menuelement right", onclick: ctrl.loginClick.bind(ctrl)}, ctrl.token().email);
                }
                return m("a", {class: "ui menuelement right", onclick: ctrl.loginClick.bind(ctrl)}, "Login");
            })()
        ]);
    }
};
