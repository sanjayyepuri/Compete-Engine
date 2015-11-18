var mongoose  = require('mongoose');

var submissionSchema = mongoose.Schema({
  teamid       : {type : String, required: true},
  problemid    : {type : String, required: true},
  submissionid : {type : Number, required: true, unique : true},
  location     : {type : String, required: true},
});

module.exports = mongoose.model('Submission', submissionSchema);
