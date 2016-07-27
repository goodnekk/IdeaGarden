//exports a mailing list in csv that can be used to send email updates with mailchimp
var fs = require("fs");
var database = require("../database.js");

database.getIdeas('',function(ideas){
    database.getUsers(function(users){
        var output = users.users.map(function(u){
            return ideas.filter(function(i){
                console.log(i.owner._id);
                return (JSON.stringify(i.owner._id) === JSON.stringify(u._id));
            }).reduce(function(prev, current){
                prev.ideas += 1;
                prev.votes += current.votecount;
                prev.additions += current.additioncount;
                return prev;
            },{
                email: u.email,
                name: u.name,
                ideas: 0,
                votes: 0,
                additions: 0
            }).sort(function(a,b){
                return b.ideas - a.ideas;
            });
        });
        fs.writeFile('mailinglist.json', JSON.stringify(output), function (err) {
            if (err) return console.log(err);
            console.log('exported file');
            database.mongoose.disconnect();
        });
    });
});
