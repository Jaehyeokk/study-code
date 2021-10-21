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


