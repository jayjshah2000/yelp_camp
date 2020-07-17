var mongoose = require('mongoose');
var Campground = require('./models/campground');
var Comment = require('./models/comment');
var data = [
	{
		name: 'Kalsubai',
		image:
			'https://www.nps.gov/mora/planyourvisit/images/OhanaCampground2016_CMeleedy_01_web.jpeg?maxwidth=1200&maxheight=1200&autorotate=false',
		description:
			'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque tortor elit, vestibulum at erat nec, lobortis porta nibh. Cras diam metus, gravida non est non, mollis posuere ante. Nullam quis scelerisque tortor. Duis ipsum orci, rhoncus et nibh vel, finibus ultrices nunc. Aenean euismod tincidunt vulputate. Maecenas dapibus massa et mi imperdiet, eu fermentum libero mollis. Curabitur scelerisque ac odio nec sodales. Sed augue nulla, elementum in blandit a, condimentum vitae turpis. Vivamus condimentum orci id orci lacinia porttitor. Vivamus id laoreet erat, et consectetur augue. Mauris elit nisl, lobortis in varius eget, consectetur vel nibh. Donec posuere feugiat orci, sed imperdiet ex mollis eu. Integer semper in ante at pharetra. Praesent malesuada, lacus nec posuere viverra, elit nibh varius nulla, vitae dapibus nunc tellus sit amet sem. Duis nisi arcu, malesuada id lobortis dignissim, aliquam sit amet nisl. Fusce eu diam vel lacus interdum commodo vitae vitae orci. Proin vel finibus est. Ut gravida, nulla ut lacinia rhoncus, purus turpis sagittis mauris, et egestas erat odio fermentum augue. Cras lacus nunc, rhoncus id lorem sit amet, porta tristique leo. Nullam viverra lobortis enim ac elementum. Maecenas tristique mollis ante eget tristique.'
	},
	{
		name: 'Sandhan Valley',
		image: 'https://cdn2.howtostartanllc.com/images/business-ideas/business-idea-images/Campground.jpg',
		description:
			'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque tortor elit, vestibulum at erat nec, lobortis porta nibh. Cras diam metus, gravida non est non, mollis posuere ante. Nullam quis scelerisque tortor. Duis ipsum orci, rhoncus et nibh vel, finibus ultrices nunc. Aenean euismod tincidunt vulputate. Maecenas dapibus massa et mi imperdiet, eu fermentum libero mollis. Curabitur scelerisque ac odio nec sodales. Sed augue nulla, elementum in blandit a, condimentum vitae turpis. Vivamus condimentum orci id orci lacinia porttitor. Vivamus id laoreet erat, et consectetur augue. Mauris elit nisl, lobortis in varius eget, consectetur vel nibh. Donec posuere feugiat orci, sed imperdiet ex mollis eu. Integer semper in ante at pharetra. Praesent malesuada, lacus nec posuere viverra, elit nibh varius nulla, vitae dapibus nunc tellus sit amet sem. Duis nisi arcu, malesuada id lobortis dignissim, aliquam sit amet nisl. Fusce eu diam vel lacus interdum commodo vitae vitae orci. Proin vel finibus est. Ut gravida, nulla ut lacinia rhoncus, purus turpis sagittis mauris, et egestas erat odio fermentum augue. Cras lacus nunc, rhoncus id lorem sit amet, porta tristique leo. Nullam viverra lobortis enim ac elementum. Maecenas tristique mollis ante eget tristique.'
	},
	{
		name: 'Kothaligadh',
		image:
			'https://www.travelwisconsin.com/uploads/places/2f/2fd7b99c-1f31-4a6d-8e01-0b293d58eff8-sawmill-park.jpg?preset=listing-page-slider-desktop',
		description:
			'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque tortor elit, vestibulum at erat nec, lobortis porta nibh. Cras diam metus, gravida non est non, mollis posuere ante. Nullam quis scelerisque tortor. Duis ipsum orci, rhoncus et nibh vel, finibus ultrices nunc. Aenean euismod tincidunt vulputate. Maecenas dapibus massa et mi imperdiet, eu fermentum libero mollis. Curabitur scelerisque ac odio nec sodales. Sed augue nulla, elementum in blandit a, condimentum vitae turpis. Vivamus condimentum orci id orci lacinia porttitor. Vivamus id laoreet erat, et consectetur augue. Mauris elit nisl, lobortis in varius eget, consectetur vel nibh. Donec posuere feugiat orci, sed imperdiet ex mollis eu. Integer semper in ante at pharetra. Praesent malesuada, lacus nec posuere viverra, elit nibh varius nulla, vitae dapibus nunc tellus sit amet sem. Duis nisi arcu, malesuada id lobortis dignissim, aliquam sit amet nisl. Fusce eu diam vel lacus interdum commodo vitae vitae orci. Proin vel finibus est. Ut gravida, nulla ut lacinia rhoncus, purus turpis sagittis mauris, et egestas erat odio fermentum augue. Cras lacus nunc, rhoncus id lorem sit amet, porta tristique leo. Nullam viverra lobortis enim ac elementum. Maecenas tristique mollis ante eget tristique.'
	}
];
function seedDB() {
	Campground.deleteMany({}, function(err) {
		// 	if (err) {
		// 		console.log(err);
		// 	} else {
		// 		console.log('Removed all campgrounds');
		// 		data.forEach(function(seed) {
		// 			Campground.create(seed, function(err, campground) {
		// 				if (err) {
		// 					console.log(err);
		// 				} else {
		// 					console.log('Added a campground');
		// 					Comment.create(
		// 						{
		// 							text: 'Beautiful place. Must visit once in your life!',
		// 							author: 'Jay Shah'
		// 						},
		// 						function(err, comment) {
		// 							if (err) {
		// 								console.log(err);
		// 							} else {
		// 								campground.comments.push(comment);
		// 								campground.save();
		// 								console.log('Created new comment!');
		// 							}
		// 						}
		// 					);
		// 				}
		// 			});
		// 		});
		// 	}
	});
}
module.exports = seedDB;
