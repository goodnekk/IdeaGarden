//=require LoginPopup.js
//=require ViewModels.js

var Menu = {
    controller: function(){
        this.token = Model.token;

        this.ideas = function(){
            m.route("/ideas");
        };

        this.question = function(){
            m.route("/");
        };

        this.explain = function(){
            m.route("/explain");
        };

        this.loginClick = function(){
            ViewModel.loginPopup(true);
        };

        this.dashboardClick = function(){
            m.route("/dashboard");
        };

        this.fold = "fold";
        this.mobileSwitch = function(){
            if(this.fold == "fold"){
                this.fold = "unfold";
            } else {
                this.fold = "fold";
            }
        };
    },
    view: function(ctrl, data) {
        return m("div", {class: "ui menu"}, [
            m.component(LoginPopup),
            m("img", {src: "static/fish logo.png", class: "ui menuelement"}),

            m("nav", [
                m("h3", {class: "ui menuelement", onclick: ctrl.ideas}, "Ideeënvijver"),
                m("img", {src:"static/hamburger.png", class: "ui menuelement hamburger", onclick: ctrl.mobileSwitch.bind(ctrl)}, "="),
                m("a", {class: "ui menuelement option "+ctrl.fold, onclick: ctrl.question}, "De Vraag"),
                m("a", {class: "ui menuelement option "+ctrl.fold, onclick: ctrl.ideas}, "Ideeën"),
                m("a", {class: "ui menuelement option "+ctrl.fold, onclick: ctrl.explain}, "Uitleg"),
                (function(){
                    if(ctrl.token().succes) {
                        return m("a", {class: "ui menuelement right "+ctrl.fold, onclick: ctrl.dashboardClick.bind(ctrl)}, "Mijn Ideeën"); //ctrl.token().email
                    }
                    return m("a", {class: "ui menuelement right "+ctrl.fold, onclick: ctrl.loginClick.bind(ctrl)}, "Login");
                })()
                ])
            ]);
        }
};
