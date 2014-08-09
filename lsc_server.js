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
 * Require config file
 * 
 * @type {[json]}
 */
var config = require('./config.json');

/**
 * Requiere Express-Framework
 * 
 * @type {[express]}
 */
var express = require('express');

/**
 * Require path
 * 
 * @type {[path]}
 */
var path = require('path');

/**
 * Create a new app
 * 
 * @type {[express]}
 */
var app = express();

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

/**
 * If you use openshift we configure that 
 * else we use the config port
 *  
 * @type {[int]}
 */
var port = process.env.OPENSHIFT_NODEJS_PORT || config.Port;

/**
 * If you use openshift we configure that
 * else we use the config ip
 * 
 * @type {[string]}
 */
var ipaddr = process.env.OPENSHIFT_NODEJS_IP || config.IP;

/**
 * Include our templating engine
 * 
 * @type {[swing]}
 */
var swing = require('swig');

/**
 * Include messages module
 * 
 * @type {[lsc_messages]}
 */
var lsc_messages = require('./modules/messages.js'); 

/**
 * Object of clients
 * 
 * @type {Object}
 */
var clients = {};

/**
 * A object of socket.id's with username
 * So we need nothing to store them
 * 
 * @type {Object}
 */
var ClientsPerSocket = {};

/**
 * Wich port and ip we listen ?
 */
server.listen(port, ipaddr);

/**
 * Set html as engine
 */
app.engine('html', swing.renderFile);

/**
 * File extension
 */
app.set('view engine', 'html');

/**
 * Set the view dir
 */
app.set('views', path.join(__dirname, config.templatePath+config.activeTemplate+'/'));

/**
 * Disable cache
 */
app.set('view cache', false);

/**
 * Set a static path that dosent work :(
 */
app.set(express.static(path.join(__dirname, 'public')));

/**
 * Only development is false
 * 
 * @type {[bool]}
 */
swing.setDefaults({cache:false});

/**
 * What we do a requets ?
 * 
 * @param  {[Request]} req 
 * @param  {[Ressource]} res 
 * @return {[Ressource]}
 */
app.get('/', function (req, res ) {
	//Render indexfile with options
	res.render('index',{
		pagename: 'Lea Simple Chat Default Template!',
		text: "Welcome, please enter a username"
	});
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
	 * @param  {[object]} user
	 * @return {[boolean]}
	 */
	socket.on('checkUsername', function(user) {
		if(clients[user.username] == undefined) {
			clients[user.username] = socket.id;
			ClientsPerSocket[socket.id] = user.username;
			io.emit('renderChat', {message:lsc_messages.joined(user.username)});
		} else {
			if(clients[user.username] == socket.id) {
				console.log("same socket");
			} else {
				console.log("in use");
			}
		}
	});

	/**
	 * Function fo a normal message to all in the room
	 * 
	 * @param  {[string]} data 
	 * @return object
	 */
	socket.on('message', function(message) {
		var username = ClientsPerSocket[socket.id];
		var object = {
			message:message,
			username:username
		}
		io.emit('message', object);
	});
});