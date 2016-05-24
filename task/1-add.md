# Task
할 일을 추가하는 task입니다.

## [과제 영상](http://portal.nhnnext.org/streaming/2016/1%ED%95%99%EA%B8%B0/jQuery%EB%A1%9C%20TODO%EA%B0%9C%EB%B0%9C%ED%95%98%EA%B8%B0./%EC%A0%84%EC%9A%A9%EC%9A%B0/651)

## 추가하기
- [ ] `.new-todo`에 todo을 입력하고 `enter`을 누른다.
- [ ] `.new-todo`에 입력한 값을 읽는다.
- [ ] 아래와 같은 html 구조에서 `{{input-value}}`을 입력한 값으로 변경한 후 `todo-list`에 마지막 엘리먼트로 추가한다.
- [ ] `.new-todo`의 값을 빈 값으로 한다.

```html
<li>
	<div class="view">
		<input class="toggle" type="checkbox">
		<label>{{input-value}}</label>
		<button class="destroy"></button>
	</div>
	<input class="edit" value="{{input-value}}">
</li>
```

# 사전 자료
## jQuery
- [$](http://portal.nhnnext.org/streaming/2016/1%ED%95%99%EA%B8%B0/jQuery/%EC%A0%84%EC%9A%A9%EC%9A%B0/654)
- [on](http://portal.nhnnext.org/streaming/2016/1%ED%95%99%EA%B8%B0/jQuery/%EC%A0%84%EC%9A%A9%EC%9A%B0/664)
- [val](http://portal.nhnnext.org/streaming/2016/1%ED%95%99%EA%B8%B0/jQuery/%EC%A0%84%EC%9A%A9%EC%9A%B0/661)
- [append](http://portal.nhnnext.org/streaming/2016/1%ED%95%99%EA%B8%B0/jQuery/%EC%A0%84%EC%9A%A9%EC%9A%B0/662)
- [event object](http://portal.nhnnext.org/streaming/2016/1%ED%95%99%EA%B8%B0/jQuery/%EC%A0%84%EC%9A%A9%EC%9A%B0/665)