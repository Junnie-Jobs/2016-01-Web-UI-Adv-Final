# Task
앞서 진행했던 코드를 다시 검토하고 개선하는 task입니다.

## [과제 영상](http://qa.next-edon.com/jquery_todo/lecture/5696)

## 개선하기-1
- [ ] magic number인 13을 제거한다.
- [ ] `할 일 추가`할 때, 탬플릿 라이브러리(여기서는 [handlebarsjs](http://handlebarsjs.com/))를 활용한다.
- [ ] `완료하기`/`삭제하기`는 event delegation기법을 활용한다.
- [ ] 이벤트를 바인딩하는 부분과 동작하는 코드를 개선한다.
	- [ ] 초기화하는 함수(`init`)를 만든다. 초기화하는 함수에는 이벤트를 바인딩한다.
	- [ ] 모듈패턴을 활용하여 TODO객체를 만든다.
		- [ ] 객체는 초기화하는 `init` 메서드가 있고, 그 외 메서드는 노출되지 않는다.
	- [ ] `DOMContentLoaded`시점에 `TODO.init`을 실행한다.

# 사전 지식
## jQuery
- [on(delegation)](http://portal.nhnnext.org/streaming/2016/1%ED%95%99%EA%B8%B0/jQuery/%EC%A0%84%EC%9A%A9%EC%9A%B0/664)
- [ready](http://portal.nhnnext.org/streaming/2016/1%ED%95%99%EA%B8%B0/jQuery/%EC%A0%84%EC%9A%A9%EC%9A%B0/664)

## FE공통강의
- [module pattern](http://portal.nhnnext.org/streaming/2016/1%ED%95%99%EA%B8%B0/FE%20%EA%B8%B0%EB%B3%B8/%EC%A0%84%EC%9A%A9%EC%9A%B0/656)
- [template pattern](http://portal.nhnnext.org/streaming/2016/1%ED%95%99%EA%B8%B0/FE%20%EA%B8%B0%EB%B3%B8/%EC%A0%84%EC%9A%A9%EC%9A%B0/660)
- [event delegation](http://portal.nhnnext.org/streaming/2016/1%ED%95%99%EA%B8%B0/FE%20%EA%B8%B0%EB%B3%B8/%EC%A0%84%EC%9A%A9%EC%9A%B0/657)
- [자바스크립트 초기화](http://portal.nhnnext.org/streaming/2016/1%ED%95%99%EA%B8%B0/JS/%EC%A0%84%EC%9A%A9%EC%9A%B0/655)
