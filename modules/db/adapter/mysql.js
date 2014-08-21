/**
 * Lea Simple Chat 
 * mysql.js
 *
 * Mysql adapter for lsc chat
 *
 * @author Flavio Kleiber, <flavio.kleiber@gentleman-informatik.ch>
 * @copyright (c) 2014 Flavio Kleiber, Gentleman Informatik
 */

module.exports = {

	/**
	 * Adapter object
	 * 
	 * @type {object}
	 */
	mysql: require('mysql'),

	//Yeah a adapter
	adapter: null,

	/**
	 * Connect to the database
	 * 
	 * @param  {string} host     
	 * @param  {string} username 
	 * @param  {string} password [
	 * @param  {string} database 
	 * @param  {int} port optinal
	 * @param  {object} mysql   
	 * @return {boolean}          
	 */
	connect: function(host, username, password, database, port) {
		var adapter = this.mysql.createConnection({
			host: host,
			user: username,
			password: password,
			database: database
		});
		adapter.connect(function(err) {
			if(err != null) {
				console.log("OOOPS...HOUSTON I THINK WE HAVE A DB PROBLEM! #"+err);
				return false;
			}
		});
		this.adapter = adapter;
		return true;
	},

	/**
	 * Send a query to the db
	 * 
	 * @param  {string} query 
	 * @return {boolean}
	 */
	query: function(query) {
		this.adapter.query(query, function(err, rows) {
			if(err != null) {
				console.log("OOOPS...HOUSTON I THINK WE HAVE A DB PROBLEM! #"+err);
				return false;
			} else {
				console.log(rows[0]);
				return true;
			}
		});
	},

	isUserAdmin: function() {},

	checkUser: function() {}
};