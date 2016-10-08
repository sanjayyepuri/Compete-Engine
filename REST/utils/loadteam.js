var Competitor = require('../app/models/competitor.js');
var User = require('../app/models/user.js');
var Member = require('../app/models/member.js');

var mongoose = require('mongoose');
var dbConfig = require('../config/database.js');
mongoose.connect(dbConfig.url);

var fs = require('fs');
var csv = require('fast-csv');
var stream = fs.createReadStream("../config/raw_accounts.csv");

let users = [];
let competitors = [];

csv
    .fromStream(stream, { headers: ['name', 'username', 'password', 'school'] })
    .on("data", function (data) {
        var competitor = new Competitor({
            teamid: data.username,
            school: '',
            teamscore: 0,
        });

        var user = new User();
        user.teamid = data.username;
        user.password = user.generateHash(data.password);
        user.level = 9;
        user.competitor = competitor._id;

        users.push(user.toObject());
        competitors.push(competitor.toObject());

        // console.log(JSON.stringify(competitor));
        // console.log(JSON.stringify(user));

    })
    .on("end", function () {
        //console.log(JSON.stringify(users));
        User.collection.insert(users, onInsert);
        Competitor.collection.insert(competitors, onInsert);
        console.log("done");
        mongoose.connection.close();

    });

function onInsert(err, docs) {
    if (err) {
        console.log(err);
    } else {
        console.info('%d potatoes were successfully stored.', docs.length);
    }
    return;
}


