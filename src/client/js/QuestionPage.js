//=require Menu.js

var QuestionPage = {
    view: function() {
        return m("div",[
            m("div", {class: "ui page"}, [
                m("div", {class: "ui grid"}, [
                    m("div", {class: "ui col-12"}, [
                        m("div", {class: "ui card color header"}, [
                            m("div", {class: "title"},[
                                m("img", {src: "static/Full logo.png"}),
                            ])
                        ])
                    ]),
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
                                m("h2", [
                                    "Over ",
                                    moment([2016, 6, 1]).diff(moment(),'days'),
                                    " dagen beginnen we!"
                                ]),
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
                    m("div", {class: "ui col-12"}, [
                        m("div", {class: "ui card colorless footerimage"}, [
                            m("div", {class: "centerimage"},[
                                m("img", {src: "static/bottom2.png"})
                            ])
                        ]),
                        m("div", {class: "ui card color footer"}, [
                            m("div", {class: "left"},
                                m("div","Ideeënvijver is een initiatief van de Gemeente Eindhoven."),
                                m("div", "Ideeënvijver is ontwikkeld door Code for NL.")
                            ),
                            m("div", {class: "right"},
                                m("img", {src: "static/eindhoven.png"})
                            )
                        ])
                    ])
                ])
            ])
        ]);
    }
};
