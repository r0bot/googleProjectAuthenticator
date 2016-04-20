var path = require('path'),
    rootPath = path.normalize(__dirname);

var serverIP = 'localhost',
    serverPort = 3310;

module.exports = {
    rootPath: rootPath,
    port: serverPort,
    ip: serverIP,
    baseUrl : 'http://' + serverIP + ':' + serverPort,
    session : {
        secret: 'googleAuth',
        resave: true,
        saveUninitialized: true
    },
    googleApiCredentials : {
        clientId: "<Google Client ID>",
        clientSecret: "<Google Client Secret>",
        redirectUrl: "http://" + serverIP + ":" + serverPort  +"/googleOAuth2Callback"
    }
};