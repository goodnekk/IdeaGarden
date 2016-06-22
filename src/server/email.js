var nodemailer = require('nodemailer');
var smtpTransport = require('nodemailer-smtp-transport');

var config = require('./config');

var transporter = nodemailer.createTransport(smtpTransport(config.email));

var confirmTemplate = transporter.templateSender({
    subject: 'Welkom Bij Ideeënvijver!',
    text: 'Hallo! tof dat je mee doet! Klik hier om je accout te activeren: http://www.ideeenvijver.nl/#/confirm/{{ code }}',
}, {
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
