//=require Menu.js
//=require Footer.js

var HomePage = {
    controller: function(){
      //this.challenge = Model.getChallenge();
      this.momentcheck = moment([2016, 6, 2]).diff(moment(),'days');
      this.ideas = function(){
          m.route("/ideas");
      };
      this.challenge = function(){
          m.route("/challenge");
      };
    },
    view: function(ctrl) {
        checkButton = function(){
          if(ctrl.momentcheck <= 0){
            return m("button", {type:"submit", class: "ui no-float", onclick: ctrl.ideas}, m("h2","Bekijk de ideeën"));
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
                        m("div", {class: "ui card topbanner"}, [
                            m("div", {class: "centerimage"},[
                                m("img", {class: "", src: "static/fishrow.png", alt: "Doe mee met jouw idee"})
                            ])
                        ])
                    ]),
                    m("div", {class: "ui col-12"}, [
                        m("div", {class: "ui card color"}, [
                            m("div", {class: "centerimage"},[
                                m("p", [
                                    "De gemeente Eersel nodigt je uit om samen na te denken over onze toekomst! Hoe maken we het ‘Kempisch wonen in een wereldregio’ nog mooier, leuker en aantrekkelijker? "
                                ]),
                                m("p", "Leuke ideeën? Doe Mee Met Jouw Idee! Je kunt jouw eigen idee blijven aanvullen, ideeën van anderen bekijken en stemmen op de ideeën die jou het meeste aanspreken. Jij bepaalt! "),
                            ])
                        ])
                    ]),
                    m("div", {class: "ui col-12"}, [
                        m("div", {class: "ui card base"}, [
                            m("div", {class: "centerimage"},[
                                m("img", {src: "static/frontpage_visual.png", alt: "Vernieuwend Innovatief Samen"}),
                                m("p", [
                                    "De samenleving verandert continu en dat gaat de laatste jaren nog net iets harder dan daarvoor. Daarmee ontstaan nieuwe (soms nog onbewuste) vragen en behoeften. Wij streven ernaar zo goed mogelijk voorbereid te zijn op onze toekomst. Dat doen we met z’n allen door te zoeken, experimenteren en leren. ",
                                    m("b","V"),"ernieuwend ",
                                    m("b","I"),"nnovatief ",
                                    m("b","S"),"amen.  "
                                ]),
                            ])
                        ])
                    ]),
                    m("div", {class: "ui col-12"}, [
                        m("div", {class: "ui card color"},[
                            m("p",{class: "centerimage"},[
                                m("h1","Wat speelt er nu?"),
                                m("p", [
                                    m("h2","Toekomstgericht lokaal bestuur"),
                                    m("h2","Open Data Experience"),
                                    m("button", {type:"submit", class: "ui no-float", onclick: ctrl.challenge}, m("h2","Meer informatie")),
                                    m("button", {type:"submit", class: "ui no-float", onclick: ctrl.ideas}, m("h2","Bekijk de ideeën"))
                                ]),
                            ]),
                        ])
                    ]),
                    m.component(Footer)
                ])
            ])
        ]);
    }
};
