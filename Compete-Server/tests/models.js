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
