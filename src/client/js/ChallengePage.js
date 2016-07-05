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
                                m("img", {class: "", src: "static/fishrow2.png"})
                            ])
                        ])
                    ]),
                    m("div", {class: "ui col-12"}, [
                        m("div", {class: "ui card color"}, [
                            m("div", {class: "centerimage"},[
                                m("p", [
                                    "Eindhoven nodigt je uit om ",
                                    m("em", "jouw stad"),
                                    " mooier, leuker, chiller en aantrekkelijker te maken!"
                                ]),
                                m("p", "Heel de maand juli kun je reageren op de vraag:"),

                                m("img", {src: "static/route.png"}),
                                m("h1", "Hoe zou jij het Centrum met Strijp-s verbinden?"),
                            ])
                        ]),
                        m("div", {class: "videoWrapper"},[
                            m("iframe", {src:"https://www.youtube.com/embed/hseiRm-JzXg?showinfo=0", frameborder:"0"})
                        ])
                    ]),
                    m("div", {class: "ui col-12"}, [
                        m("div", {class: "ui card color"},[
                            m("p",{class: "centerimage"},[
                                checkButton(),
                                m("p", [
                                    m("h2","HOE?"),
                                    "Een nieuw vervoersconcept? De reis spannender maken? Leuke ideeën? Doe Mee Met Jouw Idee! Je kunt ook de ideeën van anderen bekijken, aanvullen & stemmen op de ideeën die jou het meest aanspreken."
                                ]),
                                m("p", [
                                    m("h2","WAAROM?"),
                                    "Strijp-s en het centrum van Eindhoven zijn nu twee gescheiden werelden. Je loopt niet voor je lol van het centrum naar Strijp-s of andersom. Dan pak je de trein of de bus of je gaat rechtstreeks naar huis. Hoe mooi zou het zijn als mensen die Strijp-s voor een evenement bezoeken, ook worden uitgenodigd de rest van Eindhoven te verkennen? Hoe mooi zou het zijn als winkelend publiek in het centrum ook even een hapje gaat eten op Strijp-s?"
                                ]),
                                m("p", "Bezoekers zien meer, inwoners genieten meer en studenten ontdekken meer als we beide gebieden op een leuke manier met elkaar verbinden. Bovendien kunnen ondernemers profiteren van meer traffic.")
                            ]),
                        ])
                    ]),
                    m.component(Footer)
                ])
            ])
        ]);
    }
};
