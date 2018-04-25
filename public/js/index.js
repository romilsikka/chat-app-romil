var socket = io();
socket.on('connect', function (){
  console.log('connected to server');

  socket.emit('createmsg',{
    from:'romil',
    text:"Hey there!",
    createdat:new Date()
  });
});
socket.on('disconnect', function (){
  console.log('Disconnected from server');
});

socket.on('newmsg',function(msg){
  console.log('New message', msg);
});
