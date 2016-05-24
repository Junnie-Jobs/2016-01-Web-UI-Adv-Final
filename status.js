var status = (function (EventEmitter){
    //생성자
    function status(selector, options){
        //ul
        this.element = $(selector);
        this.selected = this.element.chkldren("li").prop("selected"); //true/false;
        this.ee = new EventEmitter();
        this.init();
        setSelected(this.element,this.selected);
    }

    function setSelected(ele, selected) {
        // $(ele).children("li").
    }
    //init
    status.prototype.init = function(eventName,fp){
        // this.element.on("click","a",)

    }
    status.prototype._filter = function () {

    }
    status.prototype.on = function(eventName,fp){
        this.ee.addListener(eventName,fp);
    };
    status.prototype.off = function(eventName,fp){
        this.ee.removeListener(eventName,fp);
    };
    status.on("change",function (e) {

    })
})
