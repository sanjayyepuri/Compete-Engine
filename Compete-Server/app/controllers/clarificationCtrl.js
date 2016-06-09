var Clarification = require('../models/clarification.js');

exports.createClarification = function (req, res){
  var clarification = new Clarificaiton({
    teamid: req.user.teamid,
    problemid: req.body.problemid,
    message: req.body.message
  });

  clarification.save(function(err) {
    if(err) res.send({success: false, error: err});
    res.send({success: true, message: 'Clarification submitted'});
  });
}
