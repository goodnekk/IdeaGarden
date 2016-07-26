//=require Models.js

var VoteButtons = {
    controller: function(yourvote, onvote){
        this.vote = function(e){
            onvote(e.target.value);
        };

        this.opened = Model.getOpened();
    },
    view: function(ctrl, yourvote) {
        var upvoted = "";
        var downvoted = "";
        if(yourvote === 1) {upvoted = "voted";}
        if(yourvote === -1) {downvoted = "voted";}

        if(ctrl.opened){
            return m("div", {class: "voteset"}, [
                m("button", {value: "up", class: "ui vote up "+upvoted, onclick: ctrl.vote, title:"Stem +1"}, "▲"),
                m("button", {value: "down", class: "ui vote down "+downvoted, onclick: ctrl.vote, title:"Stem -1"}, "▼"),
            ]);
        } else {
            return m("div", {class: "voteset"});
        }

    }
};
