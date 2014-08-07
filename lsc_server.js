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
var swig = require('swig');

/**
 * Wich port and ip we listen ?
 */
server.listen(port, ipaddr);

/**
 * What we do a requets ?
 * 
 * @param  {[Request]} req 
 * @param  {[Ressource]} res 
 * @return {[Ressource]}
 */
app.get('/', function (req, res ) {
	var template = swig.compileFile(config.templatePath+config.activeTemplate+"/index.html");
	var compiled = template({
		pagename: 'Lea Simple Chat Default Template!',
		authors: ['Flave', 'Agon']
	});
	res.writeHead(200, { 'Content-Type': 'text/html' });
	res.end(compiled);
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