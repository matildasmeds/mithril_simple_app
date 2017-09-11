// index.js
var m = require("mithril");

var UserList = require("./views/UserList");
var UserForm = require("./views/UserForm");
 
m.route(document.body, "/list", 
	{
	    "/list": UserList,
	    "/edit/:id": UserForm,
	}
);