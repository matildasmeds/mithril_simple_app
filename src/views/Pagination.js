// src/views/Pagination.js
var m = require("mithril");

var Pagination = {
    total: null,
    limit: null,
    offset: null,
    pageCount: null,
    update: function(opts) {
	Pagination.total = opts.total;
	Pagination.limit = opts.limit;
	Pagination.offset = opts.offset;
	Pagination.pageCount = Math.floor( opts.total / opts.limit );
	if (opts.total % opts.limit !== 0) {
	    Pagination.pageCount += 1;
	}
    },
    view: function() {
	return m(".pagination-region",
		 [m("p", "Pagination WIP"),
		  m("ul.temp",
		    [m("li", "total: " + Pagination.total),
		     m("li", "pageCount: " + Pagination.pageCount),
		     m("li", "limit: " + Pagination.limit),
		     m("li", "offset: " + Pagination.offset)]
		   )
		 ]
		);
    }
};

module.exports = Pagination;
