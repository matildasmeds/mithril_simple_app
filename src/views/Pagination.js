// src/views/Pagination.js
var m = require("mithril");

var Pagination = {
    // Always call with create, to set callback correctly
    new: function(callback) {
	Pagination.callback = callback;
	return Pagination;
    },
    callback: null, // should contain a function
    total: null, // int
    limit: null, // int
    offset: null, // int
    currPage: 1, // int
    pageCount: 0, // int
    items: [],
    // Called when GET request returns
    update: function(opts) {
	Pagination.total = opts.total;
	Pagination.limit = opts.limit;
	Pagination.offset = opts.offset;

	// Check if pageCount or currPage has changed
	var pageCountWas = Pagination.pageCount;
	var currPageWas = Pagination.currPage;
	Pagination.pageCount = Math.floor( opts.total / opts.limit );
        Pagination.currPage = (opts.offset + 10) / opts.limit;
	if (opts.total % opts.limit !== 0) {
	    Pagination.pageCount += 1;
	}

	if (pageCountWas !== Pagination.pageCount) {
	    Pagination.refreshItems(); // includes active class
	} else if (currPageWas !== Pagination.currPage) {
	    Pagination.setActive(); // handles only the active class
	}
    },
    refreshItems: function() {
	var items = [];
	for (var page=1; page <= Pagination.pageCount; page++) {
	    var attrs = { id: "link-to-page-" + page,
			  onclick: onClick(page, Pagination) };
	    if (page === Pagination.currPage) {
		attrs.class = "active";
	    }
	    var item = m("a.pagination-link", attrs, page);
	    items.push(item);
	}
	Pagination.items = items;
    },
    setActive: function() {
       // clear all ... is this crude?
       var links = document.getElementById("pagination-links").children;
       for (var i = 0; i < links.length; i++) {
           links[i].classList.remove("active");
       }
       var active = document.getElementById("link-to-page-" + Pagination.currPage);
       active.classList.add("active");
    },
    view: function() {
	return m(".pagination-region",
		 [ m("div.pagination-links",
		     { id: "pagination-links" },
		     Pagination.items) ]
		);
    }
};

var onClick = function(page, Pagination) {
    return function() {
	opts = {
	    offset: (page - 1) * Pagination.limit, // for 1st page 0 offset
	    limit: Pagination.limit,
	};
	Pagination.callback(opts);
    }
}

module.exports = Pagination;
