var mongoose = require('mongoose');

var pizzaSchema = mongoose.Schema({
    teamid: { type: String, required: true, unique: true },
    pepperoni: { type: Number, required: true },
    cheese: { type: Number, required: true }
});

module.exports = mongoose.model('Pizza', pizzaSchema);
