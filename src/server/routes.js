var database = require("./database");
var email = require("./email");
var authenticate = require("./authenticate");

var uuid = require("uuid");
var bcrypt = require("bcryptjs");
var dataurl = require("dataurl");
var fs = require("fs");
var emailValidator = require("email-validator");

var i18next;

module.exports = (function(){
    function loginUser(req, res){
        //validate
        if(!req.body) return res.json({success: false, message: "empty post"});
        var post = req.body;

        if(!post.email)      return res.json({success: false, message: "no email"});
        if(!post.password)   return res.json({success: false, message: "no password"});

        post.email = post.email.toLowerCase();
        //database
        database.getUser({email: post.email}, function(doc){
            if(!doc.success){
                return res.json({success: false, message: "unknown user"});
            }

            if(!doc.user.password){
                return res.json({success: false, message: "unconfirmed user"});
            }
            //check password
            var correct = bcrypt.compareSync(post.password, doc.user.password);
            if(!correct) return res.json({success: false, message: "wrong password"});

            authenticate.sign({
                name: doc.user.name,
                email: doc.user.email,
                id: doc.user._id
            }, function(auth){


                if(!auth.success){
                    return res.json({auth: auth.success, success: false, message: "failed to sign token"});
                }
                return res.json({
                    auth: auth.success,
                    success: true,
                    token: auth.token,
                    name: doc.user.name,
                    email: doc.user.email,
                    id: doc.user._id
                });
            });
        });
    }

    function confirmUser(req, res){
        if(!req.body) return res.json({success: false, message: "empty post"});
        var post = req.body;

        if(!post.name)      return res.json({success: false, message: "no name"});
        if(!post.password)  return res.json({success: false, message: "no password"});
        if(!post.secret)    return res.json({success: false, message: "no secret"});

        //security
        post.password = bcrypt.hashSync(post.password, 10);

        database.confirmUser(post, function(data){
            res.json(data);
        });
    }

    function registerUser(req, res){
        //validate
        if(!req.body) return res.json({success: false, message: "empty post"});
        var post = req.body;

        if(!post.email)                             return res.json({success: false, message: "no email"});
        if(!emailValidator.validate(post.email))    return res.json({success: false, message: "invalid email"});

        post.email = post.email.toLowerCase();

        var secret = uuid.v4(); //generate a secret

        database.addUser({email: post.email, secret: secret}, function(userDoc){
            if(!userDoc.success) return res.json({success: false, message: "new user failed"});
            res.json({success: true});
            email.sendMail(userDoc.user.email, i18next.t('email.register'), userDoc.user.secret, "confirm");
        });
    }

    function updateUser(req, res){
        //validate
        if(!req.body) return res.json({success: false, message: "empty post"});
        var post = req.body;

        if(!post.name)                              return res.json({success: false, message: "no name"});

        if(!post.email)                             return res.json({success: false, message: "no email"});
        if(!emailValidator.validate(post.email))    return res.json({success: false, message: "invalid email"});
        post.email = post.email.toLowerCase();

        authenticate.verify(req, function(auth){
            if(!auth.success) return res.json({auth: auth.success, success: false, message: "verification failed"});

            var newUser = {id: auth.decoded.id, name: post.name, email: post.email};
            database.updateUser(newUser ,function(data){
                if(!data.succes) return res.json({success: false, message: "user update failed"});

                console.log(newUser);
                authenticate.sign(newUser, function(nauth){
                    console.log(nauth);
                    if(!nauth.success){
                        return res.json({success: false, message: "failed to sign token"});
                    }

                    return res.json({
                        auth: auth.success,
                        success: true,
                        token: nauth.token,
                        name: post.name,
                        email: post.email
                    });
                });
            });
        });
    }

    function forgetPassword(req, res){
        //validate
        if(!req.body) return res.json({success: false, message: "empty post"});
        var post = req.body;

        if(!post.email)                             return res.json({success: false, message: "no email"});
        if(!emailValidator.validate(post.email))    return res.json({success: false, message: "invalid email"});
        post.email = post.email.toLowerCase();

        var secret = uuid.v4(); //generate a secret

        database.resetUser({email: post.email, secret: secret}, function(userDoc){
            if(!userDoc.success) return res.json({success: false, message: "new user failed"});
            res.json({success: true});
            email.sendMail(post.email, i18next.t('email.forgetpassword'), secret, "forgotpassword");
        });
    }

    function getChallenge(req, res) {
        database.getChallenge(req.params.id, function(data){
            if(!data.success) return res.json({success: false, message: "challenge does not exist"});
            res.json(data);
        });
    }

    function getIdeas(req, res) {
        authenticate.verify(req, function(auth){
            database.getIdeas(req.ip, function(data){
                res.json({auth: auth.success, success: true, data: data});
            });
        }); //just do this to register ip

    }

    function getIdea(req, res) {
        authenticate.verify(req, function(auth){
            database.getIdea(req.params.id, req.ip, function(data){
                if(!data.success) return res.json({auth: auth.success,success: false, message: "idea does not exist"});
                res.json({auth: auth.success, success: true, data: data.data});
            });
        }); //just do this to register ip
    }

    function postIdea(req, res) {
        //validate
        if(!req.body) return res.json({success: false, message: "empty post"});
        var post = req.body;

        if(!post.title)     return res.json({success: false, message: "no title"});
        if(!post.summary)   return res.json({success: false, message: "no summary"});
        if(!post.agree)   return res.json({success: false, message: "no agree"});

        //authenticate
        authenticate.verify(req, function(auth){
            function addIdeawithUser(userId){
                database.addIdea({
                    auth: auth.success,
                    title: post.title,
                    summary: post.summary,
                    votecount: 0,
                    owner: userId

                }, function(answ){
                    res.json(answ);
                });
            }

            if(!auth.success) {//create a new user
                if(!post.email)                             return res.json({auth: false, success: false, message: "no email"});
                if(!emailValidator.validate(post.email))    return res.json({auth: false, success: false, message: "invalid email"});
                post.email = post.email.toLowerCase();

                var secret = uuid.v4(); //generate a secret

                database.addUser({email: post.email, secret: secret}, function(userDoc){
                    if(!userDoc.success) return res.json({success: false, message: "new user failed"});
                    addIdeawithUser(userDoc.user._id);
                    email.sendMail(userDoc.user.email, i18next.t('email.postidea'), userDoc.user.secret, "ideaconfirm");
                });
            } else {//use logged in user
                addIdeawithUser(auth.decoded.id);
            }
        });
    }

    function updateIdea(req, res){
        //validate
        if(!req.body) return res.json({success: false, message: "empty post"});
        var post = req.body;

        if(!post._id) return res.json({success: false, message: "no id"});
        if(!post.summary) return res.json({success: false, message: "no summary"});
        if(!post.content) return res.json({success: false, message: "no content"});

        //authenticate
        authenticate.verify(req, function(auth){
            if(!auth.success) return res.json({auth: auth.success, success: false, message: "verification failed"});

            //database
            database.updateIdea({
                id: post._id,
                owner: auth.decoded.id,
                summary: post.summary,
                content: post.content
            },
            req.ip,
            function(doc){
                if(!doc.success) return res.json({success: false, message: "update failed."});
                res.json({auth: auth.success, success: true, data: doc.data});
            });
        });
    }

    function postIdeaVote(req, res) {
        //validate
        var value;
        if(req.params.operation==="up"){ value = 1; }
        else if(req.params.operation==="down"){ value = -1; }
        else { return res.json({error: "invalid vote"}); }
        //authenticate
        authenticate.verify(req, function(auth){
            if(!auth.success) return res.json({auth: auth.success, success: false, message: "verification failed"});

            database.voteIdea({id:req.params.id, value:value, ip: req.ip}, function(data){
                res.json(data);
            });
        });
    }

    function postIdeaAddition(req, res){
        //validate
        if(!req.body) return res.json({success: false, message: "empty post"});
        var post = req.body;

        if(!post.content) return res.json({success: false, message: "no content"});

        function postToDatabase(addition){
            authenticate.verify(req, function(auth){
                if(!auth.success) return res.json({auth: auth.success, success: false, message: "verification failed"});
                post.owner = auth.decoded.id;
                //database
                database.addAddition(addition, req.ip, function(doc){
                    if(!doc.success) return res.json({auth: auth.success, success: false, message: "comment failed."});
                    res.json({auth: auth.success, success: true, data: doc.data});
                });
            });
        }

        //if the post is an image
        if(post.category === "image") {
            if(!post.content.image) return res.json({success: false, message: "no image"});

            //parse image file from base64
            var dataUrl = post.content.image;
            var image = dataurl.parse(dataUrl);
            if(image.mimetype !== "image/jpeg") return res.json({success: false, message: "not a jpeg image"});

            //save image file
            var imageId = uuid.v4();
            var fileUrl = __dirname + "/imageData/"+imageId+".jpg";
            fs.writeFile(fileUrl, image.data, function (err) {
                if (err) {
                  return res.json({auth: auth.success, success: false, message: "error saving file"});
                }
                post.content = {
                    src: imageId + ".jpg",
                    description: post.content.description
                };

                postToDatabase({
                    id: req.params.id,
                    addition: post
                });
            });
        } else {
            if(!post.content.description) return res.json({success: false, message: "no text"});
            postToDatabase({
                id: req.params.id,
                addition: post,
            });
        }


    }

    function postIdeaComment(req, res){
        //validate
        if(!req.body) return res.json({success: false, message: "empty post"});
        var post = req.body;

        if(!post.comment) return res.json({success: false, message: "no comment"});

        //authenticate
        authenticate.verify(req, function(auth){
            if(!auth.success) return res.json({auth: auth.success, success: false, message: "verification failed"});

            //database
            database.addComment({
                comment: {
                    comment: post.comment,
                    owner: auth.decoded.id
                },
                id: req.params.id,
                aid: req.params.aid,
            },
            req.ip,
            function(doc){
                if(!doc.success) return res.json({success: false, message: "comment failed."});
                res.json({auth: auth.success, success: true, data: doc.data});
            });
        });
    }

    function setI18next(i){
        i18next = i;
    }

    return {
        loginUser: loginUser,
        confirmUser: confirmUser,
        registerUser: registerUser,
        updateUser: updateUser,
        forgetPassword: forgetPassword,

        getChallenge: getChallenge,

        getIdeas: getIdeas,
        getIdea: getIdea,
        postIdea: postIdea,
        updateIdea: updateIdea,

        postIdeaVote: postIdeaVote,
        postIdeaAddition: postIdeaAddition,
        postIdeaComment: postIdeaComment,

        setI18next: setI18next
    };
})();
