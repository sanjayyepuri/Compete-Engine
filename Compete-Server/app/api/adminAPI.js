var express = require('express');
var router = express.Router();

var Competitor = require('../models/competitor.js');

var compController = require('../controllers/competitorCtrl.js');

router.get('/competitor', compController.getAll);
router.post('/competitor', compController.createCompetitor);
router.delete('/competitor/:team_id', compController.deleteCompetitor);


module.exports = router;
