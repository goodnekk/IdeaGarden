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
                    m("div",[
                        "Dit crowdsourcing platform is een initiatief van de gemeente Eindhoven, en is als pilot ontwikkeld door Code for NL.",
                        " Vragen? Neem contact op: ",
                        m("a", {href:"mailto:info@ideeenvijver.nl"}, "info@ideeenvijver.nl")
                    ]),
                ]),
                m("div", {class: "ui col-4 third logos"},
                    m("div", m("img", {class: "keepsize", src: "static/eindhoven.png"})),
                    m("div", m("img", {class: "keepsize", src: "static/codefornl.png"}))
                ),
                m("div", {class: "ui col-4 third right"},
                    m("div",[
                        m("a", {href:"/#/rules"}, i18next.t('menu.rules')),
                    ]),
                    m("div",[
                        m("a", {href:"/#/explain"}, i18next.t('menu.explain')),
                    ]),
                    m("div",[
                        m("a", {href:"/#/"}, i18next.t('menu.challenge')),
                    ]),
                    m("div",[
                        m("a", {href:"mailto:info@ideeenvijver.nl"}, i18next.t('menu.contact'))
                    ])
                )
            ])
        ]);
    }
};
