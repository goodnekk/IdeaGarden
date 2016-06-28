var Model = (function(){

    var token = m.prop({succes: false});
    //load token from session
    if(typeof(localStorage) !== "undefined") {
        try {
            var t = localStorage.getItem("token");
            if(t) {
                t = JSON.parse(t);
                token(t);
            }
        } catch(e) {
            console.log(e);
        }
    }

    function login(user, callback) {
        m.request({
            method: "POST",
            url: "/api/login",
            data: user
        }).then(function(t){
            if(typeof(localStorage) !== "undefined") {
                try {
                    localStorage.setItem("token", JSON.stringify(t));
                } catch(e) {
                    console.log(e);
                }
            }
            return t;
        }).then(token).then(callback);
    }

    function logout(callback){
        token({succes: false});
        localStorage.setItem("token", "");
    }

    //add token to the header
    function xhrConfig(xhr){
        if(token()){
            xhr.setRequestHeader("x-access-token", token().token);
        }
    }

    //validate requests
    function validate(answer) {
        if(!answer.succes) {
            console.log(answer.message);
        } else {
            return answer.data;
        }
    }

    var overview = m.prop({});
    function getOverview() {
        m.request({
            method: "GET",
            url: "/api/ideas"
        }).then(function(o){
            return o.map(function(i){
                i.additions = i.additions.length;
                return i;
            });
        }).then(overview);
        return overview;
    }

    function voteIdeaOverview(id, value) {
        m.request({
            method: "GET",
            url: "/api/idea/"+id+"/vote/"+value
        }).then(function(){
            getOverview();
        });
    }

    function voteIdeaDetail(id, value) {
        console.log("vote:"+id+": "+value);
        m.request({
            method: "GET",
            url: "/api/idea/"+id+"/vote/"+value
        }).then(function(){
            getDetail();
        });
    }

    function registerAccount(user, callback){
        m.request({
            method: "POST",
            url: "/api/register",
            data: user
        }).then(callback);
    }

    function addIdea(data, callback) {
        m.request({
            method: "POST",
            url: "/api/idea",
            data: data,
            config: xhrConfig
        }).then(callback);
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
                login(user, function(){
                    m.route("/ideas");
                });
            } else {
                m.route("/error");
            }
        });
    }

    function updateIdea(idea){
        m.request({
            method: "POST",
            url: "/api/updateIdea",
            data: idea,
            config: xhrConfig
        }).then(validate).then(detail);
    }

    return {
        login: login,
        logout: logout,
        token: token,
        getOverview: getOverview,
        voteIdeaOverview: voteIdeaOverview,
        voteIdeaDetail: voteIdeaDetail,
        addIdea: addIdea,
        updateIdea: updateIdea,
        registerAccount:registerAccount,

        getDetail: getDetail,
        addAddition: addAddition,
        addComment: addComment,
        confirmUser: confirmUser,
    };
})();
