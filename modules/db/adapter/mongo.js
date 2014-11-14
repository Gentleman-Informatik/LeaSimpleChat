/**
 * Lea Simple Chat 
 * mongo.js
 *
 * MongoDB adapter for lsc chat
 *
 * @author Flavio Kleiber, <flavio.kleiber@gentleman-informatik.ch>
 * @copyright (c) 2014 Flavio Kleiber, Gentleman Informatik
 */

module.exports = {

    /**
     * Required mongo adapter
     *
     * @type {object}
     */
	mongo : require('mongoose'),

    /**
     * Connect to a mongodb
     *
     * @param string host
     * @param string user
     * @param string password
     * @param string database
     * @param string port
     * @return void
     */
	connect: function(host, user, password, database, port) {
        if(host == undefined || host == '') {
            host = 'localhost';
        }
        if(database == undefined || database == '') {
            database = 'simpleChat';
        }
        var mongoose = this.mongo.connect('mongodb://'+ host +'/' + database);
        var db = mongoose.connection;
        db.on('error', console.error.bind(console, 'connection error:'));
        db.once('open', function callback () {
            console.log('CONNECTION DONE!');
        });
    },

	query: function(query) {
        if(query === undefined || query === '') {
            console.log('DB: TRY TO SEND EMPTY QUERY!');
            return false;
        }
    },

	isUserAdmin: function() {},

	checkUser: function() {}
};