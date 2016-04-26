var mongoose = require('mongoose');

var db = mongoose.connection;
db.on('error', console.error);
db.once('open', function() { console.log('connected to database'); });
mongoose.connect("mongodb://localhost/ideagarden");

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

IdeaSchema.methods.getPublic = function(){

    var votes, votecount, additions;

    //count votes
    if(this.votes){
        votes = this.votes.reduce(function(c, v){
            return c + v.vote;
        },0);

        votecount = this.votes.length;
    }

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
        votes: votes,
        votecount: votecount
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

    function addIdea(idea, callback){
        Idea.findOne({ title: idea.title }, function(err, found) {
            if(!found) {
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

    function getIdeas(callback){
        Idea.find({}).select('title summary votes').sort('-createdAt').exec(function(err, ideaDocList){
            ideaDocList = ideaDocList.map(function(ideaDoc){
                return ideaDoc.getPublic();
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

    function voteIdea(id, value, callback){
        Idea.findOne({_id : id}).exec(function(err, ideaDoc){
            if(!ideaDoc){
                if(callback) callback({error: "idea does not exist"});
            } else {
                ideaDoc.votes.push({
                    vote: value
                });

                ideaDoc.votecount += value;

                ideaDoc.save(function(err, data) {
                    if (err) return console.error(err);
                    if(callback) callback(data.getPublic());
                });
            }
        });
    }

    function addAddition(id, addition, callback){
        Idea.findOne({_id : id}).exec(function(err, ideaDoc){
            if(!ideaDoc){
                if(callback) callback({error: "idea does not exist"});
            } else {
                ideaDoc.additions.push(addition);

                ideaDoc.save(function(err, data) {
                    if (err) return console.error(err);
                    if(callback) callback(data.getPublic());
                });
            }
        });
    }

    function addComment(id, aid, comment, callback){
        Idea.findOne({_id : id}).exec(function(err, ideaDoc){
            if(!ideaDoc){
                if(callback) callback({error: "idea does not exist"});
            } else {
                if(!ideaDoc.additions[aid]){
                    if(callback) callback({error: "addition does not exist"});
                } else {
                    ideaDoc.additions[aid].comments.push(comment);
                    ideaDoc.save(function(err, data) {
                        if (err) return console.error(err);
                        if(callback) callback(data.getPublic());
                    });
                }
            }
        });
    }

    return {
        addUser: addUser,
        addIdea: addIdea,

        getQuestion: getQuestion,
        getIdeas: getIdeas,
        getIdea: getIdea,

        voteIdea: voteIdea,
        addAddition: addAddition,
        addComment: addComment
    };
})();
