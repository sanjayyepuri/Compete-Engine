var User = require('../models/user.js');
var Competitor = require('../models/competitor.js');
var jwt = require('jsonwebtoken');

var Response = require('../models/response.js');

exports.getAll = function (req, res) {
	User.find(function (err, users) {
		if (err) res.status(500).send(new Response(false, null, err, 'Unable to Retrieve Users.'));;
		res.json(new Response(true, users, null, 'Users Retrieved.'));
	});
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
			res.status(500).send(new Response(false, null, err, 'Unable to Create User.'));
		res.json(new Response(true, null, null, 'User Created Successfully.  '));
	})
}
// Deletes User and connected Competitor Objects from Database
exports.deleteUser = function (req, res) {
	User.remove({
		_id: req.params.team_id
	}, function (err) {
		if (err)
			res.status(500).send(new Response(false, null, err, 'Unable to Delete User.'));
		Competitor.remove({
			_id: req.params.team_id
		}, function (err) {
			if (err)
				res.status(500).send(new Response(false, null, err, 'Unable to Delete User.'));
		});
		res.json(new Response(true, null, null, 'User Deleted Successfully.'));
	});
}

exports.authenticate = function (req, res) {
	User.findOne({
		teamid: req.body.teamid
	}, function (err, user) {
		if (err) res.status(500).send(new Response(false, null, err, 'Unable to Authenticate.'));
		if (!user) res.json(new Response(false, null, null, 'Incorrect Team ID.'));
		else if (user) {
			if (!user.validPassword(req.body.password)) {
				res.json(new Response(false, null, null, 'Incorrect Password.'));
			}
			else if (user.validPassword(req.body.password)) {
				var token = jwt.sign({ _id: user.competitor, level: user.level, teamid: user.teamid }, "tokensecret", {
					expiresIn: 86400
				});
				res.json(new Response(true, token, null, 'Successfully Authenticated.'));
			}
		}
	})
}
