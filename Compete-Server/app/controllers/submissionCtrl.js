var User = require('../models/user.js');
var Competitor = require('../models/competitor.js');
var Submission = require('../models/submission.js');

var fs = require('fs');
var formidable = require('formidable');

var Grid = require('gridfs-stream');
var mongoose = require('mongoose');
var GridFS = Grid(mongoose.connection.db, mongoose.mongo);

var uploadsfolder = '/Users/sanjayyepuri/Documents/CompeteEngine/fileuploads/';


exports.getSubmissions = function (req, res) {
  Submission.find({ team_id: req.user._id }, function (err, data) {
    if (err) res.send({ success: false, error: err });
    else res.json({ success: true, data: data });
  });
}


exports.uploadFile = function (req, res) {
  var form = formidable.IncomingForm();
  form.parse(req, function (err, fields, files) {
    if (err) return res.send(500, { success: false, error: err });
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
      if (err) return res.send({ success: false, error: err });
      else {
        Competitor.update({ _id: req.user._id }, { $push: { submissions: submission._id } },
          function (err) {
            if (err) res.send({ success: false, error: err });
            res.json({ success: true, message: 'Submission uploaded' });
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
    res.send(500, err);
  })
  var data = '';
  readstream.on('data', function (chunk) {
    data += chunk;
  });
  readstream.on('end', function () {
    res.send({ success: true, data: data });
  });
}