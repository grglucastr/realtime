var express = require('express');
var router = express.Router();

module.exports = function (server) {
	var io = require('socket.io')(server);

	/* GET home page. */
	router.get('/', function (req, res, next) {
		res.render('index', {
			title: 'Express'
		});
	});

	io.on('connection', function (socket) {

		console.log('user connected');

		setInterval(function () {
			socket.emit('numbersAllTheTime', {
				number: Math.random()
			});
		}, 1000);

		socket.on('sendMessage', function (data) {
			socket.broadcast.emit('messageRecieved', {
				messages: data.msg
			});
		});


		socket.on('disconnect', function () {
			console.log('User disconnected!');
		});
	});
	
	return router;
}



//module.exports = router;