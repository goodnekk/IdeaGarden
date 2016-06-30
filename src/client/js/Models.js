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
            console.log("Failed to get token");
            console.log(e);
        }
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
          console.log("Failed to get answer");
          console.log(answer.message);
        } else {
            return answer.data;
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
                    console.log("Failed to set token");
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

    var overview = m.prop({});
    function getOverview(){
        m.request({
            method: "GET",
            url: "/api/ideas"
        }).then(function(o){
            return o.map(function(i){
                i.additions = i.additions.length;
                return i;
            }).sort(function(a,b){
                return b.votecount - a.votecount;
            });
        }).then(overview);
        return overview;
    }

    function getMyIdeas(){
        m.request({
            method: "GET",
            url: "/api/ideas"
        }).then(function(o){
            return o.filter(function(i){
                return i.owner.name === token().name;
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

    function addAddition(addition, callback){
        m.request({
            method: "POST",
            url: "/api/idea/"+id+"/addition",
            data: addition,
            config: xhrConfig
        }).then(function(e){
            if(callback){ callback(e); }
            return e;
        }).then(validate).then(function(e){
            if(e !== undefined){
                detail(e);
            }
        });
    }

    function addComment(aid, comment){
        m.request({
            method: "POST",
            url: "/api/idea/"+id+"/addition/"+aid+"/comment",
            data: {comment: comment},
            config: xhrConfig
        } ).then(validate).then(detail);
    }

    function confirmUser(user, callback){
        user.secret = m.route.param("secret");
        m.request({
            method: "POST",
            url: "/api/confirm",
            data: user,
        }).then(callback);
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
        getMyIdeas: getMyIdeas,
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
