module.exports = function(app, passport){

	// The Configuration file for the competition
	var Competition = require('../config/competition.js');

	//Models for the team and the individual
	var Team = require('./models/team');
	var Competitor = require('./models/competitor');


	// Routers
	var admin = require('./admin');
	var competition = require('./competition');

	// All the admin routes should be placed in app/admin.js.
	app.use('/admin', admin);
	// All competitor routes should be placed in app/competition.js.
	app.use('/competition', competition);

// Middleware to add the team object to the request.
// Placed here so team could be added to the index page so the status bar
// is displayed.
	app.use(function(req, res, next){
	  if(req.isAuthenticated() && req.user.type == 'competitor'){
	    Team.findOne({teamid : req.user.teamid}, function (err, team){
	      if(err)
	        return err;
	      if(!team){
	        console.log('Error: Team not found(middleware unable retrieve team)');
	        return;
	      }
	      req.team = team;
	      next();
	    });
	  }
	  else
	    next();
	});


	//Main Page
	app.get('/',function(req, res, next) {
		res.render('index', {
			user			: req.user,
			team			: req.team,
			message			: req.flash('message'),
			signupmessage	: req.flash('signupMessage'),
			loginmessage 	: req.flash('loginMessage'),
			competition		: Competition
		});
	});

	// Sign up POST
	app.post('/signup', passport.authenticate('local-signup', {
		failureRedirect : '/',
		failureFlash : true
	}),
	function(req, res){
		// Creates an instance for the Team Model
		var newTeam = new Team();
		newTeam.teamid = req.body.teamid;
		newTeam.school = req.body.school;
		newTeam.teamscore = 0;
		newTeam.save();
		res.redirect('/competition/info');
	});

	// Login POST
	app.post('/login', passport.authenticate('local-signin',{
		failureRedirect : '/',
		failureFlash 	: true
	}),
	function(req, res){
		if(req.user.type == 'admin') res.redirect('/admin');
		else if(req.user.type == 'competitor') res.redirect('/competition');
		else{
			console.log('ERROR: undefined user type');
			res.redirect('/');
		}
	});

	// Logout POST
	app.get('/logout', function(req, res){
		req.logout();
		res.redirect('/');
	});
};
