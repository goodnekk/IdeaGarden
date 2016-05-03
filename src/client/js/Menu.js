var Menu = {
    controller: function(){
        this.token = Model.token;

        this.ideas = function(){
            m.route("/ideas");
        };

        this.login = function(){
            m.route("/login");
        };
    },
    view: function(ctrl, data) {
        return m("nav", {class: "ui menu"}, [
            m("img", {src: "static/logo.png", class: "ui menuelement"}),
            m("h3", {class: "ui menuelement"}, "People Mover"),
            m("a", {class: "ui menuelement"}, "Uitdaging"),
            m("a", {class: "ui menuelement", onclick: ctrl.ideas}, "Ideeën"),
            (function(){
                if(ctrl.token().succes) {
                    return m("a", {class: "ui menuelement right", onclick: ctrl.login}, ctrl.token().email);
                }
                return m("a", {class: "ui menuelement right", onclick: ctrl.login}, "Login");
            })()
        ]);
    }
};
