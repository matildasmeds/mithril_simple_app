var m = require("mithril");
var Messages = require("../Messages");

module.exports = function(User) {
    return [
	m("label.label", "First name"),
	m("input.input[type=text][placeholder=First name]", {
	    oninput: m.withAttr("value",
				function(value) { User.current.firstName = value }),
	    value: User.current.firstName
	}),
	m("label.label", "Last name"),
	m("input.input[placeholder=Last name]", {
	    oninput: m.withAttr("value",
				function(value) { User.current.lastName = value }),
	    value: User.current.lastName
	}),
	m("button.button[type=submit]", { onclick: function() { Messages.clear(); } }, "Save")
    ]
};
