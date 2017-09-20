// index.js
var m = require("mithril");

var UserList = require("./views/UserList");
var EditUser = require("./views/EditUser");
var NewUser = require("./views/NewUser");
var Layout = require("./views/Layout");

m.route(document.body, "/list", {
    "/list": {
	render: function() {
	    return m(Layout, m(UserList));
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
