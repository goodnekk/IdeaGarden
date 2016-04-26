var express = require('express');
var bodyParser = require('body-parser');
var database = require('./database');

var app = express();

//serve client files
app.use(express.static(__dirname+ '/public'));

//parse JSON posts
app.use(bodyParser.json());

//serve api
app.get('/api/', function (req, res) {
    res.send('Hello World!');
});

//get question data
app.get('/api/question', function (req, res) {
    //
});

//get all ideas
app.get('/api/ideas', function (req, res) {
    database.getIdeas(function(data){
        res.json(data);
    });
});

//get specific idea
app.get('/api/idea/:id', function (req, res) {
    database.getIdea(req.params.id, function(data){
        res.json(data);
    });
});

//post new idea
app.post('/api/idea', function (req, res) {
    database.addIdea(req.body, function(data){
        res.json(data);
    });
});

//vote on an idea
app.get('/api/idea/:id/vote/:operation', function (req, res) {
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
});

//make an addition to an idea
app.post('/api/idea/:id/addition/', function (req, res) {
    if(!req.body){
        res.json({error: "no addition"});
    } else {
        database.addAddition(req.params.id, req.body, function(data){
            res.json(data);
        });
    }
});

//comment on an addition
app.post('/api/idea/:id/addition/:aid/comment', function (req, res) {
    if(!req.body.comment){
        res.json({error: "no comment"});
    } else {

        var comment = {
            comment: req.body.comment,
            name: "marceltest"
        };
        database.addComment(req.params.id, req.params.aid, comment, function(data){
            res.json(data);
        });
    }
});

//vote on an addition
app.get('/api/idea/:id/addition/:aid/vote/:operation', function (req, res) {
    //
});

//run server
app.listen(80, function () {
    console.log('App listening on port 80!');
});


//question
//ideas
