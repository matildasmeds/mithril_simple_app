var m = require("mithril");
var tidy = require("mithril-jest").tidy;
var mq = require("mithril-query");

var List = require("../../src/views/users/List.js");
var Messages = require("../../src/views/Messages.js");
var User = require("../../src/models/User.js");
User.list = [
    { id: 1, firstName: "Amiga", lastName: "500" },
    { id: 2, firstName: "Commodore", lastName: "64" },
    { id: 3, firstName: "Pentium", lastName: "386" },
];
var view = m(List);

describe("List view", function() {
    // Mock m.route.set
    // Mock Messages.clear
    beforeAll(function() {
	var setFn = m.route.set;
	m.route.set = jest.fn();
	var clearFn = Messages.clear;
	Messages.clear = jest.fn();
    });
    // Restore (just in case) after..
    // Verify later if restoring in fact necessary
    afterAll(function() {
	m.route.set = setFn;
	Messages.clear = clearFn;
    });
    it("Shows pagination region and list of users", function() {
	var html = tidy(view);
	expect(html).toMatchSnapshot();
    });
    it("Creates onclick listeners for items", function() {
	var out = mq(view);
	var items = out.find(".user-list-item");
	var links = items.map(function(item) { return item.attrs; });
	// Links have listeners
	expect(links).toMatchSnapshot();
	// Clicking a listener clears messages and sets route
	out.click(".user-list-item");
	expect(Messages.clear.mock.calls.length).toBe(1);
	expect(m.route.set.mock.calls).toMatchSnapshot();
    });
});
