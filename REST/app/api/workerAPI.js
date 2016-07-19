var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken');

var Response = require('../models/response.js');

var subController = require('../controllers/submissionCtrl.js');

/*
 * Worker User Level: 3 
 */
router.use(function (req, res, next) {
  var token = req.body.token || req.query.token || req.headers['x-access-token'];
  if (token) {
    jwt.verify(token, 'tokensecret', function (err, decoded) {
      if (err) {
        
        return res.status(500).send(new Response(false, null, err, 'Failed to Authenticate.'));
      }
      else {
        if (decoded.level === 3) {
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

/*
 * url: /api/worker/file
 * method: POST 
 * parameters: submission_id
 * return: A string with contents of submission
 */ 
router.post('/file', subController.getFile);

module.exports = router;