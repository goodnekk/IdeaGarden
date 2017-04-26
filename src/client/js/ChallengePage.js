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
                                    m("h2","Duurzaamheid"),
                                    m("p","Het klimaat is aan het veranderen, fossiele brandstoffen raken op, steeds meer natuur verdwijnt door ont-bossing en de biodiversiteit daalt. We willen echter dat wij, maar ook onze kinderen en kleinkinderen in een gezonde, fijne en groene omgeving kunnen wonen. Daarom werkt de gemeente Eersel aan een duurzame toekomst. We willen in de gemeente duurzame energie gaan opwekken en de uitstoot van fijnstof en CO2 verminderen. Maar dit kunnen we niet alleen.Om dit te bereiken hebben we de hulp van alle inwoners, be-drijven en instellingen nodig!."),
                                    m("p", "Heb jij goede ideeën hoe we als gemeente een duurzame, gezonde toekomst kunnen creëren? Laat het ons dan nu weten! "),
                                    checkButton(),
                                ])
                            ]),
                        ])
                    ]),
                    m.component(Footer)
                ])
            ])
        ]);
    }
};
