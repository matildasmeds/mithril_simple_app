var m = require("mithril");

module.exports = {
    view: function(vnode) {
	return m("main.layout", [
	    m("nav.menu",
	      [ m("a.menu-link[href='/list']", { oncreate: m.route.link }, "Users") ],
	      [ m("a.menu-link[href='/new']", { oncreate: m.route.link }, "New User") ]
	     ),
	    m("section", vnode.children)
	]);
    }
}
