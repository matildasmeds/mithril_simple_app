// index.js
var m = require("mithril");

var Layout = require("./views/Layout");
var ListUsers = require("./views/users/List");
var EditUser = require("./views/users/Edit");
var NewUser = require("./views/users/New");

m.route(document.body, "/list", {
    "/list": {
	render: function() {
	    return m(Layout, m(ListUsers));
	}
    },
    "/edit/:id": {
	render: function(vnode) {
	    return m(Layout, m(EditUser, vnode.attrs));
	}
    },
    "/new": {
	render: function() {
	    return m(Layout, m(NewUser));
	}
    }
});
