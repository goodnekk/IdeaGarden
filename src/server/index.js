var express = require('express');
var bodyParser = require('body-parser');
var routes = require('./routes');

var app = express();

//serve client files
app.use(express.static(__dirname+ '/public'));

//parse JSON posts
app.use(bodyParser.json());

//enable getting client ip
app.enable('trust proxy');

//serve api
app.get('/api', function (req, res) {
    res.json({message: 'Hello World!'});
});

app.post('/api/login', routes.login); //login
app.post('/api/confirm', routes.confirmUser);

app.get('/api/question', function (req, res) {}); //get question data

app.get('/api/ideas', routes.getIdeas); //get all ideas
app.get('/api/idea/:id', routes.getIdea); //get specific idea

app.post('/api/idea', routes.postIdea); //post new idea
app.get('/api/idea/:id/vote/:operation', routes.postIdeaVote); //vote on an idea
app.post('/api/idea/:id/addition/', routes.postIdeaAddition); //make an addition to an idea
app.post('/api/idea/:id/addition/:aid/comment', routes.postIdeaComment); //comment on an addition

//vote on an addition
app.get('/api/idea/:id/addition/:aid/vote/:operation', function (req, res) {});



//run server
app.listen(80, function () {
    console.log('App listening on port 80!');
});
