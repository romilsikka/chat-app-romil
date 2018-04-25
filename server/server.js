const express = require('express');
const path = require('path');
const socketIO = require('socket.io');
const http = require('http');

var publicpath = path.join(__dirname,'../public');
var app = express();
var port = process.env.PORT || 3000;

var server = http.createServer(app);
var io = socketIO(server);
io.on('connection',(socket)=>{
  console.log('New User connected');

socket.on('createmsg',(msg)=>{
  console.log('Create message',msg);
  io.emit('newmsg',{
    from:msg.from,
    text:msg.text,
    createdat:new Date().getTime()
  });
});
  socket.on('disconnect',()=>{
    console.log('Disconnected From Client');
  });
});
app.use(express.static(publicpath));

server.listen(port,()=>{
  console.log('Server is up on Port 3000');
});
