var express  = require('express');
var router  = express.Router();

// The Configuration file for the competition
var Competition = require('../config/competition.js');

// Check if user has admin privelages.
function loggedIn(req, res, next){
    if(req.isAuthenticated() && req.user.type == 'admin'){
      console.log('Admin Connected');
      return next();
    }
    else if(!req.isAuthenticated()){
      req.flash('message', 'Please log in.')
      res.redirect('back');
    }
    else {
      console.log('Not an admin account.');
      req.flash('message', 'You are not an admin.');
      res.redirect('back');
    }
}
router.get('/',loggedIn, function(req, res, next){
    res.render('admin', {
      competition : Competition,
      user : req.user
    });
});
module.exports = router;
