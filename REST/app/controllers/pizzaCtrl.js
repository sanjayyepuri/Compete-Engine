var Pizza = require('../models/pizza.js');

exports.createPizza = function (req, res) {

    var pizza = new Pizza({
        teamid: req.user.teamid,
        pepperoni: req.body.pepperoni,
        cheese: req.body.cheese
    });

    pizza.save(function (err) {
        if (err) {
            res.json({ success: false, error: err });
        }
        else {
            res.json({ success: true, message: 'Pizza Order Submitted' });
        }
    });

}

exports.getPizza = function (req, res) {
    Pizza.findOne({ teamid: req.user.teamid }, function (err, pizza) {
        if (err) {
            res.send({ success: false, error: err });
        }
        if (pizza) {
            res.json({ success: true, data: pizza });
        } else {
            res.json({ success: false, error: 'No Pizza Found' });
        }

    });
}


exports.updatePizza = function (req, res) {
    Pizza.findOneAndUpdate({ teamid: req.user.teamid }, {
        pepperoni: req.body.pepperoni,
        cheese: req.body.cheese
    }, function (err) {
        if (err) {
            res.send({ success: false, error: err });
        }
        else {
            res.json({ success: true, message: "Order Updated" });
        }
    });

}