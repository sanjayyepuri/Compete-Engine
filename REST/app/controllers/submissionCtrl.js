var User = require('../models/user.js');
var Competitor = require('../models/competitor.js');
var Submission = require('../models/submission.js');

var Response = require('../models/response.js');

var fs = require('fs');
var formidable = require('formidable');

var Grid = require('gridfs-stream');
var mongoose = require('mongoose');
var GridFS = Grid(mongoose.connection.db, mongoose.mongo);


exports.getSubmissions = function (req, res) {
  Submission.find({ team_id: req.user._id }, function (err, data) {
    if (err) res.status(500).send(new Response(false, null, err, 'Unable to Retrieve Submission.'));
    else res.json(new Response(true, data, null, 'Submissions Successfully Retrieved.' ));
  });
}


exports.uploadFile = function (req, res) {
  var form = formidable.IncomingForm();
  form.parse(req, function (err, fields, files) {
    if (err) return res.status(500).send(new Response(false, null, err, 'Unable to Upload Submission.'));
    var submission = new Submission({
      team_id: req.user._id,
      problemid: fields.problemid,
      status: 'In Queue',
    });
    var writestream = GridFS.createWriteStream({
      filename: submission.id
    });
    fs.createReadStream(files.upload.path).pipe(writestream)
    submission.save(function (err) {
      if (err) return res.status(500).send(new Response(false, null, err, 'Unable to Upload Submission.'));
      else {
        Competitor.update({ _id: req.user._id }, { $push: { submissions: submission._id } },
          function (err) {
            if (err) res.status(500).send(new Response(false, null, err, 'Unable to Upload Submission.'));
            res.json(new Response(true, null, null, 'Upload Successful.'));
          });
      }
    });

  });
}


exports.getFile = function (req, res) {
  var readstream = GridFS.createReadStream({
    filename: req.body.filename//TODO : make filename 
  });
  readstream.on('error', function (err) {
    res.status(500).send(new Response(false, null, err, 'Unable to Retrieve Submission.'));
  })
  var data = '';
  readstream.on('data', function (chunk) {
    data += chunk;
  });
  readstream.on('end', function () {
    res.send(new Response(true, data, null, 'Submission Retrieved.'));
  });
}