 //=require Menu.js

var ExplainPage = {
    view: function() {
        return m("div",[
            m.component(Menu),
            m("div", {class: "ui page"}, [
                m("div", {class: "ui grid"}, [
                    m("div", {class: "ui col-12"}, [
                        m("div", {class: "ui card colorless header"}, [
                            m("div", {class: "title"},[
                                m("h1", "Hoe werkt de ideeën vijver?")
                            ])
                        ])
                    ]),
                ]),
            ])
        ]);
    }
};
