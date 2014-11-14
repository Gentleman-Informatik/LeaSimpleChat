/**
 * Lea Simple Chat
 * commands.js
 *
 * Simple chat commands like /join /kick etc
 *
 * @author Flavio Kleiber, <flavio.kleiber@gentleman-informatik.ch>
 * @copyright (c) 2014 Flavio Kleiber, Gentleman Informatik
 */

module.exports = {

    /**
     * Startup function
     *
     * @param message
     * @return void
     */
    init: function(message) {
        if(message !== undefined) {
            var msg = this.parse(message);
            return msg;
        }
    },

    /**
     * Parses a message
     *
     * @param message
     * @returns {string}
     */
    parse:function(message) {
        switch (message) {
            case '/help':
                var msg = 'Welcome to LSC!';
                break;
            case '/join':
                var msg =  'Wich channel you want to join?';
                break;
            default :
                var msg = message;
                break;
        }
        return msg;
    }
};
