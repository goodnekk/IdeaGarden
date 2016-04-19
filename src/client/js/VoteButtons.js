var VoteButtons = {
    view: function(){
        return m("div", {class: "voteset"},[
            m("button", {class: "ui vote up"}, "▲"),
            m("button", {class: "ui vote down"}, "▼"),
        ]);
    }
};
