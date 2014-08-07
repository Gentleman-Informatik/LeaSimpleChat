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
/**
 * Requiere Express-Framework
 * 
 * @type {[express]}
 */
var app = require('express')();
/**
 * Create a server
 * 
 * @type {[http]}
 */
var server = require('http').Server(app);

/**
 * Set up socket.io
 * 
 * @type {[socket]}
 */
var io = require('socket.io')(server);

//Fix for openshift
var port = process.env.OPENSHIFT_INTERNAL_PORT || 8080;

/**
 * Wich port we listen ?
 * TODO: Do it in config
 */
server.listen(port);

/**
 * What we do a requets ?
 * 
 * @param  {[Request]} req 
 * @param  {[Ressource]} res 
 * @return {[Ressource]}
 */
app.get('/', function (req, res ) {
		res.sendFile(__dirname + '/index.html');
});

/**
 * Connect module
 * 
 * @param  {[socket Client]} socket 
 * @return {[void]}
 */
io.on('connect' , function(socket) {
	/**
	 * Daly msg or news
	 * 
	 * @return {[json]}
	 */
	socket.emit('news', {hello:'word'});

	/**
	 * Is the user baned blocked or have
	 * we the username allready ?
	 * 
	 * @param  {[string]} username 
	 * @return {[boolean]}
	 */
	socket.on('checkUsername', function(username) {
		
	});

	/**
	 * Function fo a normal message to all in the room
	 * 
	 * @param  {[string]} message 
	 * @return void
	 */
	socket.on('message', function(message) {
		//Do it
	});
});