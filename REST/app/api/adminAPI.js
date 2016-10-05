var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken');

var Reponse = require('../models/response.js');

var Competitor = require('../models/competitor.js');
var compController = require('../controllers/competitorCtrl.js');
var userController = require('../controllers/userCtrl.js');

/*
 * Competitor User Level: 0
 */
router.use(function (req, res, next) {
  var token = req.body.token || req.query.token || req.headers['x-access-token'];
  if (token) {
    jwt.verify(token, 'tokensecret', function (err, decoded) {
      if (err) {

        return res.status(500).send(new Response(false, null, err, 'Failed to Authenticate.'));
      }
      else {
        if (decoded.level === 0) {
          req.user = decoded;
          next();
        }
        else {

          return res.status(403).send();
        }
      }
    })
  } else {
    return res.status(403).send(new Response(false, null, null, 'No Token Provided'));
  }
});

//Competitor CRUD
router.get('/competitor', compController.getAll);
router.post('/competitor', compController.createCompetitor);
router.delete('/competitor/:team_id', compController.deleteCompetitor);

//User CRUD
router.get('/users', userController.getAll);
router.get('/user', userController.get);
router.post('/user', userController.createUser);
router.delete('/user/:team_id', userController.deleteUser);

module.exports = router;
