var config = require('./config');
var express = require('express');
var path = require('path');
var db = require('./database');
var twilio = require('twilio');
var passport = require('passport');
var FacebookStrategy =
        require('passport-facebook').Strategy;

var fakeDb = {};

passport.use(new FacebookStrategy({
        clientID: config.get('FACEBOOK_APP_ID'),
        clientSecret: config.get('FACEBOOK_APP_SECRET'),
        callbackURL: 'http://localhost:3000/auth/facebook/callback'
},
function(accessToken, refreshToken, profile, done) {
        fakeDb[profile.id] = profile;
        done(null, profile);
}));

passport.serializeUser(function(user, done) {
        done(null, user.id);
});

passport.deserializeUser(function(id, done) {
        done(null, fakeDb[id]);
});

module.exports = function (app) {
app.use(passport.initialize());
app.use(passport.session());

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

app.get('/auth/facebook', passport.authenticate('facebook'));

app.get('/auth/facebook/callback', passport.authenticate('facebook', {
        successRedirect: '/',
        failureRedirect: '/login'
}));

app.get('/login', function(req, res) {
        res.render('login.html');
});

app.get('/logout', function(req, res) {
        req.logout();
        res.redirect('/');
});

app.get('/ryan', function(req, res) {
        res.render('index.html', {
                name: 'Ryan' 
        });
});

app.get('/profile', function(req, res) {
        console.log(fakeDb, req.user);
        console.log(req.isAuthenticated());
        if (req.user) {
                res.render('profile.html');
        } else {
                res.redirect('/login');
        }
});

app.use("/public", express.static(path.join(__dirname, 'public')));
};
