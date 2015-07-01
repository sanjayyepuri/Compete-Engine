module.exports = function(io){
	var Stopwatch = require('timer-stopwatch');
	
	var timer = new Stopwatch(60000);
	timer.on('time', function(time){
		io.emit('timer', {timer: time.ms/1000});
	});
	timer.start();
	io.on('connection', function(socket){
		socket.on('timer', function(){
			io.emit('timer', {timer: 'hello'});
		});
		console.log('A user');
	});
}