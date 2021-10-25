# 실습 UI 개발로 배워보는 VanillaJS와 VueJS 개발

## 학습목표

- VanillaJS(MVC 패턴)와 VueJS(MVVC 패턴)를 비교하며 학습

## 개발환경

- VSCode
- Chrome

- Git
- Node.js
- lite-server (npm i -g lite-server)


## VanillaJS(MVC 패턴)

MVC는 Model View Controller 의 약자

- Model
  - Model은 데이터를 관리
  - DB에 있는 데이터를 가져와서 또 다른 객체에 전달해주는 역할
  - 외부 객체로부터 입력데이터를 받아와서 DB에 넣어주는 역할
  - Front-end에서 Model의 역할은 DB에 직접 접근하지 않고 API형태로 접근

- View
  - 데이터를 가지고 화면을 관리
  - 사용자가 입력한 데이터를 처리(입력을 하면 View는 입력이벤트를 받아서 다른 객체에 전달)

**Model과 View는 직접 연결되지 않고 Controller를 통한다.**

- Controller
  - Model과 View를 관리
  - Model로부터 전달받은 데이터를 View로 전달
  - View로부터 전달받은 입력데이터를 Model로 전달

## 폴더구조

```bash
├─ js
│ └─ controllers
│   └─ MainController.js
│ └─ models
│   ├─ HistoryModel.js
│   ├─ KeywordModel.js
│   └─ SearchModel.js
│ └─ views
│   ├─ FormView.js
│   ├─ ResultView.js
│   ├─ TabView.js
│   └─ View.js
│ └─ App.js
├─ index.html
└─ style.css
```

## 요구사항 분석 및 구현

### 검색폼 구현
- [O] 검색 상품명 입력 폼이 위치한다.
- [O] 검색어를 입력하면 x버튼이 보이고, 없으면 x 버튼을 숨긴다
- [O] 엔터를 입력하면 검색 결과가 보인다 (컨트롤러에게 위임)
- [O] x 버튼을 클릭하거나, 검색어를 삭제하면 검색 결과를 삭제한다 (과제)

### 검색 결과 구현

- [O] 검색 결과가 검색폼 아래 위치한다. 검색 결과가 없을 경우와 있을 경우를 구분한다.
- [O] x버튼을 클릭하면 검색폼이 초기화 되고, 검색 결과가 사라진다 (과제)

### 탭 구현

- [O] 추천 검색어, 최근 검색어 탭이 검색폼 아래 위치한다
- [O] 기본으로 추천 검색어 탭을 선택한다
- [O] 각 탭을 클릭하면 탭 아래 내용이 변경된다

### 추천 검색어 구현

- [O] 번호와 추천 검색어 이름이 목록 형태로 탭 아래 위치한다.
- [O] 목록에서 검색어를 클릭하면 선택된 검색어의 검색 결과 화면으로 이동한다.

### 최근 검색어 구현
- [O] 최근 검색어 이름, 검색일자, 삭제 버튼이 목록 현태로 탭 아래 위치한다.
- [O] 목록에서 검색어를 클릭하면 선택된 검색어로 검색 결과 화면으로 이동한다.
- [O] 목록에서 x 버튼을 클릭하면 선택된 검색어가 목록에서 삭제
- [O] 검색시마다 최근 검색어 목록에 추가된다