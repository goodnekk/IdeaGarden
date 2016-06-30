var path = require('path');
var nodemailer = require('nodemailer');
var smtpTransport = require('nodemailer-smtp-transport');
var EmailTemplate = require('email-templates').EmailTemplate;
var fs = require('fs');

var config;
if (!fs.existsSync(__dirname + '/./config.js')) {
  console.log('Warning, no config.js present. Falling back to config.default.js');
  config = require(__dirname + '/./config.default.js');
} else {
  config = require(__dirname + '/./config.js');
}

var transporter = nodemailer.createTransport(smtpTransport(config.email));

module.exports = (function(){
  function sendMail(receiver, subject, content, mailtype) {
    mailtype = mailtype || "confirm";
    subject = subject || "Bevestig je aanmelding";
    var templateDir = path.join(__dirname, './templates/mail', mailtype);
    var template = new EmailTemplate(templateDir);
    var templateVars = {
      title: "Ideëenvijver",
      site: "https://www.ideeenvijver.nl",
      mail: "info@ideeenvijver.nl",
      code: content
    };
    template.render(templateVars, function (err, results) {
      if (err) {
        console.log('Error rendering message template');
        return console.error(err);
      }
      console.log('Sending messages');
      transporter.sendMail({
        from: {
          name: 'Frederique van Ideëenvijver',
          address: config.email.auth.user
        },
        to: receiver,
        subject: subject,
        html: results.html,
        text: results.text,
        attachments: [{
            filename: 'logo_mail.png',
            path: './templates/mail/logo_mail.png',
            cid: 'logo@ideeenvijver.nl' //same cid value as in the html img src
        }]
      }, function (err, responseStatus) {
        if (err) {
          console.log("Error occured during send");
          console.log(err);
          return err;
        } else {
          console.log("mail sent");
          return "mail sent";
        }
      });
    });
  }
  return {
    sendMail: sendMail
  };
})();
