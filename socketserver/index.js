var app = require('express')();
var server = require('http').Server(app);
var io = require('socket.io')(server);

server.listen(5000);

// app.use(express.static(path.resolve(__dirname, '../client/dist')));

io.on('connection', function (socket) {
  socket.on('message', function (data) {
    console.log(data);
    socket.emit('servermessage', data)
  });
});