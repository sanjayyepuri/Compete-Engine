var Competitor = require('../models/competitor.js');
var User 			 = require('../models/user.js');

exports.createCompetitor = function(req, res){
	var competitor = new Competitor({
		teamid	: req.body.teamid,
		school	: req.body.school,
		teamscore: parseInt(req.body.teamscore)
	});
	competitor.save(function(err){
		if(err)
			res.send(err);
		res.json({message: 'Competitor ' + req.body.teamid + ' created successfully.'});
	});
}

exports.deleteCompetitor = function(req, res){
	Competitor.remove({
		_id : req.params.team_id
	}, function(err){
		if(err)
			res.send(err);
		res.json({message: 'Competitor ' + req.params.team_id + ' has been deleted.'});
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
	Competitor.find({_id: req.params.team_id}, function(err, competitor){
		if(err)
			res.send(err);
		res.json(competitor);
	});
}
