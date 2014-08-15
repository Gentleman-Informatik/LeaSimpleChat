/**
 * Lea Simple Chat 
 * default.js
 *
 * This file is for the default 
 * template, with all functions
 *
 * @author Flavio Kleiber, <flavio.kleiber@gentleman-informatik.ch>
 * @copyright (c) 2014 Flavio Kleiber, Gentleman Informatik
 */
var dev = false;
if(dev == true) {
	var host = "http://localhost:3000";
} else {
	var host = "ws://leasimplechat-zerbarian.rhcloud.com:8000/";
}
lsc_connect(host);
var socket = lsc_getServer();
function login() {
	var username = $('#lsc_username').val();
	lsc_login(username);
}
socket.on('renderChat', function(data){
	var msg = $.trim(data.message);
	$('.start').remove();
	$('.chat').css('display', 'block');
	$('.chat ul').append('<li><span>'+ msg +'</span></li>')
});
socket.on('message', function(data) {
	$('.chat ul').append('<li>'+ data.username +': '+ data.message + '</li>');
});