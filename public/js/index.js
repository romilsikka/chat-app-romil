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

var locationq = jQuery('#location');
locationq.on('click',function(){
  if(!navigator.geolocation){
    return alert('Geolocation not supported');
  }

    navigator.geolocation.getCurrentPosition(function(position){
      socket.emit('newlocation',{
        lat:position.coords.latitude,
        lon:position.coords.longitude
      });
    },function(){
      alert('Unable to fetch location');
    });

});
