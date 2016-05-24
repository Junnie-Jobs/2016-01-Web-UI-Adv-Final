define(["handlebars","jquery"], function (Handlebars, $){

	var source = $("#todo-template").html();
	var todoTemplate = Handlebars.compile(source);
	var notFound = $("#not-found-todo-template").html();
	var emptyTemplate = Handlebars.compile(notFound);
	var pagesSource = $('#page-template').html();
	var pageList = Handlebars.compile(pagesSource);

	return {
		"todoTemplate": todoTemplate,
		"emptyTemplate": emptyTemplate,
		"pageList": pageList
		
	};
});
