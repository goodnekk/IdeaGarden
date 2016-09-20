module.exports = {
    database: {
        url: "__DATABASE_URI__",
        options: {
            user: "__DATABASE_USER__",
            pass: "__DATABASE_PASS__"
        }
    },
    email:{
        from: "__EMAIL_FROM__",
        host: "__EMAIL_HOST__",
        port: "__EMAIL_PORT__",
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
