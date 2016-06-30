//=require Menu.js

var WelcomePage = {
    controller: function(){
        this.begin = function(){
            m.route('/ideas');
            ViewModel.loginPopup(true);
        };
    },
    view: function(ctrl) {
       return m("div",[
           m.component(Menu),
           m("div", {class: "ui page"}, [
               m("div", {class: "ui grid"}, [
                   m("div", {class: "ui col-12"}, [
                       m("div", {class: "ui card colorless header"}, [
                           m("p", {class: "centerimage"},[
                               m("h1", "welkom bij Ideeënvijver!"),
                               m("p", "Je kunt nu inloggen met je email en wachtwoord."),
                               m("p", "Nu kan je je idee verder uitwerken, of ideeën van anderen aanvullen! Ga van idee tot concept met extra tekst, afbeeldingen of schetsen."),
                               m("p", m("button", {class:"ui middle", onclick: ctrl.begin}, "begin!")),
                           ])
                       ])
                   ])
               ])
           ])
       ]);
   }
};
