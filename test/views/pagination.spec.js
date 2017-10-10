var m = require("mithril");
var tidy = require("mithril-jest").tidy;

var getDataFn = function(opts) {
    return Promise.resolve(opts);
};

var Pagination = require("../../src/views/Pagination").for(getDataFn);

var testResultFn = function(result) {
    var view = m(result);
    var html = tidy(view);
    expect(html).toMatchSnapshot();
}

describe("Pagination", function() {
    it("Creates pagination links", function() {
	Pagination.getData({
	    total: 51,
	    limit: 15,
	    offset: 30,
	}).then(testResultFn);
    });
    it("Shows no links, when just one page", function() {
	Pagination.getData({
	    total: 100,
	    limit: 101,
	    offset: 0,
	}).then(testResultFn);
    });
});


