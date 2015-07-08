var LocalStrategy = require('passport-local').Strategy;

var User 		= require('../app/models/user');

module.exports = function(passport) {

	//Create default admin account
	User.findOne({'teamid' : 'defAdmin'}, function(err, admin){
		if(err){
			return err;
		}
		else if(!admin){
			var newAdmin = new User();
			newAdmin.teamid = 'defAdmin';
			newAdmin.password = newAdmin.generateHash('root');
			newAdmin.type = 'admin';
			newAdmin.save();
		}
	})

	passport.serializeUser(function(user, done) {
		done(null, user.id);
	});
	passport.deserializeUser(function(id, done){
		User.findById(id, function(err, user){
			done(err, user);
		});
	});

	//Sign Up
	passport.use('local-signup', new LocalStrategy({
		usernameField: 'teamid',
		passwordField: 'password',
		passReqToCallback: true
	},
	function(req, teamid, password, done){
		process.nextTick(function() {
			User.findOne({'teamid' : teamid}, function(err, team){
				if(err)
					return done(err);
				if(team){
					return done(null, false, req.flash('signupMessage', 'That Team ID was taken.'));
				}else {
					var newUser = new User();
					newUser.teamid = teamid.trim();
					newUser.password = newUser.generateHash(password);
					newUser.school = req.body.school;
					newUser.type = 'competitor';
					newUser.save(function(err){
						if(err)
							throw err;
						return done(null, newUser);
					});
				}
			});
		});
	}));

	//Login
	passport.use('local-signin', new LocalStrategy({
		usernameField: 'teamid',
		passwordField: 'password',
		passReqToCallback : true
	},
	function(req, teamid, password, done){
		User.findOne({'teamid' : teamid.trim()}, function(err, team){
			if(err){
				return done(err);
			}
			if(!team){
				return done(null, false, req.flash('loginMessage', 'That Team ID was not found.'));
			}
			if(!team.validPassword(password))
				return done(null, false, req.flash('loginMessage', 'Incorrect Password'));
			return done(null, team);
		});
	}));
};