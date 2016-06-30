//=require Menu.js

var WelcomeRegisterPage = {
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
                               m("h1", "Welkom!"),
                               m("p", "Open de email die je zojuist ontvangen hebt en klik op de link.")
                           ])
                       ])
                   ])
               ])
           ])
       ]);
   }
};
