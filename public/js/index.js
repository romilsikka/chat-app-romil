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

socket.on('newmsglocation',function(loc){
var li = jQuery('<li></li>');
  var a = jQuery('<a target="_blank">My Current Location</a>');
  li.text(`${loc.from}:`);
  a.attr('href',loc.url);
  li.append(a);
  jQuery('#messages').append(li);
});




jQuery('#form-chat').on('submit',function(e){
  e.preventDefault();
  var textboxmsg = jQuery('[name=msg]');
  socket.emit('createmsg',{
    from:'user',
    text:textboxmsg.val()
  },function (){
    textboxmsg.val('');
  });
});

var locationq = jQuery('#location');
locationq.on('click',function(){
  if(!navigator.geolocation){
    return alert('Geolocation not supported');
  }
  locationq.attr('disabled','disabled').text('Sending Location...');

    navigator.geolocation.getCurrentPosition(function(position){
      locationq.removeAttr('disabled').text('Send Location');
      socket.emit('newlocation',{
        lat:position.coords.latitude,
        lon:position.coords.longitude
      });
    },function(){
      locationq.removeAttr('disabled').text('Send Location');
      alert('Unable to fetch location');
    });

});
