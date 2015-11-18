var mongoose   = require('mongoose');

var memberSchema = mongoose.Schema({
  teamid        : {type: String, required : true},
  firstname     : {type: String, required : true},
  lastname      : {type: String, required : true},
  writtenscore  : {type : Number, required : true}
});

module.exports = mongoose.model('Member', memberSchema);
