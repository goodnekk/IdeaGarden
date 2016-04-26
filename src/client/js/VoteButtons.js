//=require Models.js

var VoteButtons = {
    controller: function(onvote){
        this.vote = function(e){
            onvote(e.target.value);
        };
    },
    view: function(ctrl){
        return m("div", {class: "voteset"},[
            m("button", {value: "up", class: "ui vote up", onclick: ctrl.vote}, "▲"),
            m("button", {value: "down", class: "ui vote down", onclick: ctrl.vote}, "▼"),
        ]);
    }
};
