/*
Spec
 - Feature
 	- 생성자
 		- 첫번째 인자로 엘리먼트, 두번째 인자로 옵션을 받는다.
 		- 첫번째 인자로 들어온 엘리먼트의 checked속성을 확인하여 적용한다.
 		-
 	- init
 		- input의 부모에 있는 span에 checkbox-applied클래스를 추가한다.
 		- span의 자식노드로 있는 span에 click이벤트를 할당한다.
 	- click
 		- click핸들러로 클릭하면 input의 checked속성을 변경한다
 		- span엘리먼트에 checkbox-checked을 토글링한다.
 		- change이벤트가 발생한다.(Event 부분의 객체를 인자로 전달한다.)
 	- on
 		- 이벤트을 추가한다.
	- off
		- 이벤트을 해제한다
 - Event
	- `change` 이벤트 제공 : 상태가 변경하면 발생하는 이벤트
		- arguments로 `checked`(checked상태), `target`(해당 input엘리먼트)이 들어가 있는 객체를 반환한다.
		```js
		{
			"checked" : true, //checked된 상태
			"target" : input // checked된 엘리먼트
		}
		```
 - Method
	- `isChecked` 메서드 제공 : input의 checked된 상태를 true/false로 알 수 있는 메서드
*/

// var status = new Status(ele,options);
// status.on("change",function(e){

// });


var Checkbox = (function(EventEmitter){
	function cb(selector, options){
		this.ele = $(selector);
		this.checked = this.ele.prop("checked");
		this.ee = new EventEmitter();
		this.init();
		setChecked(this.ele, this.checked);
	}

	function setChecked(ele , checked){
		$(ele).closest("span").children("span")[checked?"addClass":"removeClass"]("checkbox-checked");
	}

	cb.prototype.init = function(){
		var parent = this.ele.closest("span");
		parent.addClass("checkbox-applied");
		parent.children("span").on("click", $.proxy(this,"_change"));
	}

	cb.prototype._change = function(e){
		$(e.target).toggleClass("checkbox-checked");

		this.checked = !this.checked;
		this.ele.prop("checked",this.checked);
		this.ee.emit("change",{
			checked: this.checked,
			target: this.ele
		})
	}

	cb.prototype.on = function(eventName, fp){
		this.ee.addListener(eventName,fp);
	}
	cb.prototype.of = function(eventName, fp){
		this.ee.removeListener(eventName, fp);
	}
	cb.prototype.isChecked = function(){
		return this.checked;
	}

	return cb;

})(EventEmitter);
