//=require Models.js

var VoteButtons = {
    controller: function(yourvote, onvote){


        this.vote = function(e){
            onvote(e.target.value);
        };
    },
    view: function(ctrl, yourvote) {
        var votedUp = "";
        var votedDown = "";
        if(yourvote === 1 ) {
            votedUp = "voted";
        }

        if(yourvote === -1 ) {
            votedDown = "voted";
        }

        return m("div", {class: "voteset"}, [
            m("button", {value: "up", class: "ui vote up "+votedUp, onclick: ctrl.vote}, "▲"),
            m("button", {value: "down", class: "ui vote down "+votedDown, onclick: ctrl.vote}, "▼"),
        ]);
    }
};
