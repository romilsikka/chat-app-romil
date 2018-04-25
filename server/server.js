const express = require('express');
const path = require('path');
var publicpath = path.join(__dirname,'../public');
var app = express();
var port = process.env.PORT || 3000;
app.use(express.static(publicpath));

app.listen(port,()=>{
  console.log('Server is up on Port 3000');
});
