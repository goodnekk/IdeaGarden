//exports a mailing list in csv that can be used to send email updates with mailchimp
var fs = require("fs");
var database = require("../database.js");

database.getAllIdeas(function(ideas){
    var count = ideas.reduce(function(tot, i){
        tot.upvotes += i.upvotes.length;
        tot.downvotes += i.downvotes.length;
        return tot;
    },{
        upvotes: 0,
        downvotes: 0
    });

    console.log("upvotes: " + count.upvotes);
    console.log("downvotes: " + count.downvotes);
});
