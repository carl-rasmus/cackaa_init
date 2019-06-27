const express = require('express');
const app = express();

// var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var port = process.env.PORT || 3000;


app.use(express.static(__dirname + '/www'));

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', function(socket){

  socket.on('message', function(cnm){
    io.emit('message', cnm);
  });
  socket.on('chat message', function(msg){
    io.emit('chat message', msg);
  });
  socket.on('start mode', function(stm){
    io.emit('start mode', stm);
  });
});

http.listen(port, function(){
  console.log('listening on *:' + port);
});
