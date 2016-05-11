var Model = (function(){

    function xhrConfig(xhr) {
        if(token()){
            xhr.setRequestHeader("x-access-token", token().token);
        }
    }

    function validate(answer){
        if(!answer.succes) {
            console.log(answer.message);
        } else {
            return answer.data;
        }
    }

    var token = m.prop({succes: false});
    function login(user, callback) {
        m.request({
            method: "POST",
            url: "/api/login",
            data: user
        }).then(token).then(callback);
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
            data: addition
        }).then(detail);
    }

    function addComment(aid, comment){
        m.request({
            method: "POST",
            url: "/api/idea/"+id+"/addition/"+aid+"/comment",
            data: {comment: comment},
            config: xhrConfig
        } ).then(validate).then(detail);
    }

    return {
        login: login,
        token: token,
        getOverview: getOverview,
        voteIdeaOverview: voteIdeaOverview,
        addIdea: addIdea,

        getDetail: getDetail,
        addAddition: addAddition,
        addComment: addComment
    };
})();
