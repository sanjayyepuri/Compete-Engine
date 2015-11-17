var mongoose	= require('mongoose');
var bcrypt		= require('bcrypt-nodejs');

var competitorSchema = mongoose.Schema({
	teamid		: {type : String, unique: true, required: true, dropDups: true},
	school		: {type : String, required : true},
});

module.exports = mongoose.model('Competitor', competitorSchema);
