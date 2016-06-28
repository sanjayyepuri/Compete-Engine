var mongoose = require('mongoose');

var competitionSchema = mongoose.Schema({
  competitionname: { type: String, required: true, unique: true },
  language: { type: String, required: true },
});
