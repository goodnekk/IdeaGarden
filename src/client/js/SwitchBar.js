var SwitchBar = {
    controller: function(options, callback){
        this.options = options;
        //this.colWidth = 12/options.length;

        this.selected = 0;
        this.switch = function(count){
            this.selected = count;
            callback(count);
        };
    },
    view: function(ctrl){
        return m("div", {class: "ui switchbar grid"}, [
            ctrl.options.map(function(o, count){
                var Class = "ui switch ";
                if(count === ctrl.selected) {
                    Class += "selected";
                }
                return m("span", {class: Class, onclick: function(){
                    ctrl.switch.bind(ctrl)(count); //curry function with count values
                }}, o);
            })
        ]);
    }
};
