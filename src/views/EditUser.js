var m = require("mithril");
var User = require("../models/User");
var UserForm = require("./UserForm");

module.exports = {
    oninit: function(vnode) { User.load(vnode.attrs.id); },
    view: function() {
	return m(".userform-container",
		 [
		     m("form", {
			 onsubmit: function(e) {
			     e.preventDefault();
			     User.save();

x			 }
		     }, UserForm(User)),
		     m("button.button", { onclick: User.deleteCurrent }, "Delete")
		 ],
		);
    }
};
