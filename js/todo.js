define(['jquery','template'], function ($, template){
		var ENTER_KEY = 13;
		var url = "http://128.199.76.9:8002/:JunnieJobs/";
		

		function addTodoList(e){
			var keyCode = e.keyCode;
			var todo = $(e.target).val();	

			if(keyCode === ENTER_KEY && todo != ""){

				$.ajax({
					url: url,
					data:{todo: todo},
					method:"POST",
				}).done(function (data, status) {
		
					var str = template.todoTemplate({"todo":todo});
		            var $li = $(str);
		            $li.prependTo(".todo-list");
		            $(".new-todo").val("");

		            var count = $(".todo-count > strong").text();
		            count ++;
		            $(".todo-count > strong").text(count);

				}).fail(function (status) {
					console.log(status);
					alert("failed to add new todo-list");
				});
			}
		};

		function completed(e){

			var id = $(e.target).closest("li").data("id");
			var completed = $(e.target).prop("checked")? 1 : 0;

			$.ajax({
					url : url + id,
					data : {"completed" : completed},
					method : "PUT"
			}).done(function(data, status){
				 $(e.target).closest("li").toggleClass("completed");
			});
		}

		function destroy(e){
			var li = $(e.target).closest("li")
        	var id = $(li).data("id");
	        console.log(id);
	        $.ajax({
	            url : url + id,
	            type: "DELETE"
	        }).done(function(data, status){
	            $(li).slideUp("fast", function(){
	            	$(this).remove();
	            });

	            var count = $(".todo-count > strong").text();
	            count--;
	            $(".todo-count > strong").text(count);

	        }).fail(function(){
	            alert("there is destroy error...");
	        })
		};


		function loadAllTodoList() {

			$.ajax(url,{
				 dataType:"JSON",
				 method : "get"
			}).done(function(data){

				if(data.length === 0){
					$(".todo-list").html(template.emptyTemplate());
					$(".todo-list li label.not-found").css('display', 'block');
				}else{
					var todoListArr = [];
					for(var i=0; i<data.length; i++){
						todoListArr.push(todoTemplate(data[i]));
					}
					$(".todo-list").append(todoListArr.join(""));
				}
				$(".todo-count > strong").text(data.length);

				}).fail(function($xhr,status){
					alert("failed to load");
				});
		}

		

		var init = function(){

			loadAllTodoList();
			$(".todo-list").on("click",".destroy", deleted);
			$(".todo-list").on("click",".toggle",completed);
			$(".new-todo").on("keydown", addTodoList);
		};
		return {
			"init" : init,
			"loadAllTodoList" : loadAllTodoList
		};

});
