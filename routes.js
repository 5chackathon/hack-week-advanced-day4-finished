var config = require('./config');
var express = require('express');
var path = require('path');
var db = require('./database');
var twilio = require('twilio');

module.exports = function (app) {
app.get('/', function(req, res) {
	res.render('index.html', {
		name: 'Andy'
	});
});

app.post('/', function(req, res) {
	var response = new twilio.TwimlResponse();
	response.sms('Hello from Twilio');
        console.log(req.body.Body);

        var teamName = req.body.Body || null;

        var vote = {}
        var from = req.body.From || null;
        vote[from] = teamName;
       
        db.update(vote); 

	//res.send(response.toString());
});

app.get('/ryan', function(req, res) {
        res.render('index.html', {
                name: 'Ryan' 
        });
});

app.use("/public", express.static(path.join(__dirname, 'public')));

};
