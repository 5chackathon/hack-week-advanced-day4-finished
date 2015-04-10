var express = require('express');
var nunjucks = require('nunjucks');
var twilio = require('twilio');
var bodyParser = require('body-parser');
var session = require('express-session');
var cookieParser = require('cookie-parser');

var config = require('./config');

var client = twilio(config.get('TWILIO_ACCOUNT_SID'),
					config.get('TWILIO_AUTH_TOKEN'));

var app = express();
var port = 3000;

app.use(bodyParser.urlencoded({ extended: true}));
app.use(session({
    secret: config.get('APP_SECRET'),
    resave: true,
    saveUninitialized: true
}));
app.use(cookieParser());

require('./routes')(app);

nunjucks.configure('views', {
	autoescape: true,
	express: app
});

app.listen(port);
