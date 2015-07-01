var mongoose	= require('mongoose')


var teamSchema = mongoose.Schema({
	teamid: String,
	school: String,
	members:[{
		type :	mongoose.Schema.Types.ObjectId,
		 ref : 'Competitor'
	}],	
	teamscore: Number
});

module.exports = mongoose.model('Team', teamSchema);