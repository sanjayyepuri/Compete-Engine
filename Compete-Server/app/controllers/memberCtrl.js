var Member    = require('../models/member.js');
var Competitor= require('../models/competitor.js');


exports.addMember = function(req, res){
  Competitor.findOne({_id : req.user._id}, function(err, competitor){
    if(err)
      res.send({success: false, error : err});
    var member = new Member({
      teamid        : competitor.teamid,
      firstname     : req.body.firstname,
      lastname      : req.body.lastname,
      writtenscore  : 0
    });
    member.save(function(err){
      if(err)
        res.send({success: false, error : err});
      competitor.members.push(member._id);
      competitor.save(function(err){
        if(err)
          res.send({success: false, error : err});
        res.json({success : true, message : 'Member added.'});
      });
    });
  });
}

exports.getMembers = function(req, res){
  Member.find({team_id : req.user._id}, function(err, members){
    if(err) res.send({success : false, error : err});
    res.json({success : true, error : err});
  });
}

exports.removeMember = function(req, res){
    Member.remove({_id : req.params.member_id}, function(err){
      if(err){
        res.send({success: false, error : err});
      }
      Competitor.update({_id : req.user._id}, { $pullAll : {members : [req.params.member_id]}},
      function(err){
        if(err) res.send({success: false, error: err});
        res.json({success : true, message: 'Member deleted'});
      });

    })
}
