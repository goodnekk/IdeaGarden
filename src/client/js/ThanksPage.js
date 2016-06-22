//=require Menu.js

var ThanksPage = {
   view: function() {
       return m("div",[
           m.component(Menu),
           m("div", {class: "ui page"}, [
               m("div", {class: "ui grid"}, [
                   m("div", {class: "ui col-12"}, [
                       m("div", {class: "ui card colorless header"}, [
                           m("p", {class: "centerimage"},[
                               m("h1", "Dankjewel!"),
                               m("p", "Elke vis in de vijver is een idee. Hoe groter je vis, hoe verder je idee al ontwikkeld is. Elke vis kan uitgroeien tot hét winnende idee: de Koningsvis! Hieronder kun je zien welke stappen je idee kan zetten. Je vis groeit dus mee, met jouw idee! ")
                           ])
                       ])
                   ])
               ])
           ])
       ]);
   }
};
