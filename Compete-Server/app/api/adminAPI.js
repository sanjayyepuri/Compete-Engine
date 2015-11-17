var express = require('express');
var router = express.Router();

var Competitor = require('../models/competitor.js');
var compController = require('../controllers/competitorCtrl.js');
var userController = require('../controllers/userCtrl.js');

/*router.use(function(req, res, next){
  var token = req.body.token || req.query.token || req.headers['x-access-token'];
  if(token) {
    jwt.verify(token, 'tokensecret', function(err, decoded){
      if(err){
        return res.json({sucess : false,message: 'Failed to Authenticate.'});
      }
      else{
        req.decoded = decoded;
        next();
      }
    })
  } else {
    return res.status(403).send({
      success: false,
      message: 'No token provided.'
    });
  }

});*/

//Competitor CRUD
router.get('/competitor', compController.getAll);
router.post('/competitor', compController.createCompetitor);
router.delete('/competitor/:team_id', compController.deleteCompetitor);

//User CRUD
router.post('/user', userController.createUser);
router.delete('/user/:team_id', userController.deleteUser);

//Authentication
router.post('/authenticate', userController.authenticate);

module.exports = router;
