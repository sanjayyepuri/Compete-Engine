module.exports = function(io){
	var Stopwatch = require('timer-stopwatch');
	var Competition = require('../config/competition.js');

	//var competitor = io.of('/competitor');

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

	timer.start();
	// Count the number of users
	var connectedUsers = 0;
	io.on('connection', function(socket) {
		connectedUsers++;
		console.log(connectedUsers + "  are connected.");
		socket.on('disconnect', function(){
			connectedUsers--;
			console.log(connectedUsers + "  are connected.");
		});

	});


}
