var mongoose 	= require('mongoose');
var bcrypt 		= require('bcrypt-nodejs');

var userSchema = mongoose.Schema({
	teamid 	: String,
	password: String,
	school	: String,
	type		: String,
});
userSchema.methods.generateHash = function(password){
	return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};
userSchema.methods.validPassword = function(password){
	return bcrypt.compareSync(password, this.password);
};

module.exports = mongoose.model('User', userSchema);
