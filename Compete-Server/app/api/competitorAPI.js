var express = require('express');
var jwt    = require('jsonwebtoken');
var router = express.Router();

var Competitor = require('../models/competitor.js');
var compController = require('../controllers/competitorCtrl.js');
var userController = require('../controllers/userCtrl.js');

router.use(function(req, res, next){
  var token = req.body.token || req.query.token || req.headers['x-access-token'];
  if(token){
    jwt.verify(token, 'tokensecret', function(err, decoded){
      if(err){
        return res.json({success : false, auth : 'Failed to authenticate', error : err});
      }
      else {
        if(decoded.level === 9){
          req.user = decoded;
          next();
        }
        else {
          return res.status(403).send({
            success : false,
            auth : 'Incorrect user level',
          });
        }
      }
    })
  } else {
    return res.status(403).send({
      success : false,
      auth : 'No token provided.'
    });
  }
});
router.get('/', compController.getCompetitor);
//File uploads test
//router.post('/submission/:team_id/:problem_name', compController.uploadFile);

module.exports = router;
