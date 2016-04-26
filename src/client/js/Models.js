var Model = (function(){

    var overview = m.prop({});
    function getOverview(){
        m.request({method: "GET", url: "/api/ideas"}).then(overview);
        return overview;
    }

    function voteIdeaOverview(id, value){
        console.log("vote:"+id+": "+value);
        m.request({method: "GET", url: "/api/idea/"+id+"/vote/"+value}).then(function(){
            getOverview();
        });
    }

    var detail = m.prop({});
    var id = "";
    function getDetail(){
        id = m.route.param("id");
        m.request({method: "GET", url: "/api/idea/"+id}).then(detail);
        return detail;
    }

    function commentOnAddition(aid, comment){
        console.log(aid+" "+comment);
        m.request({method: "POST", url: "/api/idea/"+id+"/addition/"+aid+"/comment", data: {comment: comment}}).then(detail);
    }


    return {
        getOverview: getOverview,
        getDetail: getDetail,

        voteIdeaOverview: voteIdeaOverview,
        commentOnAddition: commentOnAddition
    };
})();

/*
var VoteModel = {
    vote: function(id, value){
        return m.request({method: "GET", url: "/api/vote/"+id+"/"+value});
    }
};

var IdeaOverviewModel = {
    get: function(){
        return m.request({method: "GET", url: "/api/ideas"});
    }
};

var IdeaModel = {
    get: function(){
        return m.request({method: "GET", url: "/api/idea/"+id});
    }
};
*/
