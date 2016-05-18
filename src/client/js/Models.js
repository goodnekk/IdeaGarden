var Model = (function(){


    var token = m.prop({succes: false});
    //load token from session
    if(typeof(Storage) !== "undefined") {
        var t = localStorage.getItem("token");
        if(t) {
            try{
                t = JSON.parse(t);
                token(t);
            } catch(e) {
                console.log(e);
            }
        }

    }

    function login(user, callback) {
        m.request({
            method: "POST",
            url: "/api/login",
            data: user
        }).then(function(t){
            if(typeof(Storage) !== "undefined") {
                localStorage.setItem("token", JSON.stringify(t));
            }
            return t;
        }).then(token).then(callback);
    }

    function logout(callback){
        token({succes: false});
        localStorage.setItem("token", "");
    }

    //add token to the header
    function xhrConfig(xhr) {
        if(token()){
            xhr.setRequestHeader("x-access-token", token().token);
        }
    }

    //validate requests
    function validate(answer){
        if(!answer.succes) {
            console.log(answer.message);
        } else {
            return answer.data;
        }
    }


    var overview = m.prop({});
    function getOverview(){
        m.request({
            method: "GET",
            url: "/api/ideas"
        }).then(overview);
        return overview;
    }

    function voteIdeaOverview(id, value){
        console.log("vote:"+id+": "+value);
        m.request({
            method: "GET",
            url: "/api/idea/"+id+"/vote/"+value
        }).then(function(){
            getOverview();
        });
    }

    function addIdea(data) {
        m.request({
            method: "POST",
            url: "/api/idea",
            data: data
        }).then(function(){
            getOverview();
        });
    }

    var detail = m.prop({});
    var id = "";
    function getDetail(){
        id = m.route.param("id");
        m.request({
            method: "GET",
            url: "/api/idea/"+id
        }).then(validate).then(detail);
        return detail;
    }

    function addAddition(addition){
        m.request({
            method: "POST",
            url: "/api/idea/"+id+"/addition",
            data: addition,
            config: xhrConfig
        }).then(validate).then(detail);
    }

    function addComment(aid, comment){
        m.request({
            method: "POST",
            url: "/api/idea/"+id+"/addition/"+aid+"/comment",
            data: {comment: comment},
            config: xhrConfig
        } ).then(validate).then(detail);
    }

    function confirmUser(user){
        user.secret = m.route.param("secret");
        m.request({
            method: "POST",
            url: "/api/confirm",
            data: user,
        }).then(function(answer){
            if(answer.succes){
                route("/");
            }
        });
    }

    return {
        login: login,
        logout: logout,
        token: token,
        getOverview: getOverview,
        voteIdeaOverview: voteIdeaOverview,
        addIdea: addIdea,

        getDetail: getDetail,
        addAddition: addAddition,
        addComment: addComment,
        confirmUser: confirmUser
    };
})();
