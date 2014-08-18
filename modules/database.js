/**
 * Lea Simple Chat 
 * database.js
 *
 * This module connects the chat with a database,
 * so it is for save conversations and admin status
 *
 * @author Flavio Kleiber, <flavio.kleiber@gentleman-informatik.ch>
 * @copyright (c) 2014 Flavio Kleiber, Gentleman Informatik
 */

module.exports = {

	/**
	 * Host name for db
	 * 
	 * @type {string}
	 */
	host: null,

	/**
	 * Port for the db
	 * 
	 * @type {int}
	 */
	port: 3306,

	/**
	 * Database name
	 * 
	 * @type {string}
	 */
	database: null,

	/**
	 * User name for your db
	 * 
	 * @type {string}
	 */
	user: null,

	/**
	 * The secret password
	 * 
	 * @type {string}
	 */
	password: null,

	/**
	 * Setter Host
	 * 
	 * @param {string} host
	 * @return object
	 */
	setHost: function(host) {
		this.host = host;
		return this;
	},

	/**
	 * Setter for port
	 * 
	 * @param {int} port
	 * @return object
	 */
	setPort: function(port) {
		this.port = port;
		return this;
	},

	/**
	 * Setter for database
	 * 
	 * @param {string} database
	 * @return object
	 */
	setDatabase: function(database) {
		this.database = database;
		return this;
	},

	/**
	 * Setter for user
	 * 
	 * @param {string} user
	 * @return object
	 */
	setUser: function(user) {
		this.host = user;
		return this;
	},

	/**
	 * Setter for passowrd
	 * 
	 * @param {string} password
	 */
	setHost: function(password) {
		this.password = password;
		return this;
	},

	connect: function() {
		
	}

}