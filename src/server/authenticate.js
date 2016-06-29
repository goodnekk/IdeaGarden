var jwt = require('jsonwebtoken');
var fs = require('fs');
var config;
if (!fs.existsSync(__dirname + '/./config.js')) {
  console.log('Warning, no config.js present. Falling back to config.default.js');
  config = require(__dirname + '/./config.default.js');
} else {
  config = require(__dirname + '/./config.js');
}
var database = require('./database');

module.exports = (function(){
    function sign(user, callback){
        jwt.sign(user, config.secret, {}, function(err, token) {
            if(err){
                callback({ succes: false });
            } else {
                callback({ succes: true, token: token });
            }
        });
    }

    function verify(req, callback){
        var token = req.headers['x-access-token'];
        jwt.verify(token, config.secret, function(err, decoded) {
            if (err) {
                callback({ succes: false });
            } else {
                callback({ succes: true, decoded: decoded });
            }
        });
    }

    return {
        sign: sign,
        verify: verify
    };
})();
