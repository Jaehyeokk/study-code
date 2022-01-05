interface User {
  age: number;
  name: string
}

// 변수에 활용한 인터페이스
var seho: User = {
  age: 33,
  name: '세호'
}

// 함수에 활용한 인터페이스
function getUser(user: User) {
  console.log(user);
}
const capt = {
  age: 33,
  name: '캡틴'
}

getUser(capt);

// 함수 스펙(구조)에 활용한 인터페이스
interface SumFunction {
  (a: number, b:number): number;
}

var sum2: SumFunction;
sum2 = function(a:number, b:number): number {
  return a + b;
}

// 인덱싱
interface StringArray {
  [index: number]: string
}

var arr2: StringArray = ['a', 'b', 'c'];
// arr2[0];

// 딕셔너리 패턴
interface StringRegexDictionary {
  [key: string]: RegExp;
}

var obj2: StringRegexDictionary = {
  // sth: /abc/,
  cssFile: /\.css$/,
}

// 인터페이스 확장
interface Person {
  name: string;
  age: number;
}

interface Developer extends Person {
  language: string;
}

var captain: Developer = {
  language: 'ts',
  age: 100,
  name: '캡틴'
}