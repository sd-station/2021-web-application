"use strict";
var k = document.querySelectorAll("app-timeline");
var i = k.entries();
var g = i.next().value[1];
g.setAttribute("data-start", new Date().toString());
g.title = "Now";
var g = i.next().value[1];
g.setAttribute("data-start", new Date(new Date().getTime() - 1000 * 60 * 60 * 12.242).toString());
g.title = "12 H Before";
var g = i.next().value[1];
g.setAttribute("data-start", new Date(new Date().getTime() - 1000 * 60 * 60 * 24 * 7).toString());
g.title = "ONE Week Before";
var g = i.next().value[1];
g.setAttribute("data-start", new Date(new Date().getTime() + 1000 * 60 * 60 * 24 * 7).toString());
g.title = "ONE Week After";
var g = i.next().value[1];
g.setAttribute("data-due", new Date(new Date().getTime() - 1000 * 60 * 60 * 24 * 7).toString());
g.title = "ONE Week Before";
var g = i.next().value[1];
g.setAttribute("data-due", new Date(new Date().getTime() + 1000 * 60 * 60 * 24 * 7).toString());
g.title = "ONE Week After";
var g = i.next().value[1];
g.setAttribute("data-due", new Date(new Date().getTime() + 1000 * 60 * 60 * 2.522).toString());
g.title = "Today";
var g = i.next().value[1];
g.setAttribute("data-start", new Date(new Date().getTime() + 1000 * 60 * 60 * 24 * 3).toString());
g.setAttribute("data-due", new Date(new Date().getTime() + 1000 * 60 * 60 * 24 * 7).toString());
g.title = "Time line in Front";
var g = i.next().value[1];
g.setAttribute("data-start", new Date(new Date().getTime() - 1000 * 60 * 60 * 24 * 3).toString());
g.setAttribute("data-due", new Date(new Date().getTime() + 1000 * 60 * 60 * 24 * 3).toString());
g.title = "Time line Started";
var g = i.next().value[1];
g.setAttribute("data-start", new Date(new Date().getTime() - 1000 * 60 * 60 * 24 * 7).toString());
g.setAttribute("data-due", new Date(new Date().getTime() - 1000 * 60 * 60 * 24 * 3).toString());
g.title = "Time line Finished";
var g = i.next().value[1];
g.setAttribute("data-due-state", "done");
g.title = "Time line Finished";
//# sourceMappingURL=test.js.map