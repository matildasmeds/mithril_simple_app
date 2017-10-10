// src/views/Pagination.js
var m = require("mithril");
var Messages = require("./Messages");

var State = {
    total: null,
    limit: 10,
    offset: 0,
    currPage: 1,
    pageCount: 0,
    links: [],
}

var Link = {
    create: function(page) {
	var attrs = { id: "link-to-page-" + page,
		      onclick: Link.onClick(page, State) };
	if (page === State.currPage) {
	    attrs.class = "active";
	}
	return m("a.pagination-link", attrs, page);
    },
    onClick: function(page) {
	return function() {
	    Messages.clear();
	    opts = {
		offset: (page - 1) * State.limit, // for 1st page 0 offset
		limit: State.limit,
	    };
	    Pagination.getData(opts);
	}
    },
    createLinks: function() {
	if (State.pageCount === 1) {
	    State.links = [];
	    return;
	}
	var links = [];
	for (var page=1; page <= State.pageCount; page++) {
	    links.push(Link.create(page));
	}
	State.links = links;
    },
    setActive: function() {
	var links = document.getElementById("pagination-links").children;
	for (var i = 0; i < links.length; i++) { links[i].classList.remove("active"); }
	var active = document.getElementById("link-to-page-" + State.currPage);
	active.classList.add("active");
    }
};

var Pagination = {
    // Initialize Pagination component with Pagination.for()
    for: function(getDataCB) {
	Pagination.getData = function(opts) {
	    getDataCB(opts).then(function(result) {
		Pagination.updateLinks(result);
	    });
	    return Promise.resolve(Pagination); // Hook for getData().then()
	}
	return Pagination;
    },
    getData: function() {
	console.log("Callback not initialized, cannot fetch data.");
    },
    updateLinks: function(result) {
	State.total = result.total;
	State.limit = result.limit;
	State.offset = result.offset;

	var pageCountWas = State.pageCount;
	State.pageCount = Math.floor( result.total / result.limit );
	if (result.total % result.limit !== 0) { State.pageCount += 1; }
        var pageCountChanged = (pageCountWas !== State.pageCount);

	var currPageWas = State.currPage;
        State.currPage = (result.offset + result.limit) / result.limit;
        var currPageChanged = (currPageWas !== State.currPage);

	if (pageCountChanged) {
	    Link.createLinks();
	} else if (currPageChanged) {
	    Link.setActive();
	}
    },
    view: function() {
	return m(".pagination-region",
		 [ m("div.pagination-links",
		     { id: "pagination-links" },
		     State.links) ]
		);
    },
};

module.exports = Pagination;
