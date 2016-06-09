//=require Menu.js
//=require Models.js

var QuestionPage = {
    view: function() {
        return m("div",[
            m("div", {class: "ui page"}, [
                m("div", {class: "ui grid"}, [
                    m("div", {class: "ui col-12"}, [
                        m("div", {class: "ui card color header"}, [
                            m("div", {class: "title"},[
                                m("img", {src: "static/biglogo.png"}),
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
                                m("p", "De Ideeënvijver is een initiatief van de gemeente Eindhoven om iedereen te betrekken bij vraagstukken."),
                                m("img", {src: "static/route.png"})
                            ])
                        ])
                    ]),
                    m("div", {class: "ui col-12"}, [
                        m("div", {class: "ui card colorless footerimage"}, [
                            m("div", {class: "centerimage"},[
                                m("img", {src: "static/bottom2.png"})
                            ])
                        ]),
                        m("div", {class: "ui card color footer"}, [
                            m("img", {src: "static/eindhoven.png"})
                        ])
                    ])
                ])
            ])
        ]);
    }
};
