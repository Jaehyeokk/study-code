# Nuxt.js

## 버전

- `Nuxt3`는 `Vue3`에 대응하도록 만들어졌으며, 아직 베타인 점을 고려해 `Nuxt2`로 시작한다.

## 개발환경

- `Node.js` `v12(LTS)` 버전과 호환이 제일 잘 되는 것으로 보여 nvm을 이용해 `Node.js v12.22.7`환경을 만들었다.

- 최신버전으로 설치해보았으나 패키지(라이브러리)를 설치 할 때 버전이 맞지 않아 오류를 겪었고, 12버전으로 낮추었다.

## 프로젝트 생성

- 프로젝트는 유튜브를 보고 간단한 Movie-app을 만들면서 기본적인 동작 및 Vue.js와의 차이를 익히도록 한다.

- 우선 빠르게 프로젝트를 생성하는 방법은 아래와 같다.

  - 공식 홈페이지는 Yarn을 더 선호하는 느낌이다. 
  ```bash
  yarn create nuxt-app <project-name>
  ```

  - npx는 npm 버전이 v5.2이상일 경우 기본으로 제공된다고 한다. 
  ```bash
  npx create-nuxt-app <project-name>
  ```

  ```bash
  npm init nuxt-app <project-name>
  ```

## 프로젝트 초기화

### Sass

- 전역으로 `sass`를 사용하기 위해 `sass`와 `sass-loader`, 그리고 `fibers`를설치해준다.

- fiber를 설치하면 동기식 컴파일이 자동으로 활성화 된다고 한다.

```bash
yarn add --dev sass sass-loader@10 fibers
```

- 전역으로 사용할 css파일을 지정해준다.

```js
// nuxt.config.js
export default {
   css: [
    './assets/defaults.scss'
  ],
}
```

### Axios

- 프로젝트 생성 때 옵션으로 선택하면 설치와 모듈 등록까지 자동으로 된다.
- 이미 프로젝트를 생성한 상태에서는 아래와 같이 설치 및 등록을 하면 된다.

```bash
yarn add @nuxtjs/axios
```

```js
// nuxt.config.js
export default {
  modules: ["@nuxtjs/axios"],
};
 
```

### ...

- 나머지 설정은 차근차근 해나가기로 한다. (ESlint, prettier ...)

## 기본 레이아웃 구성

- 기본값은 /.nuxt/layouts를 참고 하면 된다. 
- root 경로에 layouts 디렉토리를 생성하고 default.vue 파일을 만든다.
- default.vue는 레이아웃을 지정하지 않은 모든 페이지에 적용된다.
- `<Nuxt />` 태그가 들어가 있어야 그 안에 페이지가 렌더링된다.

```html
<template>
  <div class="app">
    <Nuxt />
  </div>
</template>

```

## 라우팅

- root 경로에 pages 디렉토리안에서 파일명을 참고하여 자동으로 라우팅을 설정해준다.

  ```
  +-- pages
  |  +-- movies
  |    +-- _movieid.vue
  |  +-- index.vue
  ```

- index.vue는 인덱스 페이지를 라우팅 해준다.
- movies/_movieid.vue는 `/movies/:movieid?`를 의미한다. (.nuxt/router.js에서 확인할 수 있다.)

## 컴포넌트 등록

- componsnets 폴더에 만든 파일은 자동으로 import된다. 

  ```js
  // nuxt.config.js
  export default {
    components: true,
  }
  ```

  ```html
  <!-- index.vue -->
  <template>
    <div class="home">
      <Hero />
    </div>
  </template>

  <script>
  export default {}
  </script>
  ```  