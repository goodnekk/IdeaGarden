 //=require Menu.js

var ExplainPage = {
    view: function() {
        return m("div",[
            m.component(Menu),
            m("div", {class: "ui page"}, [
                m("div", {class: "ui grid"}, [
                    m("div", {class: "ui col-12"}, [
                        m("div", {class: "ui card color header"}, [
                            m("p", {class: "centerimage"},[
                                m("h1", "Hoe werkt Toekomstvijver Eersel?"),
                                m("p", "We zijn steeds op zoek naar de meest innovatieve ideeën uit de gemeente Eersel. Je kunt meedoen door jouw ideeën te delen op toekomstvijvereersel.nl. We geloven dat de beste ideeën tot stand komen als je samenwerkt. Daarom vragen we je niet alleen jouw ideeën te delen, maar ook ideeën van anderen nog beter, innovatiever of completer te maken. Dit doe je door ideeën van anderen aan te vullen met opmerkingen, schetsen, afbeeldingen of door vragen te stellen. "),
                            ])
                        ]),
                        m("div", {class: "ui card base"}, [
                            m("p", {class: "centerimage"},[
                                m("h1", "Hoe groeit mijn idee?"),
                                m("p", "Elke vis in de vijver is een idee. Hoe groter je vis, hoe verder je idee al ontwikkeld is. Elke vis kan uitgroeien tot het beste idee: dé VIS! Hieronder kun je zien welke stappen je idee kan zetten. Je vis groeit mee met jouw idee!")
                            ]),
                            m("p", {class: "centerimage stages"},[
                                m("div",{class:"stage"},[
                                    m("img", {class: "img", src: "static/stage1_hi.png"}),
                                    m("div", {class: "explain"},[
                                        //m("h2", "Het kikkervisje"),
                                        m("p", "Je hebt een idee bedacht en geplaatst!")
                                    ])
                                ]),
                                m("div",{class:"stage"},[
                                    m("img", {class: "img", src: "static/stage2_hi.png"}),
                                    m("div", {class: "explain"},[
                                        //m("h2", "Het kleine visje"),
                                        m("p", "Je hebt jouw idee aangevuld met extra informatie en schetsen/afbeeldingen!")
                                    ])
                                ]),
                                m("div",{class:"stage"},[
                                    m("img", {class: "img", src: "static/stage3_hi.png"}),
                                    m("div", {class: "explain"},[
                                        //m("h2", "De grote vis"),
                                        m("p", "Jouw idee spreekt anderen aan! Er word op gestemd, toevoegingen gedaan, vragen gesteld en schetsen toegevoegd.")
                                    ])
                                ]),
                                m("div",{class:"stage"},[
                                    m("img", {class: "img king", src: "static/stage4_hi.png"}),
                                    m("div", {class: "explain"},[
                                        //m("h2", "De kei grote vis"),
                                        m("p", "Jouw idee staat in de top 5!")
                                    ])
                                ]),
                                m("div",{class:"stage"},[
                                    m("img", {class: "img king", src: "static/stage5_hi.png"}),
                                    m("div", {class: "explain"},[
                                        //m("h2", "De Koningsvis"),
                                        m("p", "Jouw idee staat op nummer 1 in de top 5. Dat maakt jouw idee de winnaar van Toekomstvijver Eersel. ")
                                    ])
                                ])
                            ])
                        ]),
                        m("div", {class: "ui card color"}, [
                            m("p", {class: "centerimage"},[
                                m("h1", "Wat gebeurt er met mijn idee?"),
                                m("p", "De mogelijkheid dat jouw idee werkelijkheid wordt. Jouw idee zou zo maar eens de sleutel tot de toekomst van de gemeente Eersel kunnen zijn. Wie weet zie je jouw idee uiteindelijk in heel de Kempen, Nederland, Europa of de rest van de wereld terug. "),
                            ])
                        ]),
                        m("div", {class: "ui card base"}, [
                            m("p", {class: "centerimage"},[
                                m("h1", "Crowdsourcing"),
                                m("p", "Een goed plan begint altijd met een idee. Via crowdsourcing, waarbij kennis en ideeën van een grote groep mensen gebundeld kan worden, denken er ineens honderden mensen na over een vraagstuk in plaats van een paar specialisten. De kans op een innovatief en verrassend idee is hierdoor vele malen groter.")
                            ])
                        ]),
                    ]),
                    m.component(Footer)
                ])
            ])
        ]);
    }
};
