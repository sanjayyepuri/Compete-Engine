  var socket = io();
  
  socket.on('timer', function(data){
    $('#timer').text(data.timer);
  })