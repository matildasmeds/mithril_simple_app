// src/views/Pagination.js
var m = require("mithril");

var Pagination = {
    total: null,
    limit: null,
    offset: null,
    pageCount: 0,
    items: [],
    update: function(opts) {
	Pagination.total = opts.total;
	Pagination.limit = opts.limit;
	Pagination.offset = opts.offset;
	var pageCountWas = Pagination.pageCount;
	Pagination.pageCount = Math.floor( opts.total / opts.limit );
	if (opts.total % opts.limit !== 0) {
	    Pagination.pageCount += 1;
	}
	if (pageCountWas !== Pagination.pageCount) {
	    Pagination.refreshItems();
	}
    },
    refreshItems: function() {
	var items = [];
	for (var i=0; i < Pagination.pageCount; i++) {
	    items.push(m("li.pagination-item", i + 1));
	}
	Pagination.items = items;
    },
    view: function() {
	return m(".pagination-region",
		 [m("p", "Pagination WIP"),
		  m("ul.temp", [
		      m("li", "total: " + Pagination.total),
		      m("li", "pageCount: " + Pagination.pageCount),
		      m("li", "limit: " + Pagination.limit),
		      m("li", "offset: " + Pagination.offset)
		  ]),
		  m("ul.pagination-list", Pagination.items
		  ),
		 ]
		);
    }
};

module.exports = Pagination;
