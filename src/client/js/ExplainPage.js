 //=require Menu.js

var ExplainPage = {
    view: function() {
        return m("div",[
            m.component(Menu),
            m("div", {class: "ui page"}, [
                m("div", {class: "ui grid"}, [
                    m("div", {class: "ui col-12"}, [
                        m("div", {class: "ui card colorless header"}, [
                            m("p", {class: "centerimage"},[
                                m("h1", "Hoe werkt de ideeën vijver?"),
                                m("p", "Elke vis in de vijver is een idee. Hoe groter je vis, hoe verder je idee al ontwikkeld is. Elke vis kan uitgroeien tot hét winnende idee: de Koningsvis! Hieronder kun je zien welke stappen je idee kan zetten. Je vis groeit dus mee, met jouw idee! ")
                            ])
                        ]),
                        m("div", {class: "ui card color"}, [
                            m("p", {class: "centerimage stages"},[
                                m("div",{class:"stage"},[
                                    m("img", {class: "img", src: "static/stage1_hi.png"}),
                                    m("div", {class: "explain"},[
                                        m("h2", "Het kikkervisje"),
                                        m("p", "Je hebt een idee bedacht en gepost!")
                                    ])
                                ]),
                                m("div",{class:"stage"},[
                                    m("img", {class: "img", src: "static/stage2_hi.png"}),
                                    m("div", {class: "explain"},[
                                        m("h2", "Het kleine visje"),
                                        m("p", "Je hebt jouw idee aangevuld met extra informatie en schetsen/afbeeldingen!")
                                    ])
                                ]),
                                m("div",{class:"stage"},[
                                    m("img", {class: "img", src: "static/stage3_hi.png"}),
                                    m("div", {class: "explain"},[
                                        m("h2", "De grote vis"),
                                        m("p", "Jouw idee spreekt anderen aan! Er word op gestemd, toevoegingen gedaan, vragen gesteld en schetsen toegevoegd.")
                                    ])
                                ]),
                                m("div",{class:"stage"},[
                                    m("img", {class: "img", src: "static/stage4_hi.png"}),
                                    m("div", {class: "explain"},[
                                        m("h2", "De grote vette vis"),
                                        m("p", "Jouw idee staat in de top 5! Er is zo veel op gestemd dat jouw idee tot één van de vijf beste ideeën hoort.")
                                    ])
                                ]),
                                m("div",{class:"stage"},[
                                    m("img", {class: "img king", src: "static/stage5_hi.png"}),
                                    m("div", {class: "explain"},[
                                        m("h2", "De Koningsvis"),
                                        m("p", "Jouw idee staat op nummer 1 in de top 5! Een jury zal uiteindelijk kiezen of jouw idee ook daadwerkelijk de titel “Koningsvis 2016” verdient.")
                                    ])
                                ])
                            ])
                        ]),
                        m("div", {class: "ui card colorless"}, [
                            m("p", {class: "centerimage"},[
                                m("h1", "Hoe werkt de ideeën vijver?"),
                                m("p", "Elke vis in de vijver is een idee. Hoe groter je vis, hoe verder je idee al ontwikkeld is. Elke vis kan uitgroeien tot hét winnende idee: de Koningsvis! Hieronder kun je zien welke stappen je idee kan zetten. Je vis groeit dus mee, met jouw idee! ")
                            ])
                        ]),
                        m("div", {class: "ui card colorless"}, [
                            m("p", {class: "centerimage"},[
                                m("h1", "Hoe kan ik winnen?"),
                                m("p", "Er zijn twee prijzen. Je kunt winnen door het winnende idee in te dienen óf door zoveel en zo goed mogelijk bij te dragen aan de ideeën van anderen."),
                                m("p", "We zijn op zoek naar leuke en innovatieve ideeën om het centrum en Strijp-s met elkaar te verbinden. Maak het leuker voor voetgangers om er te lopen of bedenk een vervoersconcept. De kans dat je wint is extra groot als de pijlers van Eindhoven Design, Kennis en Technologie, terugkomen in jouw idee. "),
                                m("p", "We geloven dat de beste ideeën tot stand komen als je samenwerkt. Daarom wordt samenwerken beloond: er is een prijs voor degene die het beste heeft meegedacht met de ideeën van anderen. Dit doe je door ideeën van anderen aan te vullen met vragen, opmerkingen, schetsen, afbeeldingen of vragen te stellen.")
                            ])
                        ]),
                        m("div", {class: "ui card colorless"}, [
                            m("p", {class: "centerimage"},[
                                m("h1", "Wat kan ik winnen?"),
                                m("p", "De mogelijkheid dat jouw idee werkelijkheid wordt! Als je wilt mag je hier zelf ook een rol in nemen en meewerken aan de totstandkoming van jouw idee. Je krijgt een officiële publicatie in Groot Eindhoven, een artikel op de website van Eindhoven en een publieksonthulling tijdens de Dutch Design Week. Bovendien is er €1000,- te winnen! €500,- voor de Indiener van hét winnende idee en €500,- voor de Beste Samenwerker."),
                                m("p", "In de maand juli kun je jouw idee indienen. Van 1 juli tot 26 juli kun je jouw ideeën posten, de ideeën van anderen bekijken, deze aanvullen en omhoog of omlaag stemmen. Van 27 juli tot en met 30 juli gaat de jury in beraad over wie de winnaars zijn. Op 31 juli worden de winnaars bekend gemaakt!"),
                            ])
                        ])
                    ])
                ])
            ])
        ]);
    }
};
