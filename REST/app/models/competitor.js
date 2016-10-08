var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');

var competitorSchema = mongoose.Schema({
	teamid: { type: String, unique: true, required: true, dropDups: true },
	school: { type: String, required: false },
	teamscore: { type: Number, required: true },
	submissions: [{
		type: mongoose.Schema.ObjectId,
		ref: 'Competitor',
		unique: true
	}],
	members: [{
		type: mongoose.Schema.ObjectId,
		ref: 'Member',
		unique: true
	}]

});

module.exports = mongoose.model('Competitor', competitorSchema);
