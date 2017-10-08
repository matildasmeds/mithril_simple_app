// src/views/Pagination.js
var m = require("mithril");
var Messages = require("./Messages");

var State = {
    total: null,
    limit: null,
    offset: null,
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
    }
}

var Pagination = {
    // Initialize Pagination component with Pagination.for()
    for: function(getDataCB) {
	console.log(getDataCB);
	Pagination.getData = function(opts) {
	    getDataCB(opts).then(function(result) {
		Pagination.updateLinks(result);
	    });
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
        State.currPage = (result.offset + 10) / result.limit;
        var currPageChanged = (currPageWas !== State.currPage);

	if (pageCountChanged) { Pagination.createLinks();
	} else if (currPageChanged) { Pagination.setActiveLink(); }

    },
    createLinks: function() {
	var links = [];
	for (var page=1; page <= State.pageCount; page++) {
	    links.push(Link.create(page));
	}
	State.links = links;
    },
    setActiveLink: function() {
	var links = document.getElementById("pagination-links").children;
	for (var i = 0; i < links.length; i++) { links[i].classList.remove("active"); }
	var active = document.getElementById("link-to-page-" + State.currPage);
	active.classList.add("active");
    },
    view: function() {
	return m(".pagination-region",
		 [ m("div.pagination-links",
		     { id: "pagination-links" },
		     State.links) ]
		);
    }
};

module.exports = Pagination;
