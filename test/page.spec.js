// Maybe this is a useful example of using Jest snapshots with Mithril
// Looking at this example not clear why use mithril-jest, and not
// https://github.com/htacg/tidy-html5 directly?
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
