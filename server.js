var express = require('express');
var nunjucks = require('nunjucks');
var twilio = require('twilio');

var config = require('./config');

var client = twilio(config.get('TWILIO_ACCOUNT_SID'),
					config.get('TWILIO_AUTH_TOKEN'));

var app = express();
var port = 3000;

var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true}));

require('./routes')(app);

nunjucks.configure('views', {
	autoescape: true,
	express: app
});

app.listen(port);
