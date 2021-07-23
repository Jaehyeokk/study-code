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

## TDD (Test driven development)로 만드는 API 서버

### 사용자 목록 조회 API 요구사항

- 성공
  - 유저 객체를 담은 배열로 응답한다
  - 최대 limit 갯수만큼 응답한다
- 실패
  - limit이 숫자형이 아니면 400을 응답한다
  - offset이 숫자형이 아니면 400을 응답한다

```javascript
// index.js
var express = require("express");
var morgan = require("morgan");
var app = express();
var users = [
  { id: 1, name: "alice" },
  { id: 2, name: "bek" },
  { id: 3, name: "chris" },
];

app.use(morgan("dev"));

app.get("/users", function (req, res) {
  req.query.limit = req.query.limit || 10; // req.qeury.limit이 없을 때 undefined 방지
  const limit = parseInt(req.query.limit, 10); // 문자열로 오기 때문에 정수로 변환
  if (Number.isNaN(limit)) {
    return res.status(400).end();
  }
  res.json(users.slice(0, limit));
});

app.listen(3000, function () {
  console.log("Server runnig at port 3000");
});

module.exports = app;
```

```javascript
// index.spec.js
const request = require("supertest");
const should = require("should");
const app = require("./index");

describe("GET /users는", () => {
  describe("성공시", () => {
    it("유저 객체를 담은 배열로 응답한다.", (done) => {
      request(app)
        .get("/users")
        .end((err, res) => {
          res.body.should.be.instanceOf(Array);
          done();
        });
    });
    it("최대 limit 갯수만큼 응답한다", (done) => {
      request(app)
        .get("/users?limit=2")
        .end((err, res) => {
          res.body.should.have.lengthOf(2);
          done();
        });
    });
  });

  describe("실패시", () => {
    it("limit이 숫자형이 아니면 400을 응답한다", (done) => {
      request(app).get("/users?limit=two").expect(400).end(done);
    });
  });
});
```

### 사용자 조회 API 요구사항

- 성공
  - id가 1인 유저 객체를 반환한다.
- 실패
  - id가 숫자가 아닐경우 400으로 응답한다.
  - id로 유저를 찾을 수 없을 경우 404로 응답한다.

```javascript
// index.js
// ...

app.get("/users/:id", function (req, res) {
  const id = parseInt(req.params.id, 10);
  if (Number.isNaN(id)) return res.status(400).end();
  const user = users.filter((user) => user.id === id)[0];
  if (!user) return res.status(404).end();
  res.json(user);
});
```

```javascript
// index.spec.js
// ...

describe("GET /users/1은", () => {
  describe("성공시", () => {
    it("id가 1인 유저 객체를 반환한다.", (done) => {
      request(app)
        .get("/users/1")
        .end((err, res) => {
          console.log(res.body);
          res.body.should.have.property("id", 1);
          done();
        });
    });
  });
  describe("실패시", () => {
    it("id가 숫자가 아닐경우 400을 응답한다.", (done) => {
      request(app).get("/users/one").expect(400).end(done);
    });
    it("id로 유저를 찾을 수 없을 경우 404를 응답한다.", (done) => {
      request(app).get("/users/999").expect(404).end(done);
    });
  });
});
```

### 사용자 삭제 API 요구사항

- 성공
  - 204를 응답한다.
- 실패
  - id가 숫자가 아닐경우 400으로 응답한다.

```javascript
// index.js
// ...

app.delete("/users/:id", function (req, res) {
  const id = parseInt(req.params.id, 10);
  if (Number.isNaN(id)) return res.status(400).end();
  users = users.filter((user) => user.id !== id);
  res.status(204).end();
});
```

```javascript
// index.spec.js
// ...

describe("GET /users/1은", () => {
  describe("성공시", () => {
    it("204를 응답한다", (done) => {
      request(app).delete("/users/1").expect(204).end(done);
    });
  });
  describe("실패시", () => {
    it("id가 숫자가 아닐 경우 400으로 응답한다.", (done) => {
      request(app).delete("/users/one").expect(400).end(done);
    });
  });
});
```

### 사용자 추가 API 요구사항

- 성공
  - 201 상태코드를 반환한다.
  - 생성된 유저 객체를 반환한다.
  - 입력한 name을 반환한다.
- 실패
  - name 파라미터 누락시 400을 반환한다.
  - name이 중복일 경우 409를 반환한다.

```javascript
// index.js
// ...

app.post("/users", function (req, res) {
  const name = req.body.name;
  if (!name) return res.status(400).end();
  const isConflict = users.filter((user) => user.name === name).length;
  if (isConflict) return res.status(409).end();
  const id = Date.now();
  const user = { id, name };
  users.push(user);
  res.status(201).json(user);
});
```

```javascript
// index.spec.js
// ...

describe("POST /users", () => {
  describe("성공시", () => {
    let name = "daniel",
      body;
    // mocha 함수 testcase가 동작하기 전에 미리 동작하는 함수
    before((done) => {
      request(app)
        .post("/users")
        .send({ name })
        .expect(201)
        .end((err, res) => {
          body = res.body;
          done();
        });
    });
    it("생성된 유저 객체를 반환한다", () => {
      body.should.have.property("id");
    });
    it("입력한 name을 반환한다", () => {
      body.should.have.property("name", name);
    });
  });
  describe("실패시", () => {
    it("name 파라미터 누락시 400을 반환한다", (done) => {
      request(app).post("/users").send({}).expect(400).end(done);
    });
    it("name이 중복일 경우 409를 반환한다", (done) => {
      request(app)
        .post("/users")
        .send({ name: "daniel" })
        .expect(409)
        .end(done);
    });
  });
});
```

### 사용자 수정 API 요구사항

- 성공
  - 변경된 name을 반환한다.
- 실패
  - 정수가 아닌 id일 경우 400을 응답한다.
  - name이 없을 경우 400을 응답한다.
  - 없는 유저일 경우 404를 응답한다.
  - 이름이 중복일 경우 409를 응답한다.

```javascript
// index.js
// ...

app.put("/users/:id", (req, res) => {
  const id = parseInt(req.params.id, 10);
  if (Number.isNaN(id)) return res.status(400).end();

  const name = req.body.name;
  if (!name) return res.status(400).end();
  const isConflict = users.filter((user) => user.name === name).length;
  if (isConflict) return res.status(409).end();

  const user = users.filter((user) => user.id === id)[0];
  if (!user) return res.status(404).end();
  user.name = name;
  res.json(user);
});
```

```javascript
// index.spec.js
// ...

describe("PUT /users/:id는", () => {
  describe("성공시", () => {
    it("변경된 name을 응답한다.", (done) => {
      const name = "chally";
      request(app)
        .put("/users/3")
        .send({ name })
        .end((req, res) => {
          res.body.should.have.property("name", name);
          done();
        });
    });
  });
  describe("실패시", () => {
    it("정수가 아닌 id일 경우 400을 응답한다", (done) => {
      request(app).put("/users/one").expect(400).end(done);
    });
    it("name이 없을 경우 400을 응답한다", (done) => {
      request(app).put("/users/one").send({}).expect(400).end(done);
    });
    it("없는 유저일 경우 404를 응답한다", (done) => {
      request(app)
        .put("/users/999")
        .send({ name: "foo" })
        .expect(404)
        .end(done);
    });
    it("이름이 중복일 경우 경우 409를 응답한다", (done) => {
      request(app).put("/users/3").send({ name: "bek" }).expect(409).end(done);
    });
  });
});
```

### 리팩토링 - Router class

Route 부분을 express의 Router class를 이용해서 리팩토링

```js
// /index.js

// user 모듈을 가져온다.
var user = require("./api/user");

// /users 경로로 들어오는 라우팅은 user모듈로 처리한다.
app.use("/users", user); //
```

```js
// /api/user/index.js

// express를 가져와서 라우터 클래스를 생성한다.
const express = require("express");
const router = express.Router();

var users = [
  { id: 1, name: "alice" },
  { id: 2, name: "bek" },
  { id: 3, name: "chris" },
];

// 생성한 router class로 라우팅을 작성한다.

// Get User-list
router.get("/", function (req, res) {
  req.query.limit = req.query.limit || 10;
  const limit = parseInt(req.query.limit, 10);
  if (Number.isNaN(limit)) {
    return res.status(400).end();
  }
  res.json(users.slice(0, limit));
});

// Get User
router.get("/:id", function (req, res) {
  const id = parseInt(req.params.id, 10);
  if (Number.isNaN(id)) return res.status(400).end();
  const user = users.filter((user) => user.id === id)[0];
  if (!user) return res.status(404).end();
  res.json(user);
});

// Delete User
router.delete("/:id", function (req, res) {
  const id = parseInt(req.params.id, 10);
  if (Number.isNaN(id)) return res.status(400).end();
  users = users.filter((user) => user.id !== id);
  res.status(204).end();
});

// Post User
router.post("/", function (req, res) {
  const name = req.body.name;
  if (!name) return res.status(400).end();
  const isConflict = users.filter((user) => user.name === name).length;
  if (isConflict) return res.status(409).end();
  const id = Date.now();
  const user = { id, name };
  users.push(user);
  res.status(201).json(user);
});

// Put User
router.put("/:id", (req, res) => {
  const id = parseInt(req.params.id, 10);
  if (Number.isNaN(id)) return res.status(400).end();

  const name = req.body.name;
  if (!name) return res.status(400).end();
  const isConflict = users.filter((user) => user.name === name).length;
  if (isConflict) return res.status(409).end();

  const user = users.filter((user) => user.id === id)[0];
  if (!user) return res.status(404).end();
  user.name = name;
  res.json(user);
});

module.exports = router;
```

### 리팩토링 - Controller

Controller 파일을 모듈화 해서 리팩토링

```js
// /api/user/user.ctrl.js

var users = [
  { id: 1, name: "alice" },
  { id: 2, name: "bek" },
  { id: 3, name: "chris" },
];

const index = function (req, res) {
  req.query.limit = req.query.limit || 10;
  const limit = parseInt(req.query.limit, 10);
  if (Number.isNaN(limit)) {
    return res.status(400).end();
  }
  res.json(users.slice(0, limit));
};

const show = function (req, res) {
  const id = parseInt(req.params.id, 10);
  if (Number.isNaN(id)) return res.status(400).end();
  const user = users.filter((user) => user.id === id)[0];
  if (!user) return res.status(404).end();
  res.json(user);
};

const destroy = function (req, res) {
  const id = parseInt(req.params.id, 10);
  if (Number.isNaN(id)) return res.status(400).end();
  users = users.filter((user) => user.id !== id);
  res.status(204).end();
};

const create = function (req, res) {
  const name = req.body.name;
  if (!name) return res.status(400).end();
  const isConflict = users.filter((user) => user.name === name).length;
  if (isConflict) return res.status(409).end();
  const id = Date.now();
  const user = { id, name };
  users.push(user);
  res.status(201).json(user);
};

const update = function (req, res) {
  const id = parseInt(req.params.id, 10);
  if (Number.isNaN(id)) return res.status(400).end();

  const name = req.body.name;
  if (!name) return res.status(400).end();
  const isConflict = users.filter((user) => user.name === name).length;
  if (isConflict) return res.status(409).end();

  const user = users.filter((user) => user.id === id)[0];
  if (!user) return res.status(404).end();
  user.name = name;
  res.json(user);
};

module.exports = {
  index,
  show,
  destroy,
  create,
  update,
};
```

```js
// /api/user/index.js

const express = require("express");
const router = express.Router();
const ctrl = require("./user.ctrl");

// Get User-list
router.get("/", ctrl.index);

// Get User
router.get("/:id", ctrl.show);

// Delete User
router.delete("/:id", ctrl.destroy);

// Post User
router.post("/", ctrl.create);

// Put User
router.put("/:id", ctrl.update);

module.exports = router;
```

### 리팩토링 - Test code

테스트 코드 이동

```js
// api/user/user.spec.js

const request = require("supertest");
const should = require("should");
// * 어플리케이션의 경로를 다시 설정해준다.
const app = require("../../");

describe("GET /users는", () => {
  describe("성공시", () => {
    it("유저 객체를 담은 배열로 응답한다.", (done) => {
      request(app)
        .get("/users")
        .end((err, res) => {
          res.body.should.be.instanceOf(Array);
          done();
        });
    });
    it("최대 limit 갯수만큼 응답한다", (done) => {
      request(app)
        .get("/users?limit=2")
        .end((err, res) => {
          res.body.should.have.lengthOf(2);
          done();
        });
    });
  });

  describe("실패시", () => {
    it("limit이 숫자형이 아니면 400을 응답한다", (done) => {
      request(app).get("/users?limit=two").expect(400).end(done);
    });
  });
});

describe("GET /users/:id는", () => {
  describe("성공시", () => {
    it("id가 1인 유저 객체를 반환한다.", (done) => {
      request(app)
        .get("/users/1")
        .end((err, res) => {
          console.log(res.body);
          res.body.should.have.property("id", 1);
          done();
        });
    });
  });
  describe("실패시", () => {
    it("id가 숫자가 아닐경우 400을 응답한다.", (done) => {
      request(app).get("/users/one").expect(400).end(done);
    });
    it("id로 유저를 찾을 수 없을 경우 404를 응답한다.", (done) => {
      request(app).get("/users/999").expect(404).end(done);
    });
  });
});

describe("DELETE /users/:id는", () => {
  describe("성공시", () => {
    it("204를 응답한다", (done) => {
      request(app).delete("/users/1").expect(204).end(done);
    });
  });
  describe("실패시", () => {
    it("id가 숫자가 아닐 경우 400으로 응답한다.", (done) => {
      request(app).delete("/users/one").expect(400).end(done);
    });
  });
});

describe("POST /users는", () => {
  describe("성공시", () => {
    // mocha 함수 testcase가 동작하기 전에 미리 동작하는 함수
    let name = "daniel",
      body;
    before((done) => {
      request(app)
        .post("/users")
        .send({ name })
        .expect(201)
        .end((err, res) => {
          body = res.body;
          done();
        });
    });
    it("생성된 유저 객체를 반환한다", () => {
      body.should.have.property("id");
    });
    it("입력한 name을 반환한다", () => {
      body.should.have.property("name", name);
    });
  });
  describe("실패시", () => {
    it("name 파라미터 누락시 400을 반환한다", (done) => {
      request(app).post("/users").send({}).expect(400).end(done);
    });
    it("name이 중복일 경우 409를 반환한다", (done) => {
      request(app)
        .post("/users")
        .send({ name: "daniel" })
        .expect(409)
        .end(done);
    });
  });
});

describe("PUT /users/:id는", () => {
  describe("성공시", () => {
    it("변경된 name을 응답한다.", (done) => {
      const name = "chally";
      request(app)
        .put("/users/3")
        .send({ name })
        .end((req, res) => {
          res.body.should.have.property("name", name);
          done();
        });
    });
  });
  describe("실패시", () => {
    it("정수가 아닌 id일 경우 400을 응답한다", (done) => {
      request(app).put("/users/one").expect(400).end(done);
    });
    it("name이 없을 경우 400을 응답한다", (done) => {
      request(app).put("/users/one").send({}).expect(400).end(done);
    });
    it("없는 유저일 경우 404를 응답한다", (done) => {
      request(app)
        .put("/users/999")
        .send({ name: "foo" })
        .expect(404)
        .end(done);
    });
    it("이름이 중복일 경우 경우 409를 응답한다", (done) => {
      request(app).put("/users/3").send({ name: "bek" }).expect(409).end(done);
    });
  });
});
```

```json
// package.json

"scripts": {
    "test": "mocha api/user/user.spec.js",
    "start": "node index.js"
  },
```

### 리팩토링 - Test code 2

테스트시 서버 로그 안남도록 환경변수 설정

```json
// package.json

"scripts": {
    // mac
    "test": "NODE_ENV=test mocha api/user/user.spec.js",
    // windows - (npm i cross-env) 라이브러리를 이용해야 한다.
    "test": "cross-env NODE_ENV=test mocha api/user/user.spec.js",
  },
```

```js
// /index.js

// 환경변수를 설정하면 process.env라는 내장 객체에 저장된다.
if (process.env.NODE_ENV !== "test") {
  app.use(morgan("dev"));
}
```

테스트시 supertest와 중복으로 서버가 실행되지 않도록 서버실행 코드 분리

```js
// /index.js

var express = require("express");
var morgan = require("morgan");
var user = require("./api/user");
var app = express();

// Middleware
app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

if (process.env.NODE_ENV !== "test") {
  app.use(morgan("dev"));
}

app.use("/users", user);

module.exports = app;
```

```js
// bin/www.js

const app = require("../index");

// Server
app.listen(3000, function () {
  console.log("Server runnig at port 3000");
});
```

```json
// package.json

 "scripts": {
    "test": "cross-env NODE_ENV=test mocha api/user/user.spec.js",
    "start": "node bin/www.js"
  },
```
