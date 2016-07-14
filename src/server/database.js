var mongoose = require('mongoose');
var autopopulate = require('mongoose-autopopulate');
var fs = require("fs");
var config;
if (!fs.existsSync(__dirname + '/./config.js')) {
  console.log('Warning, no config.js present. Falling back to config.default.js');
  config = require(__dirname + '/./config.default.js');
} else {
  config = require(__dirname + '/./config.js');
}

var db = mongoose.connection;
db.on('error', console.log);
db.once('open', function() { console.log('connected to database'); });
mongoose.connect(config.database.url, config.database.options);

var SchemaOptions = {
    timestamps: true,
};
var ChallengeSchema = new mongoose.Schema({
  title: {type: String, unique: true},
  leader:{
    image: Object,
    video: Object,
    text: String,
  },
  paragraphs: [{
    //how, when, why
    title: String,
    description: String
  }],
  contact: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    autopopulate: {select: 'name'}
  },
  disclaimer: String,
  stakeholders: [
    {
      name: String,
      logo: String,
      url: String
    }
  ],
  administrators: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      autopopulate: {select: 'name'}
    }
  ]
}, SchemaOptions);

var UserSchema =  new mongoose.Schema({
    name: String,
    email: {type: String , unique: true},
    password: String,
    secret: String,
    ips: [String]
});

var IdeaSchema = new mongoose.Schema({
    title: {type: String , unique: true},
    owner: {type: mongoose.Schema.Types.ObjectId, ref: 'User', autopopulate: {select: 'name'}},
    summary: String,
    content: String,
    upvotes: [String],
    downvotes: [String],

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

IdeaSchema.methods.getVotes = function(requestIp){
    //get user votes
    this.yourvote = 0;

    if (this.upvotes.find(function(ip){
        return ip === requestIp;
    })) {
        this.yourvote = 1;
    }

    if (this.downvotes.find(function(ip){
        return ip === requestIp;
    })) {
        this.yourvote = -1;
    }

    this.votecount = this.upvotes.length-this.downvotes.length;

    return this;
};

IdeaSchema.methods.getBadge = function(position){
    //get fish type
    this.badge = 1;
    this.position = position;

    if(this.additions.length > 0){
        this.badge = 2;
        if(this.additions.some(function(a){
            if(this.owner && a.owner){
                return (JSON.stringify(a.owner._id) !== JSON.stringify(this.owner._id));
            }
            return false;
        }.bind(this))){
            this.badge = 3; //if it has additions with another owner
        }
    }
    if(position < 5) {
        this.badge = 4;
    }

    if(position === 0) {
        this.badge = 5;
    }

    return this;
};

IdeaSchema.methods.hideAdditions = function(){
    //get fish type
    this.additioncount = this.additions.length;
    this.additions = undefined;
    return this;
};

IdeaSchema.methods.getPublic = function(){
    return {
        _id: this._id,
        title: this.title,
        summary: this.summary,
        content: this.content,
        additions: this.additions,
        additioncount: this.additioncount,
        votecount: this.votecount,
        owner: this.owner,
        yourvote: this.yourvote,
        updated: this.updatedAt,
        created: this.createdAt,
        badge: this.badge,
        position: this.position
    };
};

var User = mongoose.model('User', UserSchema);
var Challenge = mongoose.model('Challenge', ChallengeSchema);
var Idea = mongoose.model('Idea', IdeaSchema);

module.exports = (function(){

    function addUser(user, callback){
        var userDoc = new User(user);
        userDoc.save(function(err, data) {
            if (err) return callback({success: false});
            callback({success: true, user: data});
        });
    }

    function getUser(user, callback){
        User.findOne({ email: user.email }, function(err, found) {
            if(!found) return callback({success: false});
            callback({success: true, user: found});
        });
    }

    function getUsers(callback){
        User.find({},function(err, found) {
            if(!found) return callback({success: false});
            callback({success: true, users: found});
        });
    }

    function confirmUser(user, callback){
        User.findOneAndUpdate({
                "secret": user.secret
            },{
                $set: {
                    'name': user.name,
                    'password': user.password,
                    'secret': ""
                }
            }, function(err, doc){
                if (err) return callback({success: false});
                if(!doc) return callback({success: false});
                callback({success: true});
            }
        );
    }

    function resetUser(user, callback){
        User.findOneAndUpdate({
                "email": user.email,
            },{
                $set: {
                    "secret": user.secret
                }
            }, function(err, doc){
                if (err) return callback({success: false});
                if(!doc) return callback({success: false});
                callback({success: true});
            }
        );
    }

    function updateUser(user, callback){
        User.findOneAndUpdate({
                "_id": user.id,
            },{
                $set: {
                    "name": user.name,
                    "email": user.email
                }
            }, function(err, doc){
                if (err) return callback({succes: false});
                if(!doc) return callback({succes: false});
                callback({succes: true});
            }
        );
    }

    function registerUserIp(user, ip, callback){
        User.findOneAndUpdate({
            "_id": user.id,
            "ips": {"$ne": ip}
        },{
            "$push": {"ips": ip}
        }, function(err, doc){
            if (err) return callback({succes: false});
            callback({succes: true});
        });
    }

    function addIdea(idea, callback){
        var ideaDoc = new Idea(idea);
        ideaDoc.save(function(err, data) {
            if(err) return callback({success: false, message: "duplicate"});
            if(callback) return callback({success: true});
        });
    }

    function updateIdea(idea, ip, callback){
        Idea.findOneAndUpdate({
            "_id": idea.id,
            "owner": idea.owner
        },{
            "$set" : {
                "summary": idea.summary,
                "content": idea.content
            }
        },function(err) {
            if(err) return callback({success: false, message: "invalid"});
            getIdea(idea.id, ip, callback);
        });
    }

    function getChallenges(callback){
      Challenge.find({}).select('title leader').exec(function(err, found){
        if(!found || err) return callback({success: false});
        callback({success: true, data: found});
      });
    }

    function getChallenge(id, callback){
        Challenge.findOne({_id: id}).exec(function(err, found){
          if(!found || err) return callback({success: false});
          callback({success: true, data: found});
        });
    }

    function addChallenge(challenge, callback){
        var challengeDoc = new Challenge(challenge);
        challengeDoc.save(function(err, data) {
            if (err) return callback({success: false});
            callback({success: true, challenge: data});
        });
    }

    function updateIdeas(updatequery, callback){
      updatequery = updatequery || {$set: {status: 'active'}};
      var bulk = Idea.collection.initializeOrderedBulkOp();
      bulk.find({}).update(updatequery);
      bulk.execute(function (err) {
          if(err) {
            console.log(err.message);
            return callback({success: false});
          }
          callback({success: true});
      });
    }

    function getIdeas(requestIp, callback){
        Idea.find({}).select('title summary upvotes downvotes additions owner updatedAt createdAt').exec(function(err, ideaDocList){
            ideaDocList = ideaDocList
                .map(function(ideaDoc){
                    return ideaDoc.getVotes(requestIp);
                })
                .sort(function(a,b){
                    var delta = b.votecount - a.votecount;
                    if (delta === 0) {
                        delta = b.additions.length - a.additions.length;
                    }
                    return delta;
                })
                .map(function(ideaDoc, count){
                    return ideaDoc.getBadge(count).hideAdditions().getPublic();
                });

            if(callback) callback(ideaDocList);
        });
    }

    function getIdea(id, requestIp, callback){
        //this is a stupid implementation but it works
        Idea.find({}).exec(function(err, ideaDocList){
            ideaDocList = ideaDocList
                .map(function(ideaDoc){
                    return ideaDoc.getVotes(requestIp);
                })
                .sort(function(a,b){
                    var delta = b.votecount - a.votecount;
                    if (delta === 0) {
                        delta = b.additions.length - a.additions.length;
                    }
                    return delta;
                })
                .map(function(ideaDoc, count){
                    return ideaDoc.getBadge(count).getPublic();
                })
                .filter(function(a){
                    return JSON.stringify(a._id) === JSON.stringify(id);
                });
            if(ideaDocList.length === 0) return callback({success: false});
            if(callback) callback({success: true, data: ideaDocList[0]});
        });
    }

    function voteIdea(vote, callback) {
        //Undo votes

        if(vote.value === 1){
            Idea.findOneAndUpdate(
                {
                    "_id": vote.id,
                    "upvotes": {"$ne": vote.ip}
                },
                {
                    "$push": {"upvotes": vote.ip},
                    "$pull": {"downvotes": vote.ip}
                },
                {
                    upsert: true
                },
                function(err, data){
                    if (err) return callback({success: false});
                    getIdeas(vote.id, callback);
                }
            );

        } else if(vote.value === -1){
            Idea.findOneAndUpdate(
                {
                    "_id": vote.id,
                    "downvotes": {"$ne": vote.ip}
                },
                {
                    "$push": {"downvotes": vote.ip},
                    "$pull": {"upvotes": vote.ip}
                },
                {
                    upsert: true
                },
                function(err, data){
                    if (err) return callback({success: false});
                    getIdeas(vote.id, callback);
                }
            );
        } else {
            return callback({success: false});
        }
    }

    function addAddition(post, ip, callback){
        Idea.update(
            {"_id": post.id},
            {$push: {
                'additions': post.addition
            }},
            function(err, data){
                if (err) return callback({success: false});
                getIdea(post.id, ip, callback);
            }
        );
    }

    function addComment(post, ip, callback){
        Idea.update(
            {"_id": post.id, "additions._id" : post.aid},
            {$push: {
                'additions.$.comments': post.comment
            }},
            function(err, data){
                if (err) return callback({success: false});
                getIdea(post.id, ip, callback);
            }
        );
    }

    return {
        addUser: addUser,
        getUser: getUser,
        getUsers: getUsers,
        confirmUser: confirmUser,
        resetUser: resetUser,
        updateUser: updateUser,
        registerUserIp: registerUserIp,

        getChallenges: getChallenges,
        getChallenge: getChallenge,
        addChallenge: addChallenge,

        getIdeas: getIdeas,
        getIdea: getIdea,
        addIdea: addIdea,
        updateIdea: updateIdea,
        updateIdeas: updateIdeas,
        voteIdea: voteIdea,

        addAddition: addAddition,

        addComment: addComment,

        mongoose: mongoose
    };
})();
