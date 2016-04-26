var Menu = {
    controller: function(){
        this.ideas = function(){
            m.route("/ideas");
        };
    },
    view: function(ctrl, data) {
        return m("nav", {class: "ui menu"}, [
            m("img", {src: "static/logo.png", class: "ui menuelement"}),
            m("h3", {class: "ui menuelement"}, "People Mover"),
            m("a", {class: "ui menuelement"}, "Uitdaging"),
            m("a", {class: "ui menuelement highlight", onclick: ctrl.ideas}, "Ideeën"),
            m("a", {class: "ui menuelement"}, "Login")
        ]);
    }
};
