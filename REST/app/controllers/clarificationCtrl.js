var Clarification = require('../models/clarification.js');

var Response = require('../models/response.js');

exports.createClarification = function (req, res){
  var clarification = new Clarification({
    teamid: req.user.teamid,
    problemid: req.body.problemid,
    message: req.body.message
  });

  clarification.save(function(err) {
    if(err) res.status(500).send(new Response(false, null. err, 'Clarification Failed to Submit.'));
    res.send(new Response(true, null, null, 'Clarification Submitted.'));
  });
}
