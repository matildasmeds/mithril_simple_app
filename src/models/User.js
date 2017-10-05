var m = require("mithril");
var Messages = require("../views/Messages");
var Pagination = require("../views/Pagination");

// User object
// * Contains all user data
// * Handles API requests related to users
// * Shows messages based on API request results
// * Updates Pagination on User.loadList

// User object does not
// * Navigate
// * Clear messages
// * Process data

var User = {
    list: [],
    loadList: function() {
        return m.request({
	    method: "GET",
	    url: "https://rem-rest-api.herokuapp.com/api/users",
	    withCredentials: true,
	}).then(function(result) {
	    var opts = { total: result.total,
			 limit: result.limit,
			 offset: result.offset
		       } // ideally result should be inmutable
	    Pagination.update(opts);
	    User.list = result.data;
	    if (User.list.length === 0) {
		Messages.show({ info: "No users found." });
	    }
	});
    },
    current: {},
    load: function(id) {
	return m.request({
	    method: "GET",
	    url: "https://rem-rest-api.herokuapp.com/api/users/" + id,
	    withCredentials: true,
	}).then(function(result) {
	    User.current = result;
	});
    },
   save: function() {
	return m.request({
	    method: "PUT",
	    url: "https://rem-rest-api.herokuapp.com/api/users/" + User.current.id,
	    data: User.current,
	    withCredentials: true,
	}).then(function() {
	    Messages.show({ success: "User saved." });
	});
    },
    create: function() {
	return m.request({
	    method: "POST",
	    url: "https://rem-rest-api.herokuapp.com/api/users",
	    data: User.current,
	    withCredentials: true,
	}).then(function(data) {
	    User.current.id = data.id;
	    User.list.push(User.current);
	    Messages.show({ success: "New user created." });
	});
    },
    deleteCurrent: function() {
	return m.request({
	    method: "DELETE",
	    url: "https://rem-rest-api.herokuapp.com/api/users/" + User.current.id,
	    withCredentials: true,
	}).then(function() {
	    Messages.show({ success: "User deleted." });
	});
    }
};

module.exports = User;
