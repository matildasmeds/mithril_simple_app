var m = require("mithril");
var mq = require("mithril-query");
var Messages = require("../src/views/Messages");
var view = m(Messages);
var out;

describe("Messages view", function() {
    showsMessage = function(msg, text, className) {
	expect(msg.text).toBe(text);
	expect(msg.attrs.className).toBe(className);
    }
    afterEach(function() {
	Messages.clear();
    });
    it("Shows success message", function() {
	Messages.show({ success: "Great Success!" });
	var out = mq(view);
	var msg = out.rootNode.children[0];
	showsMessage(msg, "Great Success!", "message success-message");
    });
    it("Shows info message", function() {
	Messages.show({ info: "There are tulips in Amsterdam."});
	var out = mq(view);
	var msg = out.rootNode.children[0];
	showsMessage(msg, "There are tulips in Amsterdam.", "message info-message");
    });
    it("Shows error message", function() {
	Messages.show({ error: "Whoops."});
	var out = mq(view);
	var msg = out.rootNode.children[0];
	showsMessage(msg, "Whoops.", "message error-message");
    });
    it("Is empty by default", function() {
	var out = mq(view);
	expect(out.rootNode.children.length).toBe(0);
    });
});
