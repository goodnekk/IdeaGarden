//=require LoginPopup.js
//=require ViewModels.js

var Menu = {
    controller: function(){
        this.token = Model.token;

        this.ideas = function(){
            m.route("/ideas");
        };

        this.home = function(){
            m.route("/");
        };

        this.challenge = function(){
            m.route("/challenge");
        };

        this.explain = function(){
            m.route("/explain");
        };

        this.prize = function(){
            m.route("/prize");
        };

        this.platfrm = function(){
            m.route("/platform");
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

            m("img", {src: "static/toplogo.png", class: "ui menuelement", alt: "Oranje vis logo"}),

            m("nav", [
                m("h3", {class: "ui menuelement", onclick: ctrl.home}, "Toekomstvijver Eersel"),
                m("img", {src:"static/hamburger.png", class: "ui menuelement hamburger", onclick: ctrl.mobileSwitch.bind(ctrl)}, "="),
                m("a", {class: "ui menuelement option "+ctrl.fold, onclick: ctrl.challenge}, i18next.t('menu.challenge')),
                m("a", {class: "ui menuelement option "+ctrl.fold, onclick: ctrl.ideas}, i18next.t('menu.ideas')),
                m("a", {class: "ui menuelement option "+ctrl.fold, onclick: ctrl.explain}, i18next.t('menu.explain')),
                m("a", {class: "ui menuelement option "+ctrl.fold, onclick: ctrl.prize}, i18next.t('menu.prize')),
                //m("a", {class: "ui menuelement option "+ctrl.fold, onclick: ctrl.platfrm}, i18next.t('menu.platfrm')),
                m("a", {class: "ui menuelement option "+ctrl.fold, onclick: ctrl.platfrm}, "Innovatie in Eersel"),
                (function(){
                    if(ctrl.token().success) {
                        return m("a", {class: "ui menuelement right "+ctrl.fold, onclick: ctrl.dashboardClick.bind(ctrl)}, i18next.t('menu.myideas')); //ctrl.token().email
                    }
                    return m("a", {class: "ui menuelement right "+ctrl.fold, onclick: ctrl.loginClick.bind(ctrl)}, i18next.t('menu.login'));
                })()
            ]),
            m("img", {src: "static/eersel_small.png", class: "ui menuelement right logo", alt: "Logo van de gemeente eersel"}),
            ]);
        }
};
