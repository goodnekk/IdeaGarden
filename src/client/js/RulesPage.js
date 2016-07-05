//=require Menu.js

var RulesPage = {
   view: function() {
       return m("div",[
           m.component(Menu),
           m("div", {class: "ui page"}, [
               m("div", {class: "ui grid"}, [
                   m("div", {class: "ui col-12"}, [
                       m("div", {class: "ui card color"}, [
                           m("p", {class: "centerimage"},[
                               m("h1", "Regels"),
                               m("div", {class: "stage"}, [
                                   m("p", [
                                       "Alles wat op Ideeënvijver wordt gedeeld valt onder een ",
                                       m("a",{href:"https://creativecommons.org/licenses/by-sa/4.0/deed.nl"},"Creative Commons Licentie"),
                                       ". " +
                                       "Dit betekent dat je al je rechten behoudt en anderen toestemming geeft om het werk te delen, verspreiden en te gebruiken. Dit kan in elk medium en format voor elk doel, ook voor commerciële doeleinden."
                                   ]),
                                   m("p", "Posts met grof taalgebruik of schokkend beeldmateriaal worden verwijderd."),
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
