var config = {
    server_name: "ChatForNerds",

    static_secret: false, // false RECOMMENDED //
    secret: "123", // server secret to be set if static_secret is true //

    allowRegistering: true,

    rooms: ['general', 'find friends'],

    port: 3000,
}

module.exports = config;