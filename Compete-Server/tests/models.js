var User      = require('../app/models/user.js');

exports.generateAdminAccount = function(){
  var user = new User();
  user.teamid = 'Admin';
  user.password = user.generateHash('password');
  user.level = 0;
  User.findOne({teamid : 'Admin'}, function(err, admin){
    if(admin)
      console.log('Default Admin ready.');
    else {
      user.save(function(err){
        if(err) console.log(err);
        else console.log('Default Admin acount created');
      })
    }
  });
}

var Competitor  = require('../app/models/competitor.js');

exports.generateCompetitors = function(){
  for (var i = 0; i < 3; ++i){
      generateCompetitor('Team '+(i+1), 'password', 'school');
  };
}
function generateCompetitor (teamid, password, school){
  var competitor = new Competitor({
    teamid    : teamid,
    school    : school,
    teamscore : 0,
  });

  competitor.save(function(err){
    if(err)
      res.send(err);
    var user = new User();
    user.teamid = teamid;
    user.password = user.generateHash(password);
    user.level = 9;
    user.competitor = competitor._id;
    user.save(function(err){
      if(err)
        console.log(err);
      console.log({success: true, message: 'User created successfully'});
    });
  })
}
