define(["handlebars","jquery", "template", "todo"], function (Handlebars,$, template, todo) {
    var countedList;
    var lastPage;
    var url = "http://128.199.76.9:8002/:JunnieJobs/";

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
    
    function showPages(endPage) {

        var pages = [];

        if(endPage <= 5){
            for(var i=1; i<=endPage; i++){
             pages.push(i);
         }
        }else{
            for(var i=1; i<=5; i++){
                pages.push(i);
            }
            // $("#next").text(">>");
        }
        
        $("#prev").after(template.pageList({
                "pages":pages
         })); 
           
    }

    function deafualtSelected() {
        $(".pageNavigator li:contains('1')").addClass("selected");
    }
 
    //카운트를 세고 페이지 인덱스를 만들어준다.
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

        if(clikedPage == firstPage){
            $("#prev").addClass("disabled");
            return;
        }

        if(clikedPage%5 === 1){
            $(".pageIndex").remove();

            var pages = [];

            for(var i=clikedPage-5; i <= clikedPage-1; i++){
                    pages.push(i);
            }

            $("#prev").after(template.pageList({
                "pages":pages
            }))

            clickPrevResolver(clikedPage);
        }

      
            clickPrevResolver(clikedPage);
    
     

        // if(clikedPage <= 5 ){  
        //     clickPrevResolver(clikedPage);
        // }
         

        // if(clikedPage > 5 && clikedPage%5 === 1){

        //     clickPrevResolver(clikedPage)
        // }     
    }

    function clickPrevResolver(clikedPage){
        var newPage = clikedPage-1;
        $(".selected").removeClass("selected");
        $("#next").removeClass("disabled");
        $(".pageNavigator").find("li").eq(newPage).addClass("selected");
        pageViewResolver(newPage);
    }

    function clickNext(e) {
        e.preventDefault();
        var clikedPage = parseInt($(".selected").text());

        if(clikedPage === lastPage){
            $("#next").addClass("disabled");
             $("#next").text("");
            console.log("마지막 페이지입니다.");
            return;
        }
        if(clikedPage%5 == 0 && lastPage-clikedPage < 5){
            console.log("여기");
            var newPage = clikedPage+1;
            console.log(newPage);

            $(".pageNavigator li:not(#prev):not(#next)").remove();
            $("#prev").text("<<");

            if(lastPage > clikedPage*2){
                $("#next").text(">>");
            }
         
            var pages=[];
            for(var i = newPage; i<=lastPage; i++){
                pages.push(i);
            } 
            $("#prev").after(template.pageList({
                  "pages":pages
             })); 
            clickNextResolver(newPage);
            return;
        }else{
             var newPage = clikedPage+1;
            clickNextResolver(newPage);
            return;
        }
    }
    

    function clickNextResolver(newPage){

        console.log("여기서 bewPage" + newPage);
        $(".selected").removeClass("selected");
        $("#prev").removeClass("disabled");
         // var a = $(".pageNavigator").find(".pageIndex").first().text();
        
        if(newPage > 5 && newPage%5 === 1 ){
            $(".pageNavigator").find("li:nth-child(2)").addClass("selected");
        }else{
             $(".pageNavigator").find("li").eq(newPage).addClass("selected");
        }

         // $(".pageNavigator").find("li").eq(newPage).addClass("selected");
       

       
        pageViewResolver(newPage);
    }

    function init() {
        getCountedList();
        $(".pageNavigator").on("click","li:not(#prev):not(#next)", movePage);
        $(".pageNavigator").on("click","#prev", clickPrev);
        $(".pageNavigator").on("click","#next", clickNext);
    };
    return {
        "init":init
    };
});
