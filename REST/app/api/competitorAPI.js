var express = require('express');
var jwt = require('jsonwebtoken');
var router = express.Router();
var multer = require('multer');

var Reponse = require('../models/response.js');

var Competitor = require('../models/competitor.js');
var compController = require('../controllers/competitorCtrl.js');
var userController = require('../controllers/userCtrl.js');
var memController = require('../controllers/memberCtrl.js');
var subController = require('../controllers/submissionCtrl.js');


/*
 * Competitor User Level: 9
 */
router.use(function (req, res, next) {
  var token = req.body.token || req.query.token || req.headers['x-access-token'];
  if (token) {
    jwt.verify(token, 'tokensecret', function (err, decoded) {
      if (err) {
        
        return res.status(500).send(new Response(false, null, err, 'Failed to Authenticate.'));
      }
      else {
        if (decoded.level === 9) {
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
 * url: /api/competitor/upload
 * method: POST
 * parameters: teamid, problemid, file 
 */
router.post('/upload', subController.uploadFile);

/* 
 * url: /api/competitor/submissions
 * method: GET
 * parameters: teamid
 */
router.get('/submissions', subController.getSubmissions);

/*
 * url: /api/competitor/file
 * method: POST
 * parameters: submission_id
 * return: A string with contents of submission
 */ 
router.post('/file', subController.getFile);

// router.get('/', compController.getCompetitor);
// router.post('/member', memController.addMember);
// router.delete('/member/:member_id', memController.removeMember)
// router.get('/teams', compController.getAll);

module.exports = router;
