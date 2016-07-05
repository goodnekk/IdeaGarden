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
                               m("h1", i18next.t('loginpopup.reset')),
                               m("p", i18next.t('loginpopup.reset_desc')),
                               m("p", i18next.t('loginpopup.resetaction'))
                           ])
                       ])
                   ])
               ])
           ])
       ]);
   }
};
