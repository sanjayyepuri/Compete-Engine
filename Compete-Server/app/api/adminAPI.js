var express = require('express');
var router = express.Router();
var jwt    = require('jsonwebtoken');

var Competitor = require('../models/competitor.js');
var compController = require('../controllers/competitorCtrl.js');
var userController = require('../controllers/userCtrl.js');

router.use(function(req, res, next){
  var token = req.body.token || req.query.token || req.headers['x-access-token'];
  if(token) {
    jwt.verify(token, 'tokensecret', function(err, decoded){
      if(err){
        return res.json({success : false, auth: 'Failed to Authenticate.', error : err});
      }
      else{
        req.user = decoded;
        if(decoded.level === 0)
          next();
        else
          return res.status(403).send({
            success: false,
            auth: 'Not an admin'
          })
      }
    })
  } else {
    return res.status(403).send({
      success: false,
      auth: 'No token provided.'
    });
  }

});

//Competitor CRUD
router.get('/competitor', compController.getAll);
router.post('/competitor', compController.createCompetitor);
router.delete('/competitor/:team_id', compController.deleteCompetitor);

//User CRUD
router.get('/user', userController.getAll);
router.post('/user', userController.createUser);
router.delete('/user/:team_id', userController.deleteUser);

module.exports = router;
