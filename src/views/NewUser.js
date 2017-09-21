var m = require("mithril");
var User = require("../models/User");
var UserForm = require("./UserForm");

module.exports = {
    oninit: function() { User.current = {}; },
    view: function() {
	return m(".userform-container",
		 [
		     m("form", {
			 onsubmit: function(e) {
			     e.preventDefault();
			     User.create();
			 }
		     }, UserForm(User)),
		 ]
		);

    }
}
