//=require LoginPopup.js
//=require ViewModels.js

var Menu = {
    controller: function(){
        this.token = Model.token;

        this.ideas = function(){
            m.route("/ideas");
        };

        this.challenge = function(){
            m.route("/");
        };

        this.explain = function(){
            m.route("/explain");
        };

        this.prize = function(){
            m.route("/prize");
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
                m("a", {class: "ui menuelement option "+ctrl.fold, onclick: ctrl.challenge}, i18next.t('menu.challenge')),
                m("a", {class: "ui menuelement option "+ctrl.fold, onclick: ctrl.ideas}, i18next.t('menu.ideas')),
                m("a", {class: "ui menuelement option "+ctrl.fold, onclick: ctrl.explain}, i18next.t('menu.explain')),
                m("a", {class: "ui menuelement option "+ctrl.fold, onclick: ctrl.prize}, i18next.t('menu.prize')),
                (function(){
                    if(ctrl.token().success) {
                        return m("a", {class: "ui menuelement right "+ctrl.fold, onclick: ctrl.dashboardClick.bind(ctrl)}, i18next.t('menu.myideas')); //ctrl.token().email
                    }
                    return m("a", {class: "ui menuelement right "+ctrl.fold, onclick: ctrl.loginClick.bind(ctrl)}, i18next.t('menu.login'));
                })()
                ])
            ]);
        }
};
