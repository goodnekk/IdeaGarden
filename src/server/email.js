var nodemailer = require('nodemailer');
var smtpTransport = require('nodemailer-smtp-transport');
var yml = require('yamljs');
var fs = require('fs');

var config = require('./config');

var transporter = nodemailer.createTransport(smtpTransport(config.email));

var confirmMail = yml.parse(fs.readFileSync(__dirname +"/emailtemplates/confirm.yml", "utf8"));
var confirmTemplate = transporter.templateSender(confirmMail, {
    from: config.email.auth.user,
});

module.exports = (function(){
    function sendMail(receiver, subject, content){
        // create template based sender function
        confirmTemplate({
            to: receiver
        }, {
            code: content
        }, function(err, info){
            if(err){
               console.log('Error');
               console.log(err);
            }else{
                console.log('Welcome sent '+ info.response);
            }
        });
    }

    return {
        sendMail: sendMail
    };
})();
