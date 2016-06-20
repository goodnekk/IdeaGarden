//=require Models.js

var VoteButtons = {
    controller: function(yourvote, onvote){
        this.vote = function(e){
            onvote(e.target.value);
        };
    },
    view: function(ctrl, yourvote) {
        var upvoted = "";
        var downvoted = "";
        if(yourvote === 1) {upvoted = "voted";}
        if(yourvote === -1) {downvoted = "voted";}

        return m("div", {class: "voteset"}, [
            m("button", {value: "up", class: "ui vote up "+upvoted, onclick: ctrl.vote}, "▲"),
            m("button", {value: "down", class: "ui vote down "+downvoted, onclick: ctrl.vote}, "▼"),
        ]);
    }
};
