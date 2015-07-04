module.exports = function(io){
	var Stopwatch = require('timer-stopwatch');
	var Competition = require('../config/competition.js');

	//Create a Countdown
	var timer = new Stopwatch(60000);
	timer.on('time', function(time){
		io.emit('timer:time', {time: time.ms/1000});
	});
	io.on('click:starttimer', function() {
		timer.start();
	});
	io.on('click:pausetimer', function() {
		timer.stop();
	});
	io.on('click:reset', function(){
		timer.reset();
	});

	var connectedUsers = 0;
	// Count the number of users


	io.on('connection', function(socket){
		io.on('connect', function(){
		  connectedUsers++;
		});
		io.on('disconnect', function(){
			connectedUsers--;
		});
		if(connectedUsers == 1)
			console.log(connectedUsers + " user is connected.");
		else
			console.log(connectedUsers  + " users are connected.");
	});
}
