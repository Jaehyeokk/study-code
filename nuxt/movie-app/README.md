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
  $ yarn create nuxt-app <project-name>
  ```

  - npx는 npm 버전이 v5.2이상일 경우 기본으로 제공된다고 한다. 
  ```bash
  $ npx create-nuxt-app <project-name>
  ```

  ```bash
  $ npm init nuxt-app <project-name>
  ```

## 프로젝트 초기화

### Sass

- 전역으로 `sass`를 사용하기 위해 `sass`와 `sass-loader`, 그리고 `fibers`를설치해준다.

- fiber를 설치하면 동기식 컴파일이 자동으로 활성화 된다고 한다.

```bash
$ yarn add --dev sass sass-loader@10 fibers
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

## 환경변수 관리

- API를 적용하기 앞서 API_KEY 등을 환경변수로 관리할 필요가 있기에 분리한다.

- `nuxt`에서 이미 `dotenv`모듈을 제공하고 있기 때문에 설치한다.

  ```bash
  $ yarn add @nuxtjs/dotenv
  ```

- 설치한 모듈은 nuxt.config.js 파일에서 buildModules에 등록한다.

  ```js 
  // nuxt.config.js
  export default {
    buildModules: ['@nuxtjs/dotenv']
  }
  ```

- 환경변수는 관리하기 쉽도록 env.jsv파일에 객체 형식으로 정리한다.

  ```js
  // env.js
  export const MOVIEDB = {
    BASE_URL: process.env.MOVIEDB_URL,
    API_KEY: process.env.MOVIEDB_KEY
  }
  ``` 

## API 적용

### API는 themoviedb.org에서 제공받아 사용한다.

- themoviedb.org 에서 회원가입 후 API KEY를 제공받 을 수 있다.

- developers.themoviedb.org/3 에서 API 관련 문서를 확인할 수 있다.

- API로 필요한 데이터를 받아서 data에 저장하는 method를 만들고 fetch hook을 사용해 data에 담는다.

  ```js
  // pages/index.vue
  async fetch() {
    await this.getMovies()
  },
  methods: {
    async getMovies() {
      const { data } = await axios.get(`${MOVIEDB.BASE_URL}/3/movie/now_playing?api_key=${MOVIEDB.API_KEY}&language=en-US&page=1`)
      data.results.forEach(movie => {
        this.movies.push(movie)
      })
    }
  }
  ```

### fetch(), asyncData() hook

- nuxt.js에서 데이터를 호출하기 위해 사용하는 훅이 2가지 있다.

- `fetch()`와 `asyncData()`이다.

- `fetch()`는 페이지가 랜더링되기 전에 데이터를 스토어에 넣기위해서 사용한다.

- `fetch()`는 컴포넌트를 로드하기 전에 호출된다.

- `fetch()`는 모든 컴포넌트에서 사용할 수 있다.

- `fetch()`는 컨텍스트 객체를 첫번째 인수로 받으며, 그 데이터를 스토어에 넣을 수 있다.

## 검색기능 구현

- 서버에 검색문자가 담긴 쿼리를 보내 데이터를 받아서 화면에 뿌려준다.

- 이전의 로직과 유사하기 때문에 패스

- `v-model`에 `lazy`라는 option을 줄 수 있는데 특징은 다음과 같다.

  - 기본적으로 `v-model`은 입력 이벤트 후 입력과 데이터를 동기화 한다.

  - `.lazy` option을 주게 되면 change 이벤트 이후에 데이터를 동기화 한다.

## 로딩 컴포넌트 구현

- 로딩 컴포넌트를 생성하고 등록한다.

  ```html
  <Loading v-if="$fetchState.pending" />
  ```

- Nuxt에서 제공하는 `$fetchState`속성을 이용한다.

  - `$fetchState`속성은 fetch상태정보를 가져올 수 있다.

  - `$fetchState.pending`은 Boolean 값으로 client-side 에서 fetch hook이 호출되었을때 placeholder를 표시하도록 해줍니다.

  - `$fetchState.error`는 null 또는 fetch hook이 반환한 Error이다.

  - `$fetchState.timestamp`는 최신 fetch의 timestamp로써, keep-alive으로 caching 하는 것에 유용하다.

## 데이터 캐싱 (keep-alive directive)

- `keep alive` directive를 사용해 컴포넌트를 캐싱할 수 있다.

## 무비 상세페이지 구현

## 검색엔진 최적화(SEO optimization)

- `nuxt.config.js`에 등록하는 방법으로 `<meta>`정보의 전역 설정을 할 수 있다.
  ```js
  export default {
    head: {
      title: 'my website title',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        {
          hid: 'description',
          name: 'description',
          content: 'my website description'
        }
      ],
      link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }]
    }
  }
  ```

- 각 페이지 `<script>`안에 `head`속성을 등록하는 방법으로 `<meta>`정보의 지역 설정을 할 수 있다.
  ```js
  <script>
    export default {
      head: {
        title: 'Home page',
        meta: [
          {
            hid: 'description',
            name: 'description',
            content: 'Home page description'
          }
        ],
      }
    }
  </script>
  ```

- 객체로 등록하는 방법이 아닌 함수로 등록하면 data, computed속성에 접근할 수 있다.
  ```js
  <script>
    export default {
      data() {
        return {
          title: 'Home page'
        }
      },
      head() {
        return {
          title: this.title,
          meta: [
            {
              hid: 'description',
              name: 'description',
              content: 'Home page description'
            }
          ]
        }
      }
    }
  </script>
  ```