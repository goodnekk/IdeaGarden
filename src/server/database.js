var mongoose = require('mongoose');
var autopopulate = require('mongoose-autopopulate');
var config = require('./config');
var db = mongoose.connection;
db.on('error', console.log);
db.once('open', function() { console.log('connected to database'); });
mongoose.connect(config.database.url);

var SchemaOptions = {
    timestamps: true,
};

var UserSchema =  new mongoose.Schema({
    name: String,
    email: String,
    password: String
});

var IdeaSchema = new mongoose.Schema({
    title: String,
    owner: {type: mongoose.Schema.Types.ObjectId, ref: 'User', autopopulate: {select: 'name'}},
    summary: String,
    votecount: Number,
    votes: [
        {
            vote: Number,
            ip: String
        }
    ],

    additions: [
        {
            owner: {type: mongoose.Schema.Types.ObjectId, ref: 'User', autopopulate: {select: 'name'}},
            category: String,
            content: Object,
            comments: [
                {
                    owner: {type: mongoose.Schema.Types.ObjectId, ref: 'User', autopopulate: {select: 'name'}},
                    comment: String
                }
            ]
        }
    ]
}, SchemaOptions);

IdeaSchema.plugin(autopopulate);
IdeaSchema.methods.getPublic = function(requestIp){
    //get user votes
    var yourvote = 0;
    var allreadyVoted = this.votes.find(function(e){
        return e.ip === requestIp;
    });
    if(allreadyVoted) yourvote = allreadyVoted.vote;

    //hide id's on additions and comments
    var additions;
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
        owner: this.owner,
        yourvote: yourvote
    };
};

var User = mongoose.model('User', UserSchema);
var Idea = mongoose.model('Idea', IdeaSchema);


module.exports = (function(){

    function addUser(user, callback){
        //create new user
        User.findOne({ email: user.email }, function(err, found) {
            if(found || err) return callback({succes: false});

            var userDoc = new User(user);
            userDoc.save(function(err, data) {
                if (err) return callback({succes: false});
                callback({succes: true, user: data});
            });
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
            if(found || err) return callback({succes: false});

            var ideaDoc = new Idea(idea);
            ideaDoc.save(function(err, data) {
                if (err) return console.error(err);
                if(callback) callback(data.getPublic());
            });
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
            if(!found || err) return callback({succes: false});
            return callback({succes: true, data: found.getPublic()});
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
                owner: post.owner,
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
