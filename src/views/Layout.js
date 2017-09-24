// src/views/Layout.js
var m = require("mithril");
var Messages = require("./Messages");

module.exports = {
    view: function(vnode) {
	return m("main.layout", [
	    m("nav.menu",
	      [ m("a.menu-link[href='/list']", { oncreate: m.route.link, onclick: function() { Messages.clear(); } }, "Users") ],
	      [ m("a.menu-link[href='/new']", { oncreate: m.route.link, onclick: function() { Messages.clear(); } }, "New User") ]
	     ),
	    m(Messages),
	    m("section", vnode.children)
	]);
    }
}
