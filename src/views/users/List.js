var m = require("mithril");
var User = require("../../models/User");
var Messages = require("../Messages");
var Pagination = require("../Pagination");

// workaround for Mithril Issue 1709
var onClick = function(user) {
    return function() {
	Messages.clear();
	m.route.set("/edit/" + user.id);
    };
};

module.exports = {
    oninit: function() {
	User.loadList();
    },
    view: function() {
	return m(".views-users-list",
		 [ m(Pagination),
		   m(".user-list",
		     User.list.map(function(user) {
			 return m("a.user-list-item",
				  { onclick: onClick(user) },
				  user.firstName + " " + user.lastName);
		     }))]

		);
    }
};
