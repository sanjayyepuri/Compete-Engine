var User        = require('../models/user.js');
var Competitor  = require('../models/competitor.js');
var Submission  = require('../models/submission.js');
var jwt         = require('jsonwebtoken');
var fs 		     	= require('fs');
var formidable  = require('formidable');

 var uploadsfolder = '/Users/sanjayyepuri/Documents/CompeteEngine/fileuploads/';


exports.uploadFile = function(req, res){
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
}

function createPath(req, fields){
  if(!fs.existsSync(uploadsfolder+req.user._id)){
    fs.mkdir(uploadsfolder+req.user._id);
  }
  if(!fs.existsSync(uploadsfolder+req.user._id+'/'+fields.problemid)){
    fs.mkdir(uploadsfolder+req.user._id+'/'+fields.problemid);
  }


}

