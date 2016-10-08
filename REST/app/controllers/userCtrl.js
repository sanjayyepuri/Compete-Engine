var User = require('../models/user.js');
var Competitor = require('../models/competitor.js');
var jwt = require('jsonwebtoken');


exports.getAll = function (req, res) {
	User.find(function (err, users) {
		if (err) res.send({ success: false, error: err });
		res.json({ success: true, data: users });
	});
}

exports.get = function (req, res){
	User.find({teamid: req.user.teamid}, function(err, user){
		if (err) {
			res.send({ success: false, error: err });
		}
		else {
			res.json({ success: true, data: user });
		}
	})

}

//Creates a new User and Competitor
exports.createUser = function (req, res) {
	var user = new User({
		teamid: req.body.teamid,
		password: req.body.password,
		level: req.body.level
	});
	user.save(function (err) {
		if (err)
			res.send(err);
		res.json({ success: true, message: 'User created successfully' });
	})
}
// Deletes User and connected Competitor Objects from Database
exports.deleteUser = function (req, res) {
	User.remove({
		_id: req.params.team_id
	}, function (err) {
		if (err)
			res.send(err);
		Competitor.remove({
			_id: req.params.team_id
		}, function (err) {
			if (err)
				res.send(err);
		});
		res.json({ success: true, message: 'User deleted' });
	});
}

exports.authenticate = function (req, res) {
	User.findOne({
		teamid: req.body.teamid
	}, function (err, user) {
		if (err) {
			res.json({ success: false, auth: err });
		}
		else if (!user) {
			res.json({ success: false, auth: "Incorrect Team ID" });
		}
		else if (user) {
			if (!user.validPassword(req.body.password)) {
				res.json({ success: false, auth: "Incorrect Password" });
			}
			else if (user.validPassword(req.body.password)) {
				var token = jwt.sign({ _id: user.competitor, level: user.level, teamid: user.teamid }, "tokensecret", {
					expiresIn: 86400
				});

				res.json({
					success: true,
					auth: 'Logged in',
					data:{
							token: token,
							teamid: user.teamid
						 }
				});
			}
		}
	})
}
