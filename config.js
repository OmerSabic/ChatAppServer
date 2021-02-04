var config = {
    server_name: "ChatForNerds",

    static_secret: true, // false RECOMMENDED //
    secret: "123", // server secret to be set if static_secret is true //

    allowRegistering: true,

    port: 3000,
}

module.exports = config;