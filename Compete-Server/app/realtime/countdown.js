module.exports = function (server) {
    var io = require('socket.io')(server);
    var date = new Date();

    io.on('connection', function (socket) {
        console.log(date);
        socket.emit('time', { time: date.toDateString() });
    })
    var countdown = 10;
    //setInterval(function() {
    //    countdown--;
    //    io.sockets.emit('timer', {countdown: countdown});
    //     console.log(countdown);
    //}, 1000);
    

}