define(["handlebars","jquery", "template", "todo"], function (Handlebars,$, template, todo) {
    var countedList;
    var lastPage;
    var url = "http://128.199.76.9:8002/:JunnieJobs/";
    var pages;


    function getCountedList() {

        var countTodoList = url + "count";

        $.ajax({
            url:countTodoList,
            type:"get"

          }).done(function (data,status) {

            $(".todo-count > strong").text(data.cnt);
            showPages(countPages(data.cnt));
            pageViewResolver();

        });
    }

    function countPages(countedList) {

        var endPage;

        if (countedList === 0) {
            endPage = 1;
        }else if (countedList % 3 === 0){
            endPage = countedList/3;
        }else{
            endPage = parseInt(countedList/3) +1;
        }

        lastPage = endPage;
        return endPage;
    }

    function showPages(endPage) { //마지막 페이지가 들어온다.

         var pages = [];

         for(var i=1; i<=endPage; i++){
             pages.push(i);
          }

          $("#prev").after(template.pageList({
                 "pages":pages
           }));

           if(endPage > 5){
            $("#next").text(">>");
           }

    }

    function deafualtSelected() {
        $(".pageNavigator li:contains('1')").addClass("selected");
    }

    function pageViewResolver(Idx){

        var pageNum;
        if(!Idx){
            pageNum = 1;
            deafualtSelected();
        }else{
            pageNum = Idx;
        }

        var start = (pageNum-1) * 3 ;
        var limit = 3;

        $.ajax({

            url: url + "page",
            data: { "start": start, "limit" : 3},
            type: "get"

        }).done(function (data,status) {
            $(".todo-list li").remove();
            todo.loadAllTodoList(data);

        if($(".selected").text() < 5){
            for(var i=6; i<=lastPage; i++){
                $(".pageNavigator").find("li").eq(i).css('display', 'none');
                console.log("?");
            }
        }

        }).fail(function (status) {
            alert(status);
        });
    }

    function movePage(e) {
        e.preventDefault();
        $(".selected").removeClass("selected");
        $(e.currentTarget).addClass("selected");
        var Idx = $(e.target).text();
        pageViewResolver(Idx);
    }

    function clickPrev(e) {
        e.preventDefault();
        var firstPage = 1;
        var clikedPage = $(".selected a").text();
        console.log("clikedPage" + clikedPage);

        if(clikedPage == firstPage){
            $("#prev").addClass("disabled");
            return;
        }

        if(clikedPage%5 === 1){
            for(var i = clikedPage; i <= lastPage; i++){
               $(".pageNavigator").find("li").eq(i).css('display', 'none');
            }

            for(var i=1; i <= 5; i++){
                $(".pageNavigator").find("li").eq(i).css('display', 'inline-block');
            }
        }

        clickPrevResolver(clikedPage);

        }

    function clickPrevResolver(clikedPage){
        var newPage = clikedPage-1;
        $(".selected").removeClass("selected");
        $("#next").removeClass("disabled");
        $(".pageNavigator").find("li").eq(newPage).addClass("selected");
        pageViewResolver(newPage);
    }

    function clickNext(e) {

        var prevPage = parseInt($(".selected").val());
        var currentPage = prevPage+1;
        console.log("prevPage" + prevPage);
        console.log("currentPage" + currentPage);

        if(prevPage === lastPage){
            $("#next").addClass("disabled");
            console.log("마지막 페이지입니다.");
            return;
         }

        if(prevPage == 5){

            $("#prev").text("<<");
            for(var i=1; i<=5; i++){
                 $(".pageNavigator").find("li").eq(i).css('display','none');
            }

            for(var i=6; i<=lastPage; i++){
                 $(".pageNavigator").find("li").eq(i).css('display','inline-block');
            }
         }

         $(".selected").removeClass("selected");
         $("#prev").removeClass("disabled");
         $(".pageNavigator").find("li").eq(currentPage).addClass("selected");
         pageViewResolver(currentPage);
    }


    function clickNextResolver(currentPage){

        $(".selected").removeClass("selected");
        $("#prev").removeClass("disabled");

        if(currentPage > 5 && currentPage%5 === 1 ){
            $(".pageNavigator").find("li:nth-child(2)").addClass("selected");
            pageViewResolver(currentPage);
            return;
        }
    }

    function init() {
        getCountedList();
        $(".pageNavigator").on("click","li:not(#prev):not(#next)", movePage);
        $(".pageNavigator").on("click","#prev", clickPrev);
        $(".pageNavigator").on("click","#next", clickNext);
    }

    return {
        "init":init
    }
});
