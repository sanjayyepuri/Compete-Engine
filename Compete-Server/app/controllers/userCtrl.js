var User 			 = require('../models/user.js');
var Competitor = require('../models/competitor.js');
var jwt = require('jsonwebtoken');


//Creates a new User and Competitor
exports.createUser = function(req, res) {
	var competitor = new Competitor({
		teamid 		:	req.body.teamid,
		school 		: req.body.school,
		teamscore : 0,
	});

	competitor.save(function(err){
		if(err)
			res.send(err);
		var user = new User();
		user.teamid = req.body.teamid;
		user.password = user.generateHash(req.body.password);

		user.save(function(err){
			if(err)
				res.send(err);
			res.json({success: true, message: 'User created successfully'});
		});
	})
}
// Deletes User and connected Competitor Objects from Database
exports.deleteUser = function(req, res) {
	User.remove({
		_id : req.params.team_id
	}, function(err){
		if(err)
			res.send(err);
		Competitor.remove({
			_id : req.params.team_id
		}, function(err){
			if(err)
				res.send(err);
		});
		res.json({success: true,  message: 'User deleted' });
	});
}

exports.authenticate = function(req, res) {
		User.findOne({
			teamid: req.body.teamid
		}, function(err, user){
			if(err) throw err;
			if(!user) res.json({success: false, message: "Team not found."});
			else if (user){
				if(!user.validPassword(req.body.password)){
					res.json({success: false, message: "Incorrect Password"});
				}
				else if(user.validPassword(req.body.password)){
					var token = jwt.sign(user, "erikisgay420blazeit23", {
						expiresInMinutes: 1440
					});

					res.json({
						success: true,
						message: 'Logged in',
						token: token
					});
				}
			}
		})
}
