//=require Menu.js

var PlatformPage = {
   view: function() {
       return m("div",[
           m.component(Menu),
           m("div", {class: "ui page"}, [
               m("div", {class: "ui grid"}, [
                   m("div", {class: "ui col-12"}, [
                       m("div", {class: "ui card color"}, [
                           m("p", {class: "centerimage"},[
                               m("h1", "crowdsourcing?"),
                               m("div", {class: "stage"}, [
                                   m("p", [
                                       "Het crowdsourcing platform Ideeënvijver is van iedereen. Daarom nodigen wij gemeenten en instanties van harte uit om ook gebruik te maken van dit platform. Als u intresse heeft om ook eens iets te doen met crowdsourcing, neem dan contact op met ",
                                       m("a", {href: "mailto:info@ideeenvijver.nl"}, "info@ideeenvijver.nl"),
                                       ". We denken graag met u mee."
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
