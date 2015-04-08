var express = require('express');
var nunjucks = require('nunjucks');
var twilio = require('twilio');

var config = require('./config');

var client = twilio(config.get('TWILIO_ACCOUNT_SID'),
					config.get('TWILIO_AUTH_TOKEN'));

var app = express();
var port = 3000;

nunjucks.configure('views', {
	autoescape: true,
	express: app
});

app.get('/', function(req, res) {
	res.render('index.html', {
		name: 'Andy'
	});
});

app.post('/', function(req, res) {
	var response = new twilio.TwimlResponse();
	response.sms('Hello from Twilio');
	res.send(response.toString());
});

app.listen(port);