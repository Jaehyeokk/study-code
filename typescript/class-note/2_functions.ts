// 함수의 파라미터에 타입을 정의하는 방식
function sum(a: number, b: number) {
  return a + b
}
sum(10, 20)

// 함수의 반환 값에 타입을 정의하는 방식
function add():number {
  return 10;
}

// 함수에 타입을 정의하는 방식
function plus(a: number, b: number): number {
  return a + b;
}

// 함수의 옵셔널 파라미터
function log(a: string, b?: string) {
  console.log(a)
  console.log(b)
}
// 파라미터뒤에 ?(물음표)를 붙여주면 필수값이 아니게 된다.