var express = require('express');
var router = express.Router();
var middleware = require('../middleware');
var Campground = require('../models/campground');
var Comment = require('../models/comment');

//All campgrounds
router.get('/campgrounds', function(req, res) {
	Campground.find({}, function(err, allCampgrounds) {
		if (err) {
			console.log(err);
		} else {
			res.render('campgrounds/index', { campground: allCampgrounds, page: 'campgrounds' });
		}
	});
});

//create new campground
router.get('/campgrounds/new', middleware.isLoggedIn, function(req, res) {
	res.render('campgrounds/new');
});

router.post('/campgrounds', middleware.isLoggedIn, function(req, res) {
	var name = req.body.name;
	var price = req.body.price;
	var image = req.body.image;
	var desc = req.body.description;
	var author = {
		id: req.user._id,
		username: req.user.username
	};
	var newCampground = {
		name: name,
		price: price,
		image: image,
		description: desc,
		author: author
	};

	Campground.create(newCampground, function(err, newlyCreated) {
		if (err) {
			console.log(err);
		} else {
			res.redirect('/campgrounds');
		}
	});
});

//Show more info about one campground
router.get('/campgrounds/:id', function(req, res) {
	Campground.findById(req.params.id).populate('comments').exec(function(err, foundCampground) {
		if (err || !foundCampground) {
			req.flash('error', 'Campground not found...');
			res.redirect('/campgrounds');
		} else {
			res.render('campgrounds/show', { campground: foundCampground });
		}
	});
});

//Edit campground
router.get('/campgrounds/:id/edit', middleware.checkCampgroundOwner, function(req, res) {
	Campground.findById(req.params.id, function(err, foundCampground) {
		if (err) {
			res.redirect('/campgrounds');
		} else {
			res.render('campgrounds/edit', { campground: foundCampground });
		}
	});
});
//Update campground
router.put('/campgrounds/:id', middleware.checkCampgroundOwner, function(req, res) {
	Campground.findByIdAndUpdate(req.params.id, req.body.campground, function(err, updatedCampground) {
		if (err) {
			res.redirect('/campgrounds');
		} else {
			res.redirect('/campgrounds/' + req.params.id);
		}
	});
});

//Delete campground route
router.delete('/campgrounds/:id', middleware.checkCampgroundOwner, function(req, res) {
	Campground.findByIdAndRemove(req.params.id, function(err, removedCampground) {
		if (err) {
			res.redirect('/campgrounds');
		} else {
			Comment.deleteMany({ _id: { $in: removedCampground.comments } }, function(err) {
				if (err) {
					console.log(err);
				}
				res.redirect('/campgrounds');
			});
		}
	});
});

module.exports = router;
