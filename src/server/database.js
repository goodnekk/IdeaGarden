var mongoose = require('mongoose');
var autopopulate = require('mongoose-autopopulate');
var config = require('./config');

var db = mongoose.connection;
db.on('error', console.log);
db.once('open', function() { console.log('connected to database'); });
mongoose.connect(config.database.url, config.database.options);

var SchemaOptions = {
    timestamps: true,
};

var UserSchema =  new mongoose.Schema({
    name: String,
    email: {type : String , unique : true},
    password: String,
    secret: String,
});

var IdeaSchema = new mongoose.Schema({
    title: {type : String , unique : true},
    owner: {type: mongoose.Schema.Types.ObjectId, ref: 'User', autopopulate: {select: 'name'}},
    summary: String,
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
IdeaSchema.methods.getPublic = function(requestIp){
    //get user votes
    var yourvote = false;

    var allvotes = this.upvotes.concat(this.downvotes);
    var allreadyVoted = allvotes.find(function(ip){
        return ip === requestIp;
    });
    if(allreadyVoted) yourvote = true;

    var votecount = this.upvotes.length-this.downvotes.length;

    return {
        _id: this._id,
        title: this.title,
        summary: this.summary,
        additions: this.additions,
        votecount: votecount,
        owner: this.owner,
        yourvote: yourvote
    };
};

var User = mongoose.model('User', UserSchema);
var Idea = mongoose.model('Idea', IdeaSchema);


module.exports = (function(){

    function addUser(user, callback){
        var userDoc = new User(user);
        userDoc.save(function(err, data) {
            if (err) return callback({succes: false});
            callback({succes: true, user: data});
        });
    }

    function getUser(user, callback){
        User.findOne({ email: user.email }, function(err, found) {
            if(!found) return callback({succes: false});
            callback({succes: true, user: found});
        });
    }

    function confirmUser(user, callback){
        User.update(
            {"secret": user.secret},
            {$set: {
                'name': user.name,
                'password': user.password,
                'secret': ""
            }},
            {upsert: true},
            function(err, data){
                if (err) return callback({succes: false});
                if(data.ok !== 1) return callback({succes: false});
                callback({succes: true});
            }
        );
    }

    function addIdea(idea, callback){
        var ideaDoc = new Idea(idea);
        ideaDoc.save(function(err, data) {
            if (err) return console.error(err);
            if(callback) callback(data.getPublic());
        });
    }

    function getQuestion(){
        return {
            "title": "wat te doen?"
        };
    }

    function getIdeas(requestIp, callback){
        Idea.find({}).select('title summary upvotes downvotes additions').sort('-createdAt').exec(function(err, ideaDocList){
            ideaDocList = ideaDocList.map(function(ideaDoc){
                return ideaDoc.getPublic(requestIp);
            });
            if(callback) callback(ideaDocList);
        });
    }

    function getIdea(id, callback){
        Idea.findOne({_id : id}).exec(function(err, found){
            if(!found || err) return callback({succes: false});
            callback({succes: true, data: found.getPublic()});
        });
    }

    function voteIdea(vote, callback) {
        //Undo votes

        if(vote.value === 1){
            Idea.update(
                {
                    "_id": vote.id
                },
                {

                }
            );
            /*
            Idea.update(
                {"_id": vote.id},
                {$addToSet: {
                    "upvotes": vote.ip
                }},
                {upsert: true},
                function(err, data){
                    if (err) return callback({succes: false});
                    getIdeas(vote.id, callback);
                }
            );
            */
        } else if(vote.value === -1){
            /*
            Idea.update(
                {"_id": vote.id},
                {$addToSet: {
                    "downvotes": vote.ip
                }},
                {upsert: true},
                function(err, data){
                    if (err) return callback({succes: false});
                    getIdeas(vote.id, callback);
                }
            );
            */
        } else {
            return callback({succes: false});
        }
    }

    function addAddition(post, callback){
        Idea.update(
            {"_id": post.id},
            {$push: {
                'additions': post.addition
            }},
            {upsert: true},
            function(err, data){
                if (err) return callback({succes: false});
                getIdea(post.id, callback);
            }
        );
    }

    function addComment(post, callback){
        Idea.update(
            {"_id": post.id, "additions._id" : post.aid},
            {$push: {
                'additions.$.comments': post.comment
            }},
            {upsert: true},
            function(err, data){
                if (err) return callback({succes: false});
                getIdea(post.id, callback);
            }
        );
    }

    return {
        addUser: addUser,
        getUser: getUser,
        confirmUser: confirmUser,

        addIdea: addIdea,

        getQuestion: getQuestion,
        getIdeas: getIdeas,
        getIdea: getIdea,

        voteIdea: voteIdea,
        addAddition: addAddition,
        addComment: addComment
    };
})();
