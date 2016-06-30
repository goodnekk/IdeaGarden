//=require Menu.js

var ResetPage = {
   view: function() {
       return m("div",[
           m.component(Menu),
           m("div", {class: "ui page"}, [
               m("div", {class: "ui grid"}, [
                   m("div", {class: "ui col-12"}, [
                       m("div", {class: "ui card colorless header"}, [
                           m("p", {class: "centerimage"},[
                               m("h1", "wachtwoord herstellen"),
                               m("p", "We gaan je wachtwoord voor je herstellen."),
                               m("p", "Open het mailtje dat je zojuist ontvangen hebt en klik op de link.")
                           ])
                       ])
                   ])
               ])
           ])
       ]);
   }
};
