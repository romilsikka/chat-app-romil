var socket = io();
socket.on('connect', function (){
  console.log('connected to server');

});
socket.on('disconnect', function (){
  console.log('Disconnected from server');
});

socket.on('newmsg',function(msg){
  var formattime = moment(msg.createdat).format('h:mm a');
  var template = jQuery('#template').html();
  var html = Mustache.render(template,{
    text:msg.text,
    from:msg.from,
    createdat:formattime
  });
  jQuery('#messages').append(html);
});
// var li = jQuery('<li></li>');
// li.text(`${msg.from}: ${formattime} : ${msg.text}`);
// jQuery('#messages').append(li);
// });

socket.on('newmsglocation',function(msg){
  var formattime = moment(msg.createdat).format('h:mm a');
  var template = jQuery('#template-location').html();
  var html = Mustache.render(template,{
    from:msg.from,
    url:msg.url,
    createdat:formattime
  });
  jQuery('#messages').append(html);
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
