//=require Menu.js
//=require Footer.js

var ChallengePage = {
    controller: function(){
      //this.challenge = Model.getChallenge();
      this.momentcheck = moment([2016, 6, 2]).diff(moment(),'days');
      this.ideas = function(){
          m.route("/ideas");
      };
    },
    view: function(ctrl) {
        checkButton = function(){
          if(ctrl.momentcheck <= 0){
            return m("button", {type:"submit", class: "ui no-float", onclick: ctrl.ideas}, m("h2","Bekijk de ideëen"));
          } else{
           return m("h2", [
             "Over ",
             ctrl.momentcheck,
             " dagen beginnen we!"
           ]);
          }
        };
        checkMenu = function(){
          if(ctrl.momentcheck <= 0){
            return m.component(Menu);
          } else {
            return "";
          }
        };
        checkBanner = function(){
          if(ctrl.momentcheck <= 0){
            return "";
          } else {
            return m("div", {class: "ui col-12"}, [
              m("div", {class: "ui card color header"}, [
                  m("div", {class: "title"},[
                      m("img", {src: "static/Full logo.png"}),
                  ])
              ])
            ]);
          }

        };
        return m("div",[
            checkMenu(),
            m("div", {class: "ui page"}, [
              checkBanner(),
                m("div", {class: "ui grid"}, [
                    m("div", {class: "ui col-12"}, [
                        m("div", {class: "ui card colorless"}, [
                            m("div", {class: "centerimage"},[
                                m("img", {class: "", src: "static/fishrow.png"})
                            ])
                        ])
                    ]),
                    m("div", {class: "ui col-12"}, [
                        m("div", {class: "ui card color"}, [
                            m("div", {class: "centerimage"},[
                                m("p", [
                                    "De gemeente Eersel nodigt je uit om samen na te denken over onze toekomst! Hoe maken we het ‘Kem-pisch wonen in een wereldregio’ nog mooier, leuker en aantrekkelijker? "
                                ]),
                                m("p", "Leuke ideeën? Doe Mee Met Jouw Idee! Je kunt jouw eigen idee blijven aanvullen, ideeën van anderen bekijken en stemmen op de ideeën die jou het meeste aanspreken. Jij bepaalt! "),
                            ])
                        ])
                    ]),
                    m("div", {class: "ui col-12"}, [
                        m("div", {class: "ui card colorless"}, [
                            m("img", {src: "static/frontpage_visual.png"}),
                            m("p", "De samenleving verandert continu en dat gaat de laatste jaren nog net iets harder dan daarvoor. Daarmee ontstaan nieuwe (soms nog onbewuste) vragen en behoeften. Wij streven ernaar zo goed mogelijk voorbereid te zijn op onze toekomst. Dat doen we met z’n allen door te zoeken, experimenteren en leren. Vernieuwend, Innovatief, Samen. "),
                        ])
                    ]),
                    m("div", {class: "ui col-12"}, [
                        m("div", {class: "ui card color"},[
                            m("p",{class: "centerimage"},[
                                m("p", [
                                    m("h2","Open Data Experience"),
                                    "Op 9 en 10 november organiseren we voor het eerst de Open Data Experience in het gemeentehuis in Eersel. Op deze twee dagen willen we samen met jou experimenteren met nieuwe manieren om onze informatie te delen. Slimmer, efficiënter en klantvriendelijker. Klik hier <link naar ideeën voor Open Data Experience>  om inspiratie op te doen."
                                ]),
                                m("p", "Heb jij al geweldige ideeën? Laat het ons nu weten!"),
                                checkButton(),
                            ]),
                        ])
                    ]),
                    m.component(Footer)
                ])
            ])
        ]);
    }
};
