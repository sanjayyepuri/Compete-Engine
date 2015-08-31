var mongoose	= require('mongoose');
var bcrypt		= require('bcrypt-nodejs');

var competitorSchema = mongoose.Schema({
	teamid		: String,
	school		: String,
	teamscore	: Number
});

module.exports = mongoose.model('Competitor', competitorSchema);
