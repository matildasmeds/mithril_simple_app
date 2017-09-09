// index.js
var m = require("mithril");

var Views = {};
Views.UserList = require("./views/UserList");
 
m.mount(document.body, Views.UserList);