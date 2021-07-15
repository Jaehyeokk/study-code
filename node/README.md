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

## Node.js Hello World

### Hello World 예제

```javascript
const http = require("http");

const hostname = "127.0.0.1";
const port = 3000;

// http module의 createServer method를 통해 서버를 생성한다.
const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader("Content-Type", "text/plain");
  res.end("Hello, World!\n");
});

// listen 함수로 서버가 클라이언트의 요청을 받을수 있도록 종료하기 않고 계속 대기하도록 한다.
server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
```

```bash
# curl으로 요청을 보낸다.
curl -X GET 'localhost:3000'
# Hello World
```

### Routing

```javascript
const http = require("http");

const hostname = "127.0.0.1";
const port = 3000;

const server = http.createServer((req, res) => {
  if (req.url === "/") {
    res.statusCode = 200;
    res.setHeader("Content-Type", "text/plain");
    res.end("Hello, World!\n");
  } else if (req.url === "/users") {
    res.statusCode = 200;
    res.setHeader("content-type", "text/plain");
    res.end("User list");
  } else {
    res.statusCode = 404;
    res.end("Not Found");
  }
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
```

## Express

### Express의 특징

- Application
  - Express instance를 application이라고 한다.
  - Server에 필요한 기능인 middleware를 application에 추가한다.
  - Routing 설정을 할 수 있다.
  - Server를 요청 대기 상태로 만들 수 있다.

```javascript
const express = require("express");
const app = express();

app.listen(8080, function () {
  console.log("Server is running");
});
```

- Middleware
  - middleware는 함수들의 연속이다.
  - 일반 middleware와 에러 middleware가 있다.

```javascript
const express = require("express");
// third party middleware
const morgan = require("morgan");
const app = express();

// user-defined middleware
function commonMw(req, res, next) {
  console.log("commonMw");
  next(new Error("error ouccered"));
}

// error middleware
function ErrorMw(err, req, res, next) {
  console.log(err.message);
  // error를 처리하거나 다음 미들웨어에 넘김
  next();
}

app.use(commonMw);
app.use(ErrorMw);
// 써드파티 미들웨어의 사용
app.use(morgan("dev"));

app.listen(3000, function () {
  console.log("Server is running");
});
```

- Routing

  - 요청 url에 대해 적절한 핸들러 함수로 연결해주는 기능
  - 어플리케이션의 get(), post() 메소드로 구현할 수 있다.
  - Routing을 위한 전용 Router 클래스를 사용할 수도 있다.

- 요청 객체

  - 클라이언트 요청 정보를 담은 객체를 요청(Request)객체라고 한다.
  - http 모듈의 request 객체를 래핑한 것이다.
  - req.params(), req.query(), req.body() 메소드를 주로 사용한다.

- 응답 객체
- 클라이언트 응답 정보를 담은 객체를 응답(Response)객체라고 한다.
- http 모듈의 response 객체를 래핑한 것이다.
- res.send(), res.status(), res.json() 메소드를 주로 사용한다.

## Express Hello World

### Hello World 예제

```javascript
var express = require("express");
var app = express();

// routing
app.get("/", function (req, res) {
  res.send("Hello World!");
});

app.get("/users", function (req, res) {
  res.send("User list");
});

app.listen(3000, function () {
  console.log("Example app listening on port 3000!");
});
```

## HTTP

### HTTP 요청

- 모든 자원은 명사로 식별한다
- HTTP 경로로 자원을 요청한다
- 예)
  - GET /users
  - GET /users/{id}

### HTTP 메서드

- 서버 자원에 대한 행동을 나타낸다. (동사로 표현)
  - GET: 자원을 조회
  - POST: 자원을 생성
  - PUT: 자원을 갱신
  - DELETE: 자원을 삭제
- 익스프레스 어플리케이션의 메서드로 구현되어 있다.

### HTTP 상태코드

- 2XX: 자, 여기있어
  - 200: 성공(success), GET, PUT
  - 201: 작성됨(created), POST
  - 204: 내용 없음 (No Conent), DELETE
- 4XX: 니가 문제임
  - 400: 잘못된 요청 (Bad Request)
  - 401: 권한 없음 (Unauthorized)
  - 404: 찾을 수 없음 (Not found)
  - 409: 충돌 (Conflict)
- 5XX: 내가 문제임
  - 500: 서버 에러 (Interel server error)

## TDD

### TDD를 위한 라이브러리

- Mocha

  - 모카(Mocha)는 테스트 코드를 돌려주는 테스트 러너
  - 테스트 수트: 테스트 환경으로 모카에서는 describe()로 구현한다.
  - 테스트 케이스: 실제 테스트를 말하며 모카에서는 it()으로 구현한다.

  ```javascript
  // utils.js
  function capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  module.exports = {
    capitalize,
  };
  ```

  ```javascript
  // utils.spec.js
  const assert = require("assert");
  const utils = require("./utils");

  describe("utils.js 모듈의 capitalize() 함수는", () => {
    it("문자열의 첫번째 문자를 변환한다", () => {
      // ...
      const result = utils.capitalize("hello");
      assert.equal(result, "Hello");
    });
  });
  ```

  ```bash
  # terminal
  node_modules/.bin/mocha utils.spec.js
  # test result
  ```

- Should

  - Node assert 말고 서드파티 라이브러리를 사용하라
  - should는 검증(assertion) 라이브러리다.
  - 가독성 높은 테스트 코드를 만들 수 있다.

  ```javascript
  const should = require("should");
  const utils = require("./utils");

  describe("utils.js 모듈의 capitalize() 함수는", () => {
    it("문자열의 첫번째 문자를 변환한다", () => {
      // ...
      const result = utils.capitalize("hello");
      result.should.be.equal("Hello");
    });
  });
  ```

- SuperTest

  - 단위 테스트: 함수의 기능 테스트
  - 통합 테스트: API의 기능 테스트
  - 슈퍼 테스트는 익스프레스 통합 테스트용 라이브러리다
  - 내부적으로 익스프레스 서버를 구동시켜 실제 요청을 보낸 뒤 결과를 검증한다.

  ```javascript
  const request = require("supertest");
  const app = require("./index");

  describe("GET /users는", () => {
    // 비동기처리를 위해 it함수의 두번째 파라미터로 done이라는 콜백을 받는다.
    it("...", (done) => {
      request(app)
        .get("/users")
        .end((err, res) => {
          console.log(res.body);
          // 끝나는 시점에 done을 호출
          done();
        });
    });
  });
  ```

```
## TDD (Test driven development)로 만드는 API 서버

```

```

```
