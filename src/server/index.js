var express = require('express');
var bodyParser = require('body-parser');
var compress = require('compression');
var fs = require('fs');
var routes = require('./routes');
var config;
if (!fs.existsSync(__dirname + '/./config.js')) {
  console.log('Warning, no config.js present. Falling back to config.default.js');
  config = require(__dirname + '/./config.default.js');
} else {
  config = require(__dirname + '/./config.js');
}


var app = express();
app.use(compress());
//serve client files
app.use(express.static(__dirname + '/public'));

//serve image files
app.use('/images', express.static(__dirname + '/imageData'));

//parse JSON posts
var limit = '1kb';
app.use(bodyParser.json({limit: limit}));
app.use(bodyParser.urlencoded({limit: limit, extended: true, parameterLimit:5000}));

//enable getting client ip
app.enable('trust proxy');

//serve api
app.get('/api', function (req, res) {
    res.json({message: 'Hello World!'});
});

app.post('/api/login', routes.login); //login
app.post('/api/confirm', routes.confirmUser);
app.post('/api/register', routes.register); //login

app.get('/api/question', function (req, res) {}); //get question data

app.get('/api/ideas', routes.getIdeas); //get all ideas
app.get('/api/idea/:id', routes.getIdea); //get specific idea

app.post('/api/idea', routes.postIdea); //post new idea
app.post('/api/updateidea', routes.updateIdea); //post new idea

app.get('/api/idea/:id/vote/:operation', routes.postIdeaVote); //vote on an idea
app.post('/api/idea/:id/addition/', routes.postIdeaAddition); //make an addition to an idea
app.post('/api/idea/:id/addition/:aid/comment', routes.postIdeaComment); //comment on an addition

//vote on an addition
app.get('/api/idea/:id/addition/:aid/vote/:operation', function (req, res) {});



//run server
app.listen(config.port, function () {
    console.log('App listening on port ' + config.port);
});
