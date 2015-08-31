var User = require('../models/user.js');
var Competitor = require('../models/competitor.js');
var jwt = require('jsonwebtoken');

exports.createUser = function(req, res){
	var user = new User({
		teamid : req.body.teamid,
		password : req.body.password
	});
	user.save(function(err){
		if(err)
			res.send(err);
		res.json({success: true, message: 'User created.'});
	});
}

exports.deleteUser = function(req, res) {
	User.remove({
		_id : req.params.team_id
	}, function(err){
		if(err)
			res.send(err);
		res.json({success: true,  message: 'User deleted' });
	});
}

exports.authenticate = function(req, res) {
		User.findOne({
			teamid: req.body.teamid
		}, function(err, team){
			if(err) throw err;
			if(!team) res.json({success: false, message: "Team not found."});
			else if (team){
				if(!team.password == req.body.password){
					res.json({success: false, message: "Incorrect Password"});
				}
				else{
					var token = jwt.sign(team, "erikisgay420blazeit23", {
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
