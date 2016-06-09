var mongoose = require('mongoose');

var clarificationSchema = mongoose.Schema({
  teamid: { type: String, unique: true, required: true, dropDups: true },
  problemid: { type: String, required: true },
  message: { type: String, required: true }
});

module.exports = mongoose.model('Clarification', clarificationSchema);
