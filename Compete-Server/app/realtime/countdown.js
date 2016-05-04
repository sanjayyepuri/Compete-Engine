module.exports = function (server) {
    var io = require('socket.io')(server);


    io.on('connection', function (socket) {
        var date = new Date();
        console.log(date);
        socket.emit('time', { time: date.getTime() });
    })
    var countdown = 10;
    //setInterval(function() {
    //    countdown--;
    //    io.sockets.emit('timer', {countdown: countdown});
    //     console.log(countdown);
    //}, 1000);
}
