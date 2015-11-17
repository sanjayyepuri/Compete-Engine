var mongoose = require('mongoose');
var bcrypt   = require('bcrypt-nodejs');

var userSchema = mongoose.Schema({
  teamid   : {type : String, required : true, dropDups : true, unique : true},
  password : {type : String, required : true},
  level    : {type : Number, required : true},
  competitor : {
                  type      : mongoose.Schema.ObjectId,
                  ref       : 'Competitor',
                  unique    : true,
                }
});
userSchema.methods.generateHash = function(password){
  return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};
userSchema.methods.validPassword = function(password){
  return bcrypt.compareSync(password, this.password);
};

module.exports = mongoose.model('User', userSchema);
