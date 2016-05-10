var database = require('./database');
var authenticate = require('./authenticate');

module.exports = (function(){

    function login(req, res){
        //validate
        if(!req.body) return res.json({succes: false, message: "empty post"});
        var post = req.body;

        if(!post.email)      return res.json({succes: false, message: "no email"});
        if(!post.password)   return res.json({succes: false, message: "no password"});
        //if(!post.strategy)   return res.json({succes: false, message: "no strategy"});
        
        //database
        database.getUser({email: post.email}, function(doc){
            if(!doc.succes){
                return res.json({succes: false, message: "unknown user"});
            }

            if(doc.user.password !== post.password){
                return res.json({succes: false, message: "wrong password"});
            }

            authenticate.sign({
                name: doc.user.name,
                email: doc.user.email,
                id: doc.user._id
            }, function(auth){
                if(!auth.succes){
                    return res.json({succes: false, message: "failed to sign token"});
                }
                return res.json({
                    succes: true,
                    token: auth.token,
                    name: doc.user.name,
                    email: doc.user.email
                });
            });
        });
    }

    function getIdeas(req, res) {
        database.getIdeas(function(data){
            res.json(data);
        });
    }

    function getIdea(req, res) {
        database.getIdea(req.params.id, function(data){
            res.json(data);
        });
    }

    function postIdea(req, res) {
        database.addIdea(req.body, function(data){
            res.json(data);
        });
    }

    function postIdeaVote(req, res) {
        var value;
        if(req.params.operation==="up"){ value = 1; }
        else if(req.params.operation==="down"){ value = -1; }
        else {
            res.json({error: "invalid vote"});
            return;
        }

        database.voteIdea(req.params.id, value, function(data){
            res.json(data);
        });
    }

    function postIdeaAddition(req, res){
        if(!req.body){
            res.json({error: "no addition"});
        } else {
            database.addAddition(req.params.id, req.body, function(data){
                res.json(data);
            });
        }
    }

    function postIdeaComment(req, res){
        //validate
        if(!req.body) return res.json({succes: false, message: "empty post"});
        var post = req.body;

        if(!post.comment) return res.json({succes: false, message: "no comment"});

        //authenticate
        authenticate.verify(req, function(auth){
            if(!auth.succes) return res.json({succes: false, message: "verification failed"});

            //database
            database.addComment({
                comment: post.comment,
                name: auth.decoded.name,
                id: req.params.id,
                aid: req.params.aid,
            }, function(doc){
                if(!doc.succes) return res.json({succes: false, message: "comment failed."});
                res.json({succes: true, data: doc.data});
            });
        });
    }

    return {
        login: login,
        getIdeas: getIdeas,
        getIdea: getIdea,
        postIdea: postIdea,
        postIdeaVote: postIdeaVote,
        postIdeaAddition: postIdeaAddition,
        postIdeaComment: postIdeaComment
    };
})();
