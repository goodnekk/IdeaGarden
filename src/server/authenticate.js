var jwt = require('jsonwebtoken');
var config = require('./config');

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
