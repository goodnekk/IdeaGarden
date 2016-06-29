module.exports = {
    database: {
        url: "__DATABASE_URI__",
        options: {
            user: "__DATABASE_USER__",
            pass: "__DATABASE_PASS__"
        }
    },
    email:{
        host: "__EMAIL_HOST__",
        port: 25,
        auth: {
            user: "__EMAIL_USER__",
            pass: "__EMAIL_PASS__"
        },
        tls: {"rejectUnauthorized": false},
        debug:true
    },
    secret: "__HASH_SECRET__",
    port: "__PORT__"
};
