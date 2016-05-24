define(["handlebars","jquery"],function (Handlebars, $) {

		var selectedAnchor;

		function filterStatus(e){
			e.preventDefault();
			if ( !$(e.target).hasClass("selected") ){
				$(e.target).addClass("selected");
				$(selectedAnchor).removeClass("selected");
				selectedAnchor = $(e.target);
				var status = $(e.target).text();
				console.log(status);
				
				if(status == "Active"){
					$(".todo-list")
						.addClass("active")
						.removeClass("completed");
				} else if(status == "Completed"){
					$(".todo-list")
						.addClass("completed")
						.removeClass("active");
				} else if(status == "All"){
					$(".todo-list").removeClass("completed active");
				}	
			}
		}

		var init = function(){
			selectedAnchor = $("a[href=\"\\#\\/all\"]");
			$(".filters").on("click", "a", filterStatus);
		};

		return {
			"init" : init
		};
});
