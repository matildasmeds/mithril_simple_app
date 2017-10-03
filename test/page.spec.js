var  m = require("mithril");
var tidy = require("mithril-jest").tidy;

var page = {
    view: function() {
	return m("div", [
	    m("h1", "Page"),
	    m("a", {
		href: "/home"
	    }, "Back")
	]);
    }
}

describe("Page component", function() {
    it("Should have a title", function() {
	var cmp = m(page);
	const html = tidy(cmp);
	expect(html).toMatchSnapshot();
    });
});
