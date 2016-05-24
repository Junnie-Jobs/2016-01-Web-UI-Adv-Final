define(['jquery','eventEmitter'],function($, EventEmitter){

	function pageNavaigator(element, max){

		this.ee = new EventEmitter();
		this.pageNavaigator = $(element);
		this.maxPageNum = 5;
		this.pageIndexInit = 1;
		this.selectedPage; 
		this.prevArrow; 
		this.nextArrow;
		this.init();
	}

	pageNavaigator.prototype = {

		init : function () {
		    this.setPageNum(this.pageIndexInit);
		    this.setBeforeAfterArrowIfNeeded();
		    this.pageNavaigator.on('click', 'a', $.proxy(this, 'pageMove'));
  		},

  		setPageNum: function (start) {
			var $paginationIndexes = this.pageNavaigator.find('li');
			var countPage = start;
			$paginationIndexes.map(function (id, pageLi) {
			  if (id !== 0) {
			    $(pageLi).find('a').text(countPage);
			    countPage += 1;
			  }
			 	})
		},

		setPrevNextArrow: function () {
	    this.pageNavaigator.find('li:first').addClass('prev');
	    this.pageNavaigator.find('li:last').addClass('next');
	    this.prevArrow = $('.pageNavaigator .prev').find('a').text('<');
	    this.nextArrow = $('.pageNavaigator .next').find('a').text('>');
  		
  		},		

  		pageMove: function (e) {

		    this.addSelected(e);
		    this.checkArrow(this.selectedPage.find('a').text());
		    this.ee.emit('change', {
		      "index": this.selectedPage.find('a').text(),
		      "max": max,
		    });
		},

		addSelected : function (e) {

		    this.selectedPage.removeClass('selected');
		    var $clikedPage = $(e.target).closest('li');

		    if ($clikedPage.hasClass('prev')) {
		      this.selectedPage = $(this.selectedPage.prev())
		    }else if ($clikedPage.hasClass('next')) {
		      this.selectedPage = $(this.selectedPage.next());
		    }else {
		      this.selectedPage = $clikedPage;
		    }
		    this.selectedPage.addClass('selected');
		},
	
		checkArrow : function (selectedIndex) {

		    if (selectedIndex === 1) {
		      this.prevArrow.addClass('disabled');
		      this.nextArrow.removeClass('disabled');
		    }

		    if (selectedIndex === (1 + (this.maxPageNum - 1))) { 
		      this.nextArrow.addClass('disabled');
		      this.prevArrow.removeClass('disabled');
		    }
		  },
		

		on :  function (eventName, fp) {
	   		 this.ee.addListener(eventName, fp);
	  	},

	  	off = function (eventName, fp) {
	   		 this.ee.removeListener(eventName, fp);
	 	}
	}

	return pageNavaigator;

});