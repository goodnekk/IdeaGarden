var database = require("../database.js");
database.getChallenges(function(result){
  if(result.success){
    if(result.data.length === 1) {
      var challenge = result.data[0];
      objectid = database.mongoose.Types.ObjectId(challenge._id);
      console.log('yes, there is a single challenge in the database: ' + objectid);
      database.updateIdeas({$set: {challenge: objectid}}, function(result){
        console.log(result);
        database.mongoose.disconnect();
        return;
      });

    } else {
      database.mongoose.disconnect();
      console.log('uh oh, there are multiple challenges in the database, you should not run this script!');
      return;
    }

  } else {
    database.mongoose.disconnect();
    console.log('uh oh, no challenges! We need to have at least one');
    return;
  }

});
