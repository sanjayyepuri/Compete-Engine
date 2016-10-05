var Pizza = require('../models/pizza.js');

exports.createPizza = function (req, res) {
    var pizza = new Pizza({
        teamid: req.user.teamid,
        pepperoni: req.body.pepperoni,
        cheese: req.body.cheese
    });

    pizza.save(function (err) {
        if (err) res.send({ success: false, error: err });
        res.send({ success: true, message: 'Pizza Order Submitted' });
    });
}

exports.getPizza = function (req, res) {
    Pizza.find({ _id: req.user._id }, function (err, pizza) {
        if (err) {
            res.send({ success: false, error: err });
        }
        res.json({ success: true, data: pizza });
    });
}


exports.updatePizza = functin(req, res){
    Pizza.findOneAndUpdate({ teamid: req.user.teamid }, {
        pepperoni: req.body.pepperoni,
        cheese: req.body.cheese
    }, function (err) {
        if(err){
            res.send({ success: false, error: err });
        }
        res.json({ success: true, message: "Order Updated" });
    });

}