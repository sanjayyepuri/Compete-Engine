var LocalStrategy = require('passport-local').Strategy;
var Team = require('../app/models/user');

module.exports = function(passport) {
  passport.serializeUser(function(user, done){
    done(null, user.id);
  });
  passport.deserializeUser(function(id, done){
    Team.findById(id, function(err, team){
      done(err, user);
    });
  });

  passport.use('loca-signup', new LocalStrategy({
    usernameField : 'teamid',
    passwordField : 'password',
    passReqToCallback : true
  }));

};
