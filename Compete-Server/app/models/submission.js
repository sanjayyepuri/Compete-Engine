var mongoose  = require('mongoose');

var submissionSchema = mongoose.Schema({
  team_id       : {type : String, required: true},
  problemid     : {type : String, required: true},
  data          : {type : String, required : true, unique : true},
  status        : {type : String, required : true}
});

module.exports = mongoose.model('Submission', submissionSchema);
