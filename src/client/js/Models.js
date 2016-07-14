var Model = (function(){

    var token = m.prop({success: false});
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

    //add token to the header
    function xhrConfig(xhr){
        if(token()){
            xhr.setRequestHeader("x-access-token", token().token);
        }
    }

    //validate requests
    function validate(answer) {
      if(answer.success) {
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
                    console.log(e);
                }
            }
            return t;
        }).then(token).then(callback);
    }

    function updateUser(user, callback){
        m.request({
            method: "POST",
            url: "/api/update",
            data: user,
            config: xhrConfig
        }).then(function(t){
            console.log(t);
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
        token({success: false});
        localStorage.setItem("token", "");
    }

    var overview = m.prop({});
    function getOverview(){
        m.request({
            method: "GET",
            url: "/api/ideas",
            config: xhrConfig
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

    function voteIdeaOverview(id, value, callback) {
        m.request({
            method: "GET",
            url: "/api/idea/"+id+"/vote/"+value,
            config: xhrConfig
        }).then(callback).then(function(){
            getOverview();
        });
    }

    function forgetPassword(user, callback) {
        m.request({
            method: "POST",
            url: "/api/forgetpassword",
            data: user
        }).then(callback);
    }

    function voteIdeaDetail(id, value, callback) {
        m.request({
            method: "GET",
            url: "/api/idea/"+id+"/vote/"+value,
            config: xhrConfig
        }).then(callback).then(function(){
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
    var challenge = m.prop({});
    var id = "";

    function getChallenge(){
        id = m.route.param("id") || "577ba8ba4d325fad07cdc85e";
        m.request({
            method: "GET",
            url: "/api/challenge/" + id
        }).then(validate).then(challenge);
        return challenge;
    }

    function getDetail(){
        id = m.route.param("id");
        m.request({
            method: "GET",
            url: "/api/idea/"+id,
            config: xhrConfig
        }).then(validate).then(detail);
        return detail;
    }

    function addAddition(addition, callback){
        var extractStatus;
        m.request({
            method: "POST",
            url: "/api/idea/"+id+"/addition",
            data: addition,
            config: xhrConfig,
            extract: function(xhr) {
              //if status is 413, the file was too large
              if(xhr.status === 413){
                callback({success: false, message: "the image is too large"});
              }
              return xhr.responseText;
            }
        }).then(function(e){
            if(callback){
              callback(e);
            }
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
        updateUser: updateUser,

        getOverview: getOverview,
        getMyIdeas: getMyIdeas,
        voteIdeaOverview: voteIdeaOverview,
        voteIdeaDetail: voteIdeaDetail,
        addIdea: addIdea,
        updateIdea: updateIdea,
        registerAccount:registerAccount,
        forgetPassword: forgetPassword,

        getChallenge: getChallenge,

        getDetail: getDetail,
        addAddition: addAddition,
        addComment: addComment,
        confirmUser: confirmUser,
    };
})();
