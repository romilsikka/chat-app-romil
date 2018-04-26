const express = require('express');
const path = require('path');
const socketIO = require('socket.io');
const http = require('http');
const {generatemessage,generatelocation} = require('./utils/message');
var publicpath = path.join(__dirname,'../public');
var app = express();
var port = process.env.PORT || 3000;

var server = http.createServer(app);
var io = socketIO(server);


io.on('connection',(socket)=>{
  console.log('New User connected');

  socket.emit('newmsg',generatemessage('Admin','Welcome to chat App'));

  socket.broadcast.emit('newmsg',generatemessage('Admin','New User has joined'));

socket.on('createmsg',(msg,callback)=>{
  console.log('Create message',msg);
  io.emit('newmsg',{
    from:msg.from,
    text:msg.text,
    createdat:new Date().getTime()
  });
  callback('This is from server');
});
socket.on('newlocation',function(coords){
  io.emit('newmsglocation',generatelocation('Admin',coords.lat,coords.lon));
});
  socket.on('disconnect',()=>{
    console.log('Disconnected From Client');
  });

});
app.use(express.static(publicpath));

server.listen(port,()=>{
  console.log('Server is up on Port 3000');
});
