var Footer = {
    view: function(){
        return m("div", {class: "ui col-12"}, [
            m("div", {class: "ui card colorless footerimage"}, [
                m("div", {class: "centerimage"},[
                    m("img", {src: "static/bottom2.png"})
                ])
            ]),
            m("div", {class: "ui card color footer"}, [
                m("div", {class: "ui col-4 third"},[
                    m("div","Dit crowdsourcing platform is een initiatief van de gemeente Eindhoven, en is als pilot ontwikkeld door Code for NL."),
                ]),
                m("div", {class: "ui col-4 third logos"},
                    m("div", m("img", {class: "keepsize", src: "static/eindhoven.png"})),
                    m("div", m("img", {class: "keepsize", src: "static/codefornl.png"}))
                ),
                m("div", {class: "ui col-4 third"},
                    m("div",[
                        "Vragen? neem contact op! ",
                        m("a", {href:"mailto:info@ideeenvijver.nl"}, "info@ideeenvijver.nl")
                    ])
                ),
            ])
        ]);
    }
};
