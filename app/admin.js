var express  = require('express');
var router  = express.Router();

// The Configuration file for the competition
var Competition = require('../config/competition.js');

// Check if user has admin privelages.
// Make sure to put all other routes under this function.
router.use(function(req, res, next){
    if(req.isAuthenticated() && req.user.type == 'admin'){
      console.log('Admin Connected');
      return next();
    }
    else if(!req.isAuthenticated()){
      console.log('Not an admin account.');
      req.flash('message', 'Please log in.')
      res.redirect('back');
    }
    else {
      console.log('Not an admin account.');
      req.flash('message', 'You are not an admin.');
      res.redirect('back');
    }
});
router.get('/', function(req, res, next){
    res.render('admin', {competition : Competition,
                        user : req.user});
});
module.exports = router;
