var mongoose = require('mongoose');

var competitorSchema = mongoose.Schema({
	firstname	: String, 
	lastname	: String,
	writtenScore: Number,
	teamid		: String
});

module.exports = mongoose.model('Competitor', competitorSchema);