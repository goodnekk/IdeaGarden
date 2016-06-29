var MediaInput = {
    controller: function(dataUrl){
        this.picture = false;
        this.dataUrl = dataUrl;
        this.file = m.prop();

        this.getFile = function(e){
            e.preventDefault();
            var input = document.createElement("input");

            input.setAttribute("type", "file");
            input.setAttribute("accept", "image/*");

            input.addEventListener("change", function(){
                var reader = new FileReader();
                this.file(input.files[0]);

                reader.onload = function(e) {
                    this.dataUrl(e.target.result);
                    m.redraw();
                }.bind(this);

                reader.readAsDataURL(input.files[0]);
            }.bind(this), false);

            //make it work in internet explorer
            input.setAttribute("class", "ui hidden");
            document.body.appendChild(input);

            input.click();
        };

        this.takePicture = function(e){
            console.log("take picture");
        };
    },
    view: function(ctrl){
        //console.log(ctrl.dataUrl());
        return m("div", [
            function(){
                if(ctrl.dataUrl() !== ""){
                    return m("div", {class:"ui media-box image"}, [
                        m("img", {src: ctrl.dataUrl()}),
                        m("button", {onclick: ctrl.getFile.bind(ctrl)}, "Andere Foto")
                    ]);
                } else {
                    return m("div", {class:"ui media-box"}, [
                        m("button", {onclick: ctrl.getFile.bind(ctrl)} ,"Selecteer Foto")
                    ]);
                }
            }()

        ]);
    }
};
