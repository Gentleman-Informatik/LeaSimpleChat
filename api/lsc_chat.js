/**
 * Lea Simple Chat 
 * chat.js
 *
 * Chat module for the client
 *
 * @author Flavio Kleiber, <flavio.kleiber@gentleman-informatik.ch>
 * @copyright (c) 2014 Flavio Kleiber, Gentleman Informatik
 */

/**
 * Socket host
 * 
 * @type {Object}
 */
var server = null;

/**
 * Connect to the lsc server
 * 
 * @param  {String} host [description]
 * @return void
 */
function lsc_connect(host) {
	server = io(host);
}

/**
 * Login a user in the chat
 * 
 * @param  {string} username 
 * @return boolean
 */
function lsc_login(username) {
	if(server == undefined) {
		alert("ERROR#001: connect first with the server");
		return false;
	} else {
		server.emit("checkUsername", {username:username});
		return true;
	}
}

/**
 * Send a msg to the chat
 * 
 * @param  {string} msg 
 * @return void     
 */
function lsc_sendMessage(msg) {
	server.emit('message', msg);
}

/**
 * Returns the server instanc
 * 
 * @return {Object}
 */
function lsc_getServer() {
	return server;
}
