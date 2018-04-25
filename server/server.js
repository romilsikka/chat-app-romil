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

socket.emit('newmsg',{
  from:'Sikka',
  text:'okokoko'
});

socket.on('createmsg',(msg)=>{
  console.log('Create message',msg);
});
  socket.on('disconnect',()=>{
    console.log('Disconnected From Client');
  });
});
app.use(express.static(publicpath));

server.listen(port,()=>{
  console.log('Server is up on Port 3000');
});
