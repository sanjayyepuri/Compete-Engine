module.exports = function(io){
	var Stopwatch = require('timer-stopwatch');
	var Competition = require('../config/competition.js');

	var competitor = io.of('/competitor');

	//Create a Countdown
	var timer = new Stopwatch(Competition.timelimithours * 3600000, {refreshRateMs: 250});
	timer.on('time', function(time){
		competitor.emit('timer:time', {time: millisecondsToTime(time.ms)});
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
	timer.start()


	//function to convert milliseconds to minutes and hours string
	function millisecondsToTime(milliseconds){
		var seconds = Math.floor((milliseconds / 1000) % 60);
		var minutes = Math.floor((milliseconds / (1000*60)) % 60);
		var hours = Math.floor((milliseconds / (1000*60*60)) % 24);
		return hours + ":" + (minutes < 10 ? '0' : '') + minutes + "." + (seconds < 10 ? '0' : '') + seconds;
	}

	// Count the number of users
	var connectedUsers = 0;
	competitor.on('connection', function(socket) {
		connectedUsers++;
		console.log(connectedUsers + "  are connected.");
		socket.on('disconnect', function(){
			connectedUsers--;
			console.log(connectedUsers + "  are connected.");
		});

	});


}
