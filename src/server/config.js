module.exports = {
    database: {
        url: "mongodb://localhost/ideagarden",
        options: {
            user: "",
            pass: ""
        }
    },
    email:{
       host: "mail.ideeenvijver.nl",
       port: 25,
       auth: {
           user: "info@ideeenvijver.nl",
           pass: "6o9jn_E1ot"
       },
       tls: {"rejectUnauthorized": false},
       debug:true
   },
    secret: "shhhhh",
    port: 80
};
