var Competitor = require('../models/competitor.js');
var User = require('../models/user.js');

var Response = require('../models/response.js');

exports.createCompetitor = function (req, res) {
	var competitor = new Competitor({
		teamid: req.body.teamid,
		school: req.body.school,
		teamscore: 0,
	});

	competitor.save(function (err) {
		if (err)
			res.status(500).send(new Response(false, null, err, 'User Failed to be Created'));
		var user = new User();
		user.teamid = req.body.teamid;
		user.password = user.generateHash(req.body.password);
		user.level = 9;
		user.competitor = competitor._id;
		user.save(function (err) {
			if (err)
				res.status(500).send(new Response(false, null, err, 'User Failed to be Created.'));
			res.json(new Response(true, null, null, 'User Created.'));
		});
	})
}
exports.deleteCompetitor = function (req, res) {
	User.remove({
		_id: req.params.team_id
	}, function (err) {
		if (err)
			res.status(500).send(new Response(false, null, err, 'User Failed to be Deleted.'));
		Competitor.remove({
			_id: req.params.team_id
		}, function (err) {
			if (err)
				res.status(500).send(new Response(false, null, err, 'User Failed to be Deleted.'));
		});
		res.send(new Response(true, null, null, 'User Deleted.'));
	});
}

exports.getAll = function (req, res) {
	Competitor.find(function (err, competitors) {
		if (err) {
			res.status(500).send(new Reponse(false, null, err, 'Unable to get All Users'));
		}
		res.json(new Reponse(true, data, null, 'Users Sucessfully Retrieved.'));
	});
}

exports.getCompetitor = function (req, res) {
	Competitor
		.findOne({ _id: req.user._id })
		.populate('members')
		.exec(function (err, competitor) {
			if (err) res.statu(500).send(new Response(false, null, err, 'Unable to get User'));
			res.json(new Response(true, competitor, null, 'User Sucessfully Retrieved'));
		});
}
