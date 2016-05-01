module.exports = function (server) {
    var io = require('socket.io')(server);
    var date = new Date();

    io.on('connection', function (socket) {
        console.log(date);
        socket.emit('time', { time: date.toDateString() });
    })

}