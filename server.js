var google = require('googleapis');
var OAuth2 = google.auth.OAuth2;
var express = require('express');
var swig = require('swig');
var config = require("./config.js");
var path = require("path");

//Config and init Google oAuth library
var oauth2Client = new OAuth2(
    config.googleApiCredentials.clientId,
    config.googleApiCredentials.clientSecret,
    config.googleApiCredentials.redirectUrl
);
// generate a url that asks permissions for Google permission types
var scopes = [
    'https://spreadsheets.google.com/feeds/'
];
//Generate URL which the user to visit in order to authorize the app.
var googleAuthenticationUrl = oauth2Client.generateAuthUrl({
    access_type: 'offline', // 'online' (default) or 'offline' (gets refresh_token)
    scope: scopes
});

//Init and configure Express
var app = express();
app.set('port', config.port);

// Set views path and view engine
app.engine('html', swig.renderFile);
app.set('view engine', 'html');
app.set('views', config.rootPath);

// Swig template engine configurations
app.set('view cache', false);
swig.setDefaults({
    cache: false,
    varControls: ['<%=', '%>']
});

// Setting static folder to serve
app.use(express.static(path.join(config.rootPath, '/public')));

//Return the index page and include the redirect url for google
app.get('/', function (req, res) {
    res.render('index', {
        authenticationURL: 'Documentation Search'
    });
});

//Handle the callback from google which will contain the code needed to obtain the tokens.
//NOTE: The refresh token will be returned only on the first authentication. If you wish to to obtain it again
//got ot the account revoke the current authentication and authenticate again.
app.get('/googleOAuth2Callback', function (req, res) {
    oauth2Client.getToken(req.query.code, function(err, tokens) {
        if(err){
            console.log("Error: ", err);
        }
        //Output the refresh tokens to the console.
        console.log("Token: ", tokens);
        res.redirect('/')
    });
});
//Return the generated URL on a get request
app.get('/getAuthenticationUrl', function (req, res) {
    res.send(googleAuthenticationUrl)
});

app.listen(config.port, function () {
    console.log('Google authentication server running on ' + config.port+ '!');
});