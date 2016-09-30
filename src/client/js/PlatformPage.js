//=require Menu.js

var PlatformPage = {
   view: function() {
       return m("div",[
           m.component(Menu),
           m("div", {class: "ui page"}, [
               m("div", {class: "ui grid"}, [
                   m("div", {class: "ui col-12"}, [
                       m("div", {class: "ui card base"}, [
                           m("p", {class: "centerimage"},[
                               m("h1", "Innovatie in Eersel"),
                               m("div", {class: "stage"}, [
                                   m("p", [
                                       "De samenleving is continu in ontwikkeling en daarmee ontstaan er nieuwe (soms nog onbewuste) vragen en behoeften. Om maatwerk te kunnen leveren en meerwaarde te creëren, is beter inzicht nodig in die nieuwe vragen en behoeften. Door in te spelen op de ontwikkelingen bieden wij passende dienstverlening nu en in de toekomst. Voorop lopen vraagt van ons een nieuwe mindset en lef, en de drive om te zoeken, experimenteren en leren. Symbool voor innovatie in Eersel staat de oranje VIS; ",
                                       m("b","V"),"ernieuwend ",
                                       m("b","I"),"nnovatief ",
                                       m("b","S"),"amen.  ",
                                       m("img", {src: "static/innovatie_visual.png", alt: "innovatie in eersel"})
                                   ]),
                               ])
                           ])
                       ])
                   ]),
                   m.component(Footer)
               ])
           ])
       ]);
   }
};
