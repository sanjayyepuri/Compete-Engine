var express = require('express');
var router = express.Router();

// The Configuration file for the competition
var Competition = require('../config/competition.js');

//Models for the team and the individual
var Team = require('./models/team');
var Competitor = require('./models/competitor');

// Middleware to add the team object to the request.
router.use(function(req, res, next){
  if(req.isAuthenticated() && req.user.type == 'competitor'){
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

router.get('/', loggedIn, function(req, res, next){
  res.redirect('/competition/info');
});

// The page where competitor information is displayed. Get the information in an asyncrhonous call
// and then render the page. Queries DB for competitors with the team id which then returns an array.
router.get('/info', loggedIn, function(req, res, next){
	Competitor.find({'teamid' : req.team.teamid}, function(err, members){
		var mem = {};
		if(err){
			return err;
		}
		else{
			mem = members;
			res.render('info', {
				user	: req.user,
        team  : req.team,
				title	: req.user.teamid,
				members	: members,
				competition : Competition
			});
		}
	});
});

// Save the competitor model and then link it to the team model.
router.post('/addmember', loggedIn, function(req, res, next){
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


//Method to check if the user is authenticated.
function loggedIn(req, res, next){
	if(req.isAuthenticated())
		return next();
	req.flash('message', 'Please log in or sign up.');
	res.redirect('/');
}


module.exports = router;
