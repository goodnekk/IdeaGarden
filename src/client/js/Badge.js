var Badge = {
    controller: function(){

    },
    view: function(ctrl, length){
        var image = 1;
        if(length > 0) { image = 2; }
        if(length > 2) { image = 3; }
        if(length > 4) { image = 4; }

        return m("img", {src:"static/stage"+image+".png"});
    }
};
