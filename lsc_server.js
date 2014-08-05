/**
 * Lea Simple Chat 
 * lsc_server.js
 *
 * This is the lsc server,
 * this will handel all the chat an plugin stuff.
 *
 * @author Flavio Kleiber, <flavio.kleiber@gentleman-informatik.ch>
 * @copyright (c) 2014 Flavio Kleiber, Gentleman Informatik
 */
var app = require('express')();
var server = require('http').Server(app);
var io = require('socket.io')(server);

server.listen(80);

app.get('/', function(req, res) {
	res.sendfile(__dirname + '/index.html');
});

io.on('connection', function(socket) {
	socket.emit('news', { hello: 'world' });
	socket.on('testevent', function(data) {
		console.log(data);
	});
});