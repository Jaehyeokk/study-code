# node.js

## node.js의 특징

- 크롬에서 사용하는 V8 엔진을 사용한다.
- 브라우저 밖에서 자바스크립트를 실행할 수 있다.
- 이벤트 기반의 비동기 I/O 프레임워크이다.
- commonJS의 모듈 시스템 구현<br />
  - 브라우저에서는 윈도우 컨텍스트를 사용하거나 RequireJS(라이브러리)같은 의존성 로더를 사용했다.<br />
  - node.js는 파일형태로 모듈을 관리할 수 있다.
  - node.js에서의 모듈 사용

```javascript
// 기본 모듈 사용
const http = require("http");
```

```javascript
// 사용자 정의 모듈 사용
// index.js
const math = require("./math.js");
const result = math.sum(1, 2);

console.log(result); // 3

// math.js
function sum(a, b) {
  return a + b;
}
module.exports = {
  sum: sum,
};
```

> CommonJS는 웹 브라우저 밖의 자바스크립트를 위한 모듈 생태계의 규칙을 설립하기 위한 프로젝트이다.

- node는 기본적으로 비동기로 동작한다.

```javascript
// index.js
const fs = require("fs");

// 동기
const data = fs.readFileSync("./data.txt", "utf8");
console.log(data); // hi

// 비동기
// 주로 비동기로 동작하기 때문에 콜백함수를 파라미터로 넣는 스타일을 많이 쓴다.
const data2 = fs.readFile("./data.txt", "utf8", function (err, data) {
  console.log(data2); // hi
});

// data.txt
Hi;
```
