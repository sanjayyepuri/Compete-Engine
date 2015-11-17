var Competitor = require('../models/competitor.js');
var User 			 = require('../models/user.js');


exports.createCompetitor = function(req, res) {
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
		user.level = 9;
		user.competitor = competitor._id;
		user.save(function(err){
			if(err)
				res.send(err);
			res.json({success: true, message: 'User created successfully'});
		});
	})
}
exports.deleteCompetitor = function(req, res){
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

exports.getAll = function(req, res){
	Competitor.find(function(err, competitors){
		if(err){
			res.send(err);
		}
		res.json(competitors);
	});
}

exports.getCompetitor = function(req, res){
	Competitor.find({_id: req.user.competitor}, function(err, competitor){
		if(err)
			res.send(err);
		res.json(competitor);
	});
}
