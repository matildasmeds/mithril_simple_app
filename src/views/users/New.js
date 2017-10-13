var m = require("mithril");
var User = require("../../models/User");
var UserForm = require("./UserForm");
var Messages = require("../Messages");

var New = {
    oninit: function() {
        User.current = {};
    },
    onsubmit: function(e) {
	e.preventDefault();
	User.create().then(function() {
	    m.route.set("/edit/" + User.current.id);
	});
    },
    view: function() {
	return m(".userform-container",
		 [   m("form", {
		     onsubmit: New.onsubmit
		     }, UserForm(User)),
		 ]
		);
    }
}

module.exports = New;
