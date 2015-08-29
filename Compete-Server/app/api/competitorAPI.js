var express = require('express');
var router = express.Router();

var Competitor = require('../models/competitor.js');
var compController = require('../controllers/competitorCtrl.js');
var userController = require('../controllers/userCtrl.js');

router.post('/user', userController.createUser);
router.delete('/user/:team_id', userController.deleteUser);
