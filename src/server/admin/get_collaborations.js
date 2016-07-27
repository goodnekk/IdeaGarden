//exports a mailing list in csv that can be used to send email updates with mailchimp
var fs = require("fs");
var database = require("../database.js");

database.getAllIdeas(function(ideas){
    database.getUsers(function(users){
        var output = users.users.map(function(u){
            var additionsperidea = ideas.map(function(i){
                var count = i.additions.filter(function(a){
                    if(a.owner){
                        return (JSON.stringify(a.owner._id) === JSON.stringify(u._id));
                    } else {
                        return false;
                    }
                }).length;

                return {
                    _id: i._id,
                    count: count
                };
            }).filter(function(i){
                return (i.count>0);
            });

            var totals = additionsperidea.reduce(function(c, i){
                return c += i.count;
            },0);

            return {
                name: u.name,
                additions: additionsperidea,
                totals: totals
            };
        }).sort(function(a,b){
            return b.totals - a.totals;
        });

        fs.writeFile('collaborations.json', JSON.stringify(output), function (err) {
            if (err) return console.log(err);
            console.log('exported file');
            database.mongoose.disconnect();
        });
    });
});
