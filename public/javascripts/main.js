  var socket = io();

  socket.on('timer:time', function(data){
    $('#timer').text(data.time);
  })

$(document).ready(function(){
  $('#problem-nav li a').click(function() {
    var $this = $(this);
    $.get($this.attr('location'), function(markdown){
        $('#problem-content').html(marked(markdown));
    });
  });

});
