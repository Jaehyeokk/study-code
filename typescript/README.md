
# 타입스크립트(TypeScript)

[예제 코드](https://github.com/joshua1988/learn-typescript)

[강의 교안](https://joshua1988.github.io/ts/)

## 타입스크립트란?

- 자바스크립트에 타입을 부여한 확장 언어
- 브라우저에서 실행하기 위해 한번 변환(컴파일)해주어야 함
- 타입 체크로 에러의 사전 방지
- 개발 생산성 향상

## 설치 및 사용
-  전역 설치
  ```bash
  $ npm i typescript -g 
  ```

- .ts 파일 컴파일 방법

```bash
$ tsc index.ts
```

- config file 설정
  + `tsconfig.json`파일 생성
  + 옵션은 [공식 문서](https://www.typescriptlang.org/tsconfig)에서 확인 가능
```json
{
  "compilerOptions": {
    "allowJs": true,
    "checkJs": true,
    "noImplicitAny": true
  }
}
```
