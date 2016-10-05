var mongoose = require('mongoose');

var pizzaSchema = mongoose.Schema({
    teamid: { type: String, required: true },
    pepperoni: { type: number, required: true },
    cheese: { type: number, required: true }
});

module.exports = mongoose.model('Pizza', memberSchema);
