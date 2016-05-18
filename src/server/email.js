var nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport();


module.exports = (function(){
    function sendMail(){
        // send mail with defined transport object
        var mailOptions = {
            from: '"Ideeën Vijver" <noreply@ideeenvijver.nl>', // sender address
            to: 'marcel@wolkenmachine.nl', // list of receivers
            subject: 'Hello', // Subject line
            text: 'Hello world', // plaintext body
            html: '<b>Hello world</b>' // html body
        };

        transporter.sendMail(mailOptions, function(error, info){
            if(error){
                return console.log(error);
            }
            console.log('Message sent: ' + info.response);
        });
    }

    return {
        sendMail: sendMail
    };
})();
