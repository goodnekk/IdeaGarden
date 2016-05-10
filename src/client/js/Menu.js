//=require LoginPopup.js
//=require ViewModels.js

var Menu = {
    controller: function(){
        this.token = Model.token;

        this.ideas = function(){
            m.route("/ideas");
        };

        this.loginClick = function(){
            ViewModel.loginPopup(true);
        };
    },
    view: function(ctrl, data) {
        return m("nav", {class: "ui menu"}, [
            m.component(LoginPopup),
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
