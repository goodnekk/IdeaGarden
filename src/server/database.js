var mongoose = require('mongoose');
var config = require('./config');
var db = mongoose.connection;
db.on('error', console.log);
db.once('open', function() { console.log('connected to database'); });
mongoose.connect(config.database.url);

var SchemaOptions = {
    timestamps: true,
};

var User = mongoose.model('User', new mongoose.Schema({
    name: String,
    email: String,
    password: String
}, SchemaOptions));

var IdeaSchema = new mongoose.Schema({
    title: String,
    owner: String,
    summary: String,
    votecount: Number,
    votes: [
        {
            vote: Number,
            owner: String,
            ip: String,
        }
    ],

    additions: [
        {
            message: String,
            category: String,
            content: Object,
            comments: [
                {
                    name: String,
                    comment: String
                }
            ]
        }
    ]
}, SchemaOptions);

IdeaSchema.methods.getPublic = function(requestIp){

    var additions;
    var yourvote = 0;

    var allreadyVoted = this.votes.find(function(e){
        return e.ip === requestIp;
    });
    if(allreadyVoted) yourvote = allreadyVoted.vote;

    if(this.additions){
        //hide id's
        additions = this.additions.map(function(addition){
            addition._id = undefined;
            addition.comments.map(function(comment){
                comment._id = undefined;
                return comment;
            });
            return addition;
        });
    }

    return {
        id: this._id,
        title: this.title,
        summary: this.summary,
        additions: additions,
        votecount: this.votecount,
        yourvote: yourvote
    };
};


var Idea = mongoose.model('Idea', IdeaSchema);

module.exports = (function(){

    function addUser(user, callback){
        //create new user
        User.findOne({ email: user.email }, function(err, found) {
            if(!found) {
                var userDoc = new User(user);
                userDoc.save(function(err, data) {
                    if (err) return console.error(err);
                    if(callback) callback(data);
                });
            } else {
                if(callback) callback({error: "user allready known"});
            }
        });
    }

    function getUser(user, callback){
        User.findOne({ email: user.email }, function(err, found) {
            if(!found) {
                if(callback) callback({succes: false});
            } else {
                if(callback) callback({succes: true, user: found});
            }
        });
    }

    function addIdea(idea, callback){
        Idea.findOne({ title: idea.title }, function(err, found) {
            if(!found) {
                idea.votecount = 0;
                var ideaDoc = new Idea(idea);
                ideaDoc.save(function(err, data) {
                    if (err) return console.error(err);
                    if(callback) callback(data.getPublic());
                });
            } else {
                if(callback) callback({error: "idea allready exists"});
            }
        });
    }


    function getQuestion(){
        return {
            "title": "wat te doen?"
        };
    }

    function getIdeas(requestIp, callback){
        Idea.find({}).select('title summary votes votecount').sort('-createdAt').exec(function(err, ideaDocList){
            ideaDocList = ideaDocList.map(function(ideaDoc){
                return ideaDoc.getPublic(requestIp);
            });
            if(callback) callback(ideaDocList);
        });
    }

    function getIdea(id, callback){
        Idea.findOne({_id : id}).exec(function(err, found){
            if(!found){
                if(callback) callback({error: "idea does not exist"});
            } else {
                if(callback) callback(found.getPublic());
            }
        });
    }

    function voteIdea(vote, callback){
        Idea.findOne({_id : vote.id}).exec(function(err, ideaDoc){
            if(!ideaDoc) return callback({succes: false});

            //if this ip allready voted, just update the vote
            var allreadyVoted = false;
            for(var i in ideaDoc.votes){
                if(ideaDoc.votes[i].ip === vote.ip){
                    allreadyVoted = true;
                    //undo the vote
                    ideaDoc.votecount -= ideaDoc.votes[i].vote;

                    //if the vote changed direction update it
                    if(ideaDoc.votes[i].vote !== vote.value) {
                        ideaDoc.votecount += vote.value;
                        ideaDoc.votes[i].vote = vote.value;
                    } else {
                        ideaDoc.votes[i].vote = 0;
                    }
                    break;
                }
            }

            //if not allready voted add a new vote
            if(!allreadyVoted){
                ideaDoc.votes.push({
                    vote: vote.value,
                    ip: vote.ip
                });

                ideaDoc.votecount += vote.value;
            }

            ideaDoc.save(function(err, data) {
                if (err) return console.error(err);
                callback(data.getPublic());
            });
        });
    }

    function addAddition(id, addition, callback){
        Idea.findOne({_id : id}).exec(function(err, ideaDoc){
            if(!ideaDoc){
                return callback({succes: false});
            }

            ideaDoc.additions.push(addition);

            ideaDoc.save(function(err, data) {
                if (err) return callback({succes: false});
                return callback(data.getPublic());
            });
        });
    }

    function addComment(post, callback){
        Idea.findOne({_id : post.id}).exec(function(err, ideaDoc){
            if(!ideaDoc){
                return callback({succes: false});
            }

            if(!ideaDoc.additions[post.aid]){
                return callback({succes: false});
            }

            ideaDoc.additions[post.aid].comments.push({
                name: post.name,
                comment: post.comment
            });

            ideaDoc.save(function(err, data) {
                if (err) return callback({succes: false});
                return callback({succes: true, data: data.getPublic()});
            });
        });
    }

    return {
        addUser: addUser,
        getUser: getUser,

        addIdea: addIdea,

        getQuestion: getQuestion,
        getIdeas: getIdeas,
        getIdea: getIdea,

        voteIdea: voteIdea,
        addAddition: addAddition,
        addComment: addComment
    };
})();
