  var socket = io();

  socket.on('timer:time', function(data){
    $('#timer').text(data.time);
  })

$(document).ready(function(){
  $('#problem-nav li a').click(function() {
    $('#problem-nav li.active').removeClass('active');
    var $this = $(this);
    $.get($this.attr('location'), function(markdown){
        $('#problem-content').html(marked(markdown));
    });
    if (!$this.parent().hasClass('active')) {
      $this.parent().addClass('active');
    }
  });

});
