var server = require('http').createServer();
const socket = require('socket.io');
const io = socket(server);

server.listen(5000);

// app.use(express.static(path.resolve(__dirname, '../client/dist')));

// io.on('connection', (socket) => {
//   socket.on('message', function (data) {
//     socket.emit('servermessage', data)
//   });
// });

io.on('connection', (socket) => {
	socket.on('message', (data) => {
		io.emit('servermessage', data );
	});
});