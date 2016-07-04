var Badge = {
    controller: function(){

    },
    view: function(ctrl, image){
        return m("img", {src:"static/stage"+image+".png"});
    }
};
