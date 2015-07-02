module.exports = function(app, passport){
	//Models for the team and the individual
	var Team = require('./models/team');
	var Competitor = require('./models/competitor');

	// The Configuration file for the competition
	var Competition = require('../config/competition.js');

	// Admin Routes
	var admin = require('./admin');

	//Admin
	app.use('/admin', admin);

	// Middleware to add the team object to the request.
	app.use(function(req, res, next){
		if(req.isAuthenticated()){
			if(req.user.type == 'admin'){
				res.redirect('/admin');
				return;
			}
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
			user			: req.team,
			message			: req.flash('message'),
			signupmessage	: req.flash('signupMessage'),
			loginmessage 	: req.flash('loginMessage'),
			competition		: Competition
		});
	});

	// The page where competitor information is displayed. Get the information in an asyncrhonous call
	// and then render the page. Queries DB for competitors with the team id which then returns an array.
	app.get('/competition/info', loggedIn, function(req, res, next){
		Competitor.find({'teamid' : req.team.teamid}, function(err, members){
			var mem = {};
			if(err){
				return err;
			}
			else{
				mem = members;
				res.render('info', {
					user	: req.team,
					title	: req.user.teamid,
					members	: members,
					competition : Competition
				});
			}
		});
	});

	// Save the competitor model and then link it to the team model.
	app.post('/addmember', loggedIn, function(req, res, next){
		// Create new Competitor
		var newComp = new Competitor();
		newComp.firstname = req.body.firstname.trim();
		newComp.lastname = req.body.lastname.trim();
		newComp.teamid = req.user.teamid;
		newComp.save();
		// Add the individual to the team
		Team.findOne({'teamid': req.user.teamid}, function(err, team){
			if(err)
				return err;
			if(!team){
				// if loggedIn Team has to be found meaning this should never happen
				console.log('Error: Team not found.');
				return;
			}
			team.members.push(newComp._id);
			team.markModified('members');
			team.save();
		});

		res.redirect('/competition/info');
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
	app.post('/login', passport.authenticate('local-signin', {
		successRedirect : '/competition/info',
		failureRedirect : '/',
		failureFlash 	: true
	}));

	// Logout POST
	app.get('/logout', function(req, res){
		req.logout();
		res.redirect('/');
	});

	//Method to check if the user is authenticated.
	function loggedIn(req, res, next){
		if(req.isAuthenticated())
			return next();
		req.flash('message', 'Please log in or sign up.');
		res.redirect('/');
	}
};
