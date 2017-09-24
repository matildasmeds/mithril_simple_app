var m = require("mithril");
var User = require("../models/User");
var UserForm = require("./UserForm");
var Messages = require("./Messages");

var onClickDelete = function() {
    Messages.clear();
    User.deleteCurrent().then(function() {
	m.route.set("/");
    });
};

module.exports = {
    oninit: function(vnode) {
	Messages.clear();
	User.load(vnode.attrs.id);
    },
    view: function() {
	return m(".userform-container",
		 [
		     m("form", {
			 onsubmit: function(e) {
			     e.preventDefault();
			     User.save();
			 }
		     }, UserForm(User)),
		     m("button.button", { onclick: onClickDelete }, "Delete")
		 ],
		);
    }
};
