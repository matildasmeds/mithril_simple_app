var m = require("mithril");
var tidy = require("mithril-jest").tidy;
var mq = require("mithril-query");

var New = require("../../../src/views/users/New.js");
var Messages = require("../../../src/views/Messages.js");
var User = require("../../../src/models/User.js");
var view = m(New);

describe("Users: New", function() {
    it("Shows empty form and submit button", function() {
	var html = tidy(view);
	expect(html).toMatchSnapshot();
	expect(User.current).toEqual({});
    });
    it("Modifies User object", function() {
	var out = mq(view);
	expect(User.current).toEqual({});
	out.setValue("input.firstName", "I like");
	out.setValue("input.lastName", "Coffee");
	expect(User.current).toMatchSnapshot();
    });
    it("Clears messages on submit", function() {
	var out = mq(view);
	Messages.clear = jest.fn();
	out.click("button.button[type=submit]");
	expect(Messages.clear.mock.calls.length).toBe(1);
    });
    it("Creates user, navigates to edit on submit", function() {
	var out = mq(view);
	// Light weight mock function, that should return thenable
	// User.create better be tested elsewhere :)
	User.create = function() {
	    User.current.id = 2049; // :id must be passed to m.route.set
	    User.create.called += 1; // count calls
	    return Promise.resolve(true);
	};
	User.create.called = 0;
	m.route.set = jest.fn();
	// out.trigger seems synchronized, even though User.create is async?
	out.trigger("form", "onsubmit", document.createEvent("Event"))
	expect(User.create.called).toBe(1);
	expect(m.route.set.mock.calls).toMatchSnapshot();
    });
});
