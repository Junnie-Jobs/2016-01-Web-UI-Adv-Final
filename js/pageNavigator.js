define(["handlebars","jquery", "template", "todo"], function (Handlebars,$, template, todo) {
    var countedList;
    var noTask;
    var lastPage;
    var url = "http://128.199.76.9:8002/:JunnieJobs/";

    function getCountedList() {

        var countTodoList = url + "count";

        $.ajax({
            url:countTodoList,
            type:"get"

        }).done(function (data,status) {

            countedList = data.cnt;
            lastPage = countPages(countedList);
            showPages(lastPage);
            pageViewResolver();

        });
    }

    function countPages(countedList) {
        
        var endPage;
        
        if (countedList === 0) {
            endPage = 1;
        }else if (countedList % 5 === 0){
            endPage = countedList/5;
        }else{
            endPage = parseInt(countedList/5) +1;
        }
        return endPage;
    }
    
    function showPages(endPage) {
        var pages = [];
        var pageCount;

        if(lastPage > 5){
            pageCount = 5;
        }else{
            pageCount = lastPage;
        }

        for(var i=0; i<lastPage; i++){
             pages.push(i);
        }
        $("#next").before(template.pageList({
            "pages":pages
        }));

        if( $(".pageNavaigator li").text() == 1){
            $(".pageNavaigator li").addClass("selected");
        }     
    }
 
    function pageViewResolver(){
        var pageNum = $(".selected a").text();
        var start = (pageNum-1) * 3 ;
        var limit = 3;
        $.ajax({

            url: url + "page",
            data: { start: start, limit : limit},
            type: "get"

        }).done(function (data,status) {
            todo.loadAllTodoList();
        }).fail(function (status) {
            alert(status);
        });
    }

    function movePage(e) {
        e.preventDefault();
        $(".selected").removeClass("selected");
        $(e.currentTarget).addClass("selected");
        pageViewResolver();
    }

    function clickPrev(e) {
        e.preventDefault();
        var firstPage = 1;
        var clikedPage = $(".selected a").text();

        if(clikedPage != firstPage){
            clickPrevAndNextFilter();
        }else{
            $("#prev").addClass("disabled");
        }
    }

    function clickNext(e) {
        e.preventDefault();
        var clikedPage = $(".selected a").text();
        if(clikedPage != lastPage){
           clickPrevAndNextFilter();
        }else{
            $("#next").addClass("disabled");
        }
    }

    function clickPrevAndNextFilter(clikedPage){

            var newPage = clikedPage+1;
            $(".selected").removeClass("selected");
            $("#next").removeClass("disabled");
            $(".pagination").find("li").eq(newPage).addClass("selected");
    }

    function init() {
        getCountedList();
        $(".pagination").on("click","li:not(#prev):not(#next)",movePage);
        $(".pagination").on("click","#prev", clickPrev);
        $(".pagination").on("click","#next", clickNext);
    };
    return {
        "init":init
    };
});
