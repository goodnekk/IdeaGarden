var Badge = {
    view: function(ctrl, image){
        var c = "";
        if(image > 3){
            c="largefish";
        }
        return m("img", {class: c, src: "static/stage" + image + ".png"});
    }
};
