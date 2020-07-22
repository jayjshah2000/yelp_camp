//Require all packages
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var flash = require('connect-flash');
var passport = require('passport');
var localStrategy = require('passport-local');

//Require all models
var methodOverride = require('method-override');
// var Campground = require('./models/campground');
// var Comment = require('./models/comment');
var User = require('./models/user');
var seedDB = require('./seeds');

//Require all the routes
var commentRoutes = require('./routes/comments');
var campgroundRoutes = require('./routes/campgrounds');
var indexRoutes = require('./routes/index'); //Auth routes
//Connect to db
// mongoose.connect(process.env.DATABASEURL, { useNewUrlParser: true, useUnifiedTopology: true });

mongoose
	.connect(process.env.DATABASE_URI, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
		useCreateIndex: true
	})
	.then(() => {
		console.log('Connected to DB!');
	})
	.catch((err) => {
		console.log('ERROR:', err.message);
	});
mongoose.set('useFindAndModify', false);
//config app
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));
app.use(methodOverride('_method'));
app.use(flash());
//Seed the database
// seedDB();
//Moment js in all files
app.locals.moment = require('moment');
//Passport config
app.use(
	require('express-session')({
		secret: 'Cristiano Ronaldo is the best player in the world',
		resave: false,
		saveUninitialized: false
	})
);
app.use(passport.initialize());
app.use(passport.session());
passport.use(new localStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
app.use(function(req, res, next) {
	res.locals.currentUser = req.user;
	res.locals.error = req.flash('error');
	res.locals.success = req.flash('success');
	next();
});
// var campgrounds = [
// 	{
// 		name: 'Kalsubai',
// 		image:
// 			'https://www.nps.gov/mora/planyourvisit/images/OhanaCampground2016_CMeleedy_01_web.jpeg?maxwidth=1200&maxheight=1200&autorotate=false'
// 	},
// 	{
// 		name: 'Sandhan Valley',
// 		image: 'https://cdn2.howtostartanllc.com/images/business-ideas/business-idea-images/Campground.jpg'
// 	},
// 	{
// 		name: 'Kothaligadh',
// 		image:
// 			'https://www.travelwisconsin.com/uploads/places/2f/2fd7b99c-1f31-4a6d-8e01-0b293d58eff8-sawmill-park.jpg?preset=listing-page-slider-desktop'
// 	},
// 	{
// 		name: 'Kasol',
// 		image:
// 			'https://images.thrillophilia.com/image/upload/s---OxOwfNe--/c_fill,f_auto,fl_strip_profile,g_auto,h_600,q_auto,w_975/v1/images/photos/000/185/054/original/1576320445_kasol3.jpg.jpg?1576320445'
// 	}
// ];
app.use(commentRoutes);
app.use(campgroundRoutes);
app.use(indexRoutes);

app.listen(process.env.PORT || 3000, process.env.IP, function() {
	console.log('The YelpCamp server has started!');
});
