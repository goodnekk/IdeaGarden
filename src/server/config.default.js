module.exports = {
    database: {
        url: "mongodb://localhost/ideagarden",
        options: {
            user: "",
            pass: ""
        }
    },
    email:{
       from: "test@localhost",
       host: "localhost",
       port: 25,
       auth: {
           user: "test@localhost",
           pass: "dummy"
       },
       tls: {"rejectUnauthorized": false},
       debug:true
   },
    secret: "dummy",
    port: 80
};
