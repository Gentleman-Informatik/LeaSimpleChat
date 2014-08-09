/**
 * Lea Simple Chat 
 * messages.js
 *
 * This little module here sends you all 
 * messages like user joined your channel left etc
 *
 * @author Flavio Kleiber, <flavio.kleiber@gentleman-informatik.ch>
 * @copyright (c) 2014 Flavio Kleiber, Gentleman Informatik
 */

module.exports = {

	/**
	 * Returns a welcome msg for the user e.g.
	 * User flaver joined the Chat/User flaver joined the LSC-Party-Hard Chat
	 * 
	 * @param  {[string]} username 
	 * @param  {[string]} chatroom 
	 * @return {[bool|string]}
	 */
	joined:function(username, chatroom) {
		if(username == undefined || username == '') {
			console.log("ERROR: Try to join a user without a username");
			return false;
		} else {
			if(chatroom == undefined) {
				chatroom = " ";
			}
			var msg = "User "+username+" joined the " +  chatroom + " Chat";
			return msg;
		}
	},

	/**
	 * Returns a user left message
	 * 
	 * @param  {[string]} username 
	 * @param  {[string]} chatroom 
	 * @return {[bool|string]}          
	 */
	left:function(username, chatroom) {
		if(username == undefined || username == ' ') {
			console.log("ERROR: Try to left a user without a username");
			return false;
		} else {
			if(chatroom == undefined) {
				chatroom = " ";
			}
			var msg = "User "+username+" left the " + chatroom + " Chat :(";
			return msg;
		}
		
	},

	/**
	 * Kicked a user msg
	 * 
	 * @param  {[string]} userKicked 
	 * @param  {[string]} fromUser  
	 * @return {[string]}
	 */
	kicked:function(userKicked, fromUser) {
		var msg = userKicked + " was kicked by " + fromUser;
		return msg;
	}

};