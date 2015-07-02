  var socket = io();

  socket.on('timer:time', function(data){
    $('#timer').text(data.time);
  })
