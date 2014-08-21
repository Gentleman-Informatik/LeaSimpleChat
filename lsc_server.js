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
 * Require mysql
 * 
 * @type {mysql}
 */
var mysql = require('mysql');

/**
 * The sleep is back
 * 
 * @type {object}
 */
var sleep = require('sleep');
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
 * Include messages module
 * 
 * @type {[lsc_messages]}
 */
var lsc_messages = require('./modules/messages.js');

/**
 * Includes database module
 * 
 * @type {object}
 */
var lsc_database = require('./modules/db/database.js');

/**
 * Includes database adapter
 * 
 * @type {object}
 */
var lsc_database_adapter = require('./modules/db/adapter/'+config.database.adapter+'.js');  

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
 * Disable cache
 */
app.set('view cache', false);

/**
 * Set a static path for template
 */
app.use(express.static(__dirname+config.templatePath+config.activeTemplate+'/'));

/**
 * Set static path for api modules
 */
app.use('/lsc_api', express.static(__dirname+'/api'));

/**
 * What we do a requets ?
 * 
 * @param  {[Request]} req 
 * @param  {[Ressource]} res 
 * @return {[Ressource]}
 */

//DO SOME DB STUFF
lsc_database.setHost(config.database.host).setDatabase(config.database.database).setUser(config.database.user).setPassword(config.database.password).setAdapter(lsc_database_adapter);
lsc_database.connect();

app.get('/', function (req, res ) {
	res.sendFile(__dirname+config.templatePath+config.activeTemplate+'/index.html');
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

/**
 * Module for disconnect
 * 
 * @param  {socket} socket
 * @return {void}
 */
io.on('disconnect', function(socket) {});