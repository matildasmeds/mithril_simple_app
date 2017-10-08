var m = require("mithril");
var tidy = require("mithril-jest").tidy;
var Messages = require("../../src/views/Messages");
var view = m(Messages);

describe("Messages view", function() {
    afterEach(function() {
	Messages.clear();
    });
    it("Shows success message", function() {
	Messages.show({ success: "Great Success!" });
	var html = tidy(view);
	expect(html).toMatchSnapshot();
    });
    it("Shows info message", function() {
	Messages.show({ info: "There are tulips in Amsterdam."});
	var html = tidy(view);
	expect(html).toMatchSnapshot();
    });
    it("Shows error message", function() {
	Messages.show({ error: "Whoops."});
	var html = tidy(view);
	expect(html).toMatchSnapshot();
    });
    it("Is empty by default", function() {
	var html = tidy(view);
	expect(html).toMatchSnapshot();
    });
});
