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
                    m("div","Ideeënvijver is een initiatief van de Gemeente Eindhoven."),
                    m("div", "Ideeënvijver is ontwikkeld door Code for NL.")
                ),
                m("div", {class: "right"},
                    m("img", {src: "static/eindhoven.png"})
                )
            ])
        ]);
    }
};
