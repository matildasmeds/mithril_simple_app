
// src/views/Messages.js
var m = require("mithril");
var list = []; // Use lexical scope to have private list varianle

var Messages = {
    show: function(message) {
	list.push(message);
    },
    clear: function() {
	list = [];
    },
    view: function() {
	return m(".messages-region", list.map(function(message) {
	    if (message.success) {
   		return m(".message.success-message", message.success);
	    } else if (message.info) {
   		return m(".message.info-message", message.info);
	    }
	}));
    }
};
module.exports = Messages;
