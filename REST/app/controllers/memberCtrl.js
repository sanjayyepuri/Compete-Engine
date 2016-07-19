var Member = require('../models/member.js');
var Competitor = require('../models/competitor.js');

var Response = require('../models/response.js');

exports.addMember = function (req, res) {
  Competitor.findOne({ _id: req.user._id }, function (err, competitor) {
    if (err)
      res.status(500).send(new Response(false, null, err, 'Member Failed to Add.'));
    var member = new Member({
      teamid: competitor.teamid,
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      writtenscore: 0
    });
    member.save(function (err) {
      if (err)
        res.status(500).send(new Response(false, null, err, 'Member Failed to Add.'));
      competitor.members.push(member._id);
      competitor.save(function (err) {
        if (err)
          res.status(500).send(new Response(false, null, err, 'Member Failed to Add.'));
        res.json(new Response(true, null, null, 'Member Successfullly Added.'));
      });
    });
  });
}

exports.getMembers = function (req, res) {
  Member.find({ team_id: req.user._id }, function (err, members) {
    if (err) res.status(500).send(new Response(false, null, err, 'Members unable to be Retrieved.'));
    res.json(new Response(true, members, null, 'Members Retrieved Successfullly.'));
  });
}

exports.removeMember = function (req, res) {
  Member.remove({ _id: req.params.member_id }, function (err) {
    if (err) {
      res.status(500).send(new Response(false, null, err, 'Unable to Remove Member.'));
    }
    Competitor.update({ _id: req.user._id }, { $pullAll: { members: [req.params.member_id] } },
      function (err) {
        if (err) res.status(500).send(new Response(false, null, err, 'Unable to Delete Member.'));
          
        res.json(new Response(true, null, null, 'Member Successfullly Deleted.'));
      });

  })
}
