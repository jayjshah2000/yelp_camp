var express = require('express');
var router = express.Router();
var middleware = require('../middleware');
var Campground = require('../models/campground');
var Comment = require('../models/comment');

//Comment routes
router.get('/campgrounds/:id/comments/new', middleware.isLoggedIn, function(req, res) {
	Campground.findById(req.params.id, function(err, campground) {
		if (err || !campground) {
			req.flash('error', 'Campground not found...');
			return res.redirect('back');
		} else {
			res.render('comments/new', { campground: campground });
		}
	});
});
//Create comments
router.post('/campgrounds/:id/comments', middleware.isLoggedIn, function(req, res) {
	Campground.findById(req.params.id, function(err, campground) {
		if (err) {
			console.log(err);
			res.redirect('/campgrounds');
		} else {
			Comment.create(req.body.comment, function(err, comment) {
				if (err) {
					req.flash('error', 'Something went wrong...');
					console.log(err);
				} else {
					//add username and comment to id
					comment.author.id = req.user._id;
					comment.author.username = req.user.username;
					//save comment
					comment.save();
					campground.comments.push(comment);
					campground.save();
					req.flash('success', 'Comment added successfully!');
					res.redirect('/campgrounds/' + campground._id);
				}
			});
		}
	});
});

//Edit comment
router.get('/campgrounds/:id/comments/:comment_id/edit', middleware.checkCommentOwner, function(req, res) {
	Campground.findById(req.params.id, function(err, foundCampground) {
		if (err || !foundCampground) {
			req.flash('error', 'Campground not found...');
			return res.redirect('back');
		}
		Comment.findById(req.params.comment_id, function(err, foundComment) {
			if (err || !foundComment) {
				res.redirect('back');
			} else {
				res.render('comments/edit', {
					campground_id: req.params.id,
					comment: foundComment
				});
			}
		});
	});
});
//Update comment
router.put('/campgrounds/:id/comments/:comment_id', middleware.checkCommentOwner, function(req, res) {
	Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, function(err, updatedComment) {
		if (err) {
			res.redirect('back');
		} else {
			res.redirect('/campgrounds/' + req.params.id);
		}
	});
});

//Delete comments
router.delete('/campgrounds/:id/comments/:comment_id', middleware.checkCommentOwner, function(req, res) {
	Comment.findByIdAndRemove(req.params.comment_id, function(err, removedComment) {
		if (err) {
			res.redirect('back');
		} else {
			req.flash('success', 'Comment deleted!');
			res.redirect('/campgrounds/' + req.params.id);
		}
	});
});

module.exports = router;
