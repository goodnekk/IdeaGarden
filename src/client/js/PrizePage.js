//=require Menu.js

var PrizePage = {
    controller: function(){
        this.ideas = function(){
            m.route("/ideas");
        };
    },
   view: function(ctrl) {
       return m("div",[
           m.component(Menu),
           m("div", {class: "ui page"}, [
               m("div", {class: "ui grid"}, [
                   m("div", {class: "ui col-12"}, [
                       m("div", {class: "ui card base"}, [
                           m("p", {class: "centerimage"},[
                               m("h1", "Dankjewel voor jullie ideeën!"),
                               m("p", [
                                   "Bedankt voor jouw enthousiasme en samenwerking. We zijn steeds op zoek naar de meest innovatieve ideeën die de gemeente Eersel toekomstbestendig maken. Houd toekomstvijvereersel.nl in de gaten om al jouw ideeën te kunnen delen, ",
                                   m("b","V"),"ernieuwend ",
                                   m("b","I"),"nnovatief ",
                                   m("b","S"),"amen.  "])
                           ]),
                           m("img", {src: "static/smartsociety_visual.png", alt: "innovatie in eersel"})
                       ]),
                       m("div", {class: "ui card color"}, [
                           m("p", {class: "centerimage"},[
                               m("p", {class: "centerimage"},[
                                   m("h1", "Ideeën opdoen?"),
                                   m("p", "Hier vind je Dé VISsen van Eersel."),
                                   m("button", {type:"submit", class: "ui no-float", onclick: ctrl.ideas}, m("h2","Bekijk de ideeën"))
                               ])
                           ])
                       ]),
                   ])
               ]),
               m.component(Footer)
           ])
       ]);
   }
};
