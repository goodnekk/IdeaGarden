var Footer = {
    view: function(){
        return m("div", {class: "ui col-12"}, [
            m("div", {class: "ui card colorless footerimage"}, [
                m("div", {class: "centerimage"},[
                    m("img", {src: "static/bottom2.png"})
                ])
            ]),
            m("div", {class: "ui card color footer"}, [
                m("div", {class: "left"},
                    m("div","Dit crowdsourcing platform is een initiatief van de gemeente Eindhoven,"),
                    m("div", "en is als pilot ontwikkeld door Code for NL."),
                    m("div",[
                        "Vragen? neem contact op! ",
                        m("a", {href:"mailto:info@ideeenvijver.nl"}, "info@ideeenvijver.nl")
                    ])
                ),
                m("div", {class: "right"},
                    m("img", {src: "static/eindhoven.png"})
                )
            ])
        ]);
    }
};
