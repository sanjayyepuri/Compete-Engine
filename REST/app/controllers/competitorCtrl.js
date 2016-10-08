var Competitor = require('../models/competitor.js');
var User = require('../models/user.js');
var Member = require('../models/member.js');


exports.createCompetitor = function (req, res) {
	var competitor = new Competitor({
		teamid: req.body.teamid,
		school: req.body.school,
		teamscore: 0,
	});

	competitor.save(function (err) {
		if (err)
			res.send(err);
		var user = new User();
		user.teamid = req.body.teamid;
		user.password = user.generateHash(req.body.password);
		user.level = 9;
		user.competitor = competitor._id;
		user.save(function (err) {
			if (err)
				res.send(err);
			res.json({ success: true, message: 'User created successfully' });
		});
	})
}
exports.deleteCompetitor = function (req, res) {
	User.remove({
		_id: req.params.team_id
	}, function (err) {
		if (err) {
			res.send(err);
		}
		Competitor.remove({
			_id: req.params.team_id
		}, function (err) {
			if (err)
				res.send(err);
		});
		res.json({ success: true, message: 'User deleted' });
	});
}

exports.getAll = function (req, res) {
	Competitor.find(function (err, competitors) {
		if (err) {
			res.send(err);
		}
		res.json({ success: true, data: competitors });
	});
}

exports.getCompetitor = function (req, res) {
	Competitor
		.findOne({ _id: req.user._id })
		.populate('members')
		.exec(function (err, competitor) {
			if (err) {
				res.send({ success: false, error: err });
			}
			else if (competitor) {
				res.json({ success: true, data: competitor });
			} else {
				res.json({ success: false, error: 'Competitor not found.' });
			}
		});
}

exports.updateCompetitor = function (req, res) {

	var team = req.body.team;
	console.log(JSON.stringify(team));
	var memberIds = [];

	team.members.forEach(function (member) {
		if (member._id) {
			Member.findOneAndUpdate({ _id: member._id }, { firstname: member.firstname, lastname: member.lastname, school: team.school });
			memberIds.push(member._id);
		} else {
			var newMember = new Member({
				teamid: team.teamid,
				firstname: member.firstname,
				lastname: member.lastname,
				school: team.school,
				writtenscore: -1
			});
			memberIds.push(newMember._id);
			newMember.save(function (err) {
				if (err) {
					res.send({ success: false, error: err });
				}

			});
		}
	});


	Competitor.findOne({ _id: req.user._id }, function (err, competitor) {
		if (err) {
			res.send({ success: false, error: err });
		}

		competitor.members = memberIds;

		competitor.school = team.school;
		competitor.save(function (err) {
			if (err)
				res.send({ success: false, error: err });
			else {
				res.json({ success: true, message: 'Competitor Updated.' });
			}
		});

	});
}
var Clarification = require('../models/clarification.js');

exports.createClarification = function (req, res) {
	var clarification = new Clarificaiton({
		teamid: req.user.teamid,
		problemid: req.body.problemid,
		message: req.body.message
	});

	clarification.save(function (err) {
		if (err) res.send({ success: false, error: err });

		res.send({ success: true, message: 'Clarification submitted' });
	});
}
