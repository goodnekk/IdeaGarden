//=require Menu.js

var LoginPage = {
    view: function() {
        return m("div",[
            m.component(Menu),
            m("div", {class: "ui page"}, [
                m("div", {class: "ui grid"}, [
                    m("div", {class: "ui col-6"}, [
                         m.component(LoginForm)
                    ])
                ])
            ])
        ]);
    }
};

var LoginForm = {
    controller: function(){
        this.submit = function(e){
            e.preventDefault();
            Model.login({
                email: e.target.elements.email.value,
                password: e.target.elements.password.value
            }, function(token){
                if(!token.succes){
                    return console.log(token);
                }
                m.route("/ideas");
            });
            return false;
        };

    },
    view: function(ctrl) {
        return m("form", {class: "ui card center", onsubmit: ctrl.submit.bind(ctrl)}, [
            m("input", {class: "ui", name: "email", placeholder: "Email adres",}),
            m("input", {class: "ui", name: "password", type: "password", placeholder: "wachtwoord",}),
            m("button", {type:"submit", class: "ui"}, "login")
        ]);
    }
};
