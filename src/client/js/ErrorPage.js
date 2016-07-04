//=require Menu.js

var ErrorPage = {
   view: function() {
       return m("div",[
           m.component(Menu),
           m("div", {class: "ui page"}, [
               m("div", {class: "ui grid"}, [
                   m("div", {class: "ui col-12"}, [
                       m("div", {class: "ui card colorless header"}, [
                           m("p", {class: "centerimage"},[
                               m("h1", i18next.t('errorpage.title')),
                               m("p", i18next.t('errorpage.description'))
                           ])
                       ])
                   ])
               ])
           ])
       ]);
   }
};
