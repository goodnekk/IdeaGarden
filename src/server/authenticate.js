var jwt = require('jsonwebtoken');
var fs = require('fs');
var database = require('./database');

var config;
if (!fs.existsSync(__dirname + '/./config.js')) {
  console.log('Warning, no config.js present. Falling back to config.default.js');
  config = require(__dirname + '/./config.default.js');
} else {
  config = require(__dirname + '/./config.js');
}


module.exports = (function(){
    function sign(user, callback){
        jwt.sign(user, config.secret, {}, function(err, token) {
            if(err){
                callback({ success: false });
            } else {
                callback({ success: true, token: token });
            }
        });
    }

    function verify(req, callback){
        var token = req.headers['x-access-token'];
        jwt.verify(token, config.secret, function(err, decoded) {
            if (err) {
                callback({ success: false });
            } else {
                database.registerUserIp(decoded, req.ip, function(data){
                    if(!data.succes) console.log("register went wrong");
                });
                callback({ success: true, decoded: decoded });
            }
        });
    }

    return {
        sign: sign,
        verify: verify
    };
})();
