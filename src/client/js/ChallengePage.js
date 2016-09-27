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
                        m("div", {class: "ui card color"},[
                            m("p",{class: "centerimage"},[
                                m("h1","Wat speelt er nu?"),
                                m("p", [
                                    m("h2","Toekomstgericht lokaal bestuur"),
                                    "In de lijn van onze Toekomstvisie en mede ingegeven door het project ‘Veerkrachtig Bestuur’ van de provincie Noord-Brabant, zijn wij benieuwd naar jouw ideeën, wensen en behoeften op het gebied van lokaal bestuur in de toekomst. Je bent van harte welkom op maandag 17 oktober om 20.00 uur in de Muzenval voor de conferentie toekomstgericht lokaal bestuur.",
                                    m("p","De samenleving verandert en daarmee de vragen richting overheid. Wij willen graag van jou horen wat jij in de toekomst van ons verwacht.  Past de huidige vorm van het gemeentelijk bestuur nog wel bij de hedendaagse samenleving? Hoe sta jij bijvoorbeeld tegenover verdergaande samenwerking met de omliggende gemeenten? Om die vragen te beantwoorden hebben wij jou nodig."),
                                    m("p", "Heb jij al geweldige ideeën? Laat het ons nu weten!"),
                                    checkButton(),
                                ]),
                                m("p", [
                                    m("h2","Open Data Experience"),
                                    "Op 9 en 10 november organiseren we voor het eerst de Open Data Experience in het gemeentehuis in Eersel. Op deze twee dagen willen we samen met jou experimenteren met nieuwe manieren om onze informatie te delen. Slimmer, efficiënter en klantvriendelijker.",
                                    m("p", "Bekijk de ideeën om inspiratie op te doen!"),
                                    checkButton(),
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
