var jwt = require('jsonwebtoken');
var config = require('./config');
var database = require('./database');

module.exports = (function(){
    function sign(user, callback){
        console.log("1sign");
        jwt.sign(user, config.secret, {}, function(err, token) {
            console.log("sign");
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
