var Menu = {
    controller: function(){
        this.ideas = function(){
            m.route("/ideas");
        };
    },
    view: function(ctrl, data) {
        return m("nav", {class: "ui menu"}, [
            m("img", {src: "static/logo.png", class: "ui menuelement"}),
            m("h3", {class: "ui menuelement"}, "Project title"),
            m("a", {class: "ui menuelement"}, "Challenge"),
            m("a", {class: "ui menuelement highlight", onclick: ctrl.ideas}, "Ideas"),
            m("a", {class: "ui menuelement"}, "Login")
        ]);
    }
};
