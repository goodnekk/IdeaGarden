var express = require('express');
var database = require('./database');

var app = express();

//serve client files
app.use(express.static('public'));

//serve api
app.get('/api/', function (req, res) {
    res.send('Hello World!');
});

app.get('/api/question', function (req, res) {
    res.json(database.getQuestion());
});

app.get('/api/idea/:id', function (req, res) {
    res.json(database.getIdea(req.params.id));
});

//run server
app.listen(80, function () {
    console.log('App listening on port 80!');
});


//question
//ideas
