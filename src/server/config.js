module.exports = {
    database: {
        url: "mongodb://localhost/ideagarden",
        options: {
            user: "",
            pass: ""
        }
    },
    email: {
        "host": "",
        "port": 25,
        "auth": {
            "user": "",
            "pass": ""
        },
        "tls": {"rejectUnauthorized": false},
        "debug":true
    },
    secret: "shhhhh",
};
