var User        = require('../models/user.js');
var Competitor  = require('../models/competitor.js');
var Submission  = require('../models/submission.js');
var jwt         = require('jsonwebtoken');
var fs 		     	= require('fs');
var formidable  = require('formidable');

 var uploadsfolder = '/Users/sanjayyepuri/Documents/CompeteEngine/fileuploads/';


/*exports.uploadFile = function(req, res){
  var form = new formidable.IncomingForm();
  form.parse(req, function(err, fields, files){
    if(!files.upload){
      res.send({success: false, message : 'Please Select a File.'});
    }
    if(err) res.send(err);

    var submission = new Submission({
      team_id : req.user._id,
      problemid : fields.problemid,
    });

    var path = uploadsfolder+req.user._id+'/'+fields.problemid;
    createPath(req, fields);
    submission.location = path;
    fs.rename( files.upload.path ,path+'/'+submission._id+'.java', function(err){
      if(err) res.send({success: false, error : err});
      submission.save(function(err){
        if(err) res.send({success: false, error : err});
        Competitor.update({_id : req.user._id}, { $push : {submissions : submission._id}},
          function(err){
            if(err) res.send({success : false, error : err});
          });
        res.json({success : true, message: 'Submission Uploaded'});
      });
    });
  });
}*/
exports.getSubmissions = function(req, res){
  Submission.find({team_id: req.user._id}, function(err, data){
    if(err) res.send({success : false, error : err});
    else res.json({success : true, data : data});

  })
}
/*
exports.uploadFile = function(req, res){
  var form = new formidable.IncomingForm();
  form.parse(req, function(err, fields, files){
    if(err)res.send({success: false, error : err});
    if(!files.upload) res.send({success : false, message : 'Please Select a File.'});

    fs.readFile(files.upload.path, 'utf-8', function(err, data){
      if(err) res.send({success : false, error : err});
      var submission = new Submission({
        team_id   : req.user._id,
        problemid : fields.problemid,
        data      : data+'//'+req.user._id,
        status    : 'In Queue'
      });
      submission.save(function(err) {
        if(err)res.send({success : false, error : err});
        else {
          Competitor.update({_id: req.user._id}, {$push : {submissions : submission._id}},
            function(err){
              if(err) res.send({success : false, error: err});
              res.json({success : true, message : 'Submission uploaded'});
            });
        }
      });
    }); 
  });
}
*/

var Grid = require('gridfs-stream');
var mongoose = require('mongoose');
var GridFS = Grid(mongoose.connection.db, mongoose.mongo);

exports.uploadFile = function(req, res){
  var form = new formidable.IncomingForm();
  form.parse(req, function(err, fields, files){
    if(err) res.send({success : false, error : err});
    var submission = new Submission({
      team_id : req.user._id,
      problemid : fields.problemid,
      status : 'In Queue',
    });
    var writestream = GridFS.createWriteStream({
      filename : submission.id,
    });
    fs.createReadStream(files.upload.path).pipe(writestream);
    //sres.send({success : true})
    submission.save(function(err){
        if(err) return res.send({success : false, error :err});
        else {
          Competitor.update({_id: req.user._id}, {$push : {submissions : submission._id}},
            function(err){
              if(err) res.send({success : false, error: err});
              res.json({success : true, message : 'Submission uploaded'});
            });
        }
    });
  });
}

exports.getFile = function(req, res){
  var readstream = GridFS.createReadStream({
    filename : mongoose.Types.ObjectId(req.body.filename)//TODO : make filename 
  });
  readstream.on('error', function(err){
    res.send(500, err);
  })
  var data;
  res.send({success: true, data : data});
}

function createPath(req, fields){
  if(!fs.existsSync(uploadsfolder+req.user._id)){
    fs.mkdir(uploadsfolder+req.user._id);
  }
  if(!fs.existsSync(uploadsfolder+req.user._id+'/'+fields.problemid)){
    fs.mkdir(uploadsfolder+req.user._id+'/'+fields.problemid);
  }
}
