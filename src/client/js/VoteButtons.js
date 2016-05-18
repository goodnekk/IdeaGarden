//=require Models.js

var VoteButtons = {
    controller: function(yourvote, onvote){


        this.vote = function(e){
            onvote(e.target.value);
        };
    },
    view: function(ctrl, yourvote) {
        var voted = "";
        if(yourvote === true) {
            voted = "voted";
        }

        return m("div", {class: "voteset"}, [
            m("button", {value: "up", class: "ui vote up "+voted, onclick: ctrl.vote}, "▲"),
            m("button", {value: "down", class: "ui vote down "+voted, onclick: ctrl.vote}, "▼"),
        ]);
    }
};
