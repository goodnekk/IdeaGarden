var nodemailer = require('nodemailer');

nodemailer.createTransport();

// setup e-mail data with unicode symbols
/*
var mailOptions = {
    from: '"Ideeën Vijver" <noreply@ideeenvijver.nl>', // sender address
    to: 'bar@blurdybloop.com, baz@blurdybloop.com', // list of receivers
    subject: 'Hello', // Subject line
    text: 'Hello world', // plaintext body
    html: '<b>Hello world</b>' // html body
};
*/


module.exports = (function(){
    function sendMail(){
        // send mail with defined transport object
        var mailOptions = {
            from: '"Ideeën Vijver" <noreply@ideeenvijver.nl>', // sender address
            to: 'bar@blurdybloop.com, baz@blurdybloop.com', // list of receivers
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
