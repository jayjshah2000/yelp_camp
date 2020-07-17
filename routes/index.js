var express = require('express');
var router = express.Router();
var passport = require('passport');
var User = require('../models/user');
const user = require('../models/user');

router.get('/', function(req, res) {
	res.render('landing');
});
//Auth routes
router.get('/register', function(req, res) {
	res.render('register', { page: 'register' });
});

router.post('/register', function(req, res) {
	var newUser = new User({ username: req.body.username });
	User.register(newUser, req.body.password, function(err, user) {
		if (err) {
			res.render('register', { error: err.message });
		}
		passport.authenticate('local')(req, res, function() {
			req.flash('success', 'Signed up successfully as ' + user.username);
			res.redirect('/campgrounds');
		});
	});
});

router.get('/login', function(req, res) {
	res.render('login', { page: 'login' });
});

router.post('/login', function(req, res) {
	passport.authenticate('local')(req, res, function() {
		// successRedirect: '/campgrounds',
		// successFlash: 'Logged in successfully as ' + req.body.username,
		// failureRedirect: '/login'
		req.flash('success', 'Logged in successfully as ' + req.body.username);
		res.redirect('/campgrounds');
	});
});

router.get('/logout', function(req, res) {
	req.logout();
	req.flash('success', 'Logged you out');
	res.redirect('/campgrounds');
});

module.exports = router;
