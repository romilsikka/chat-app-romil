var socket = io();
socket.on('connect', function (){
  console.log('connected to server');

});
socket.on('disconnect', function (){
  console.log('Disconnected from server');
});

socket.on('newmsg',function(msg){
  console.log('New message', msg);
var li = jQuery('<li></li>');
li.text(`${msg.from}:${msg.text}`);
jQuery('#messages').append(li);
});


jQuery('#form-chat').on('submit',function(e){
  e.preventDefault();
  socket.emit('createmsg',{
    from:'user',
    text:jQuery('[name=msg]').val()
  },function (){
  });
});
