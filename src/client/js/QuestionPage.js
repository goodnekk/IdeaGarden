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
                        m("div", {class: "ui card color footer"}, [
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
                        m("div", {class: "ui videoFrame"},[
                            m("div", {class: "videoWrapper"},[
                                m("iframe", {src:"https://www.youtube.com/embed/hseiRm-JzXg?showinfo=0", frameborder:"0"})
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
