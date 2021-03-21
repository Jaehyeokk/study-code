# vue.js

## 컴포넌트의 통신
### props

데이터를 내릴 컴포넌트 (상위 컴포넌트)

```javascript
// Script
  data() {
    return {
      parentData: 'parent'
    }
  }
```

```html
<!-- template -->
<!-- :하위 컴포넌트에서 받을 속성 이름="상위 컴포넌트에서 내릴 데이터 이름" -->
  <child-component :propsData="parentData"></child-component>

```


데이터를 받을 컴포넌트 (하위 컴포넌트)

```javascript
// Script
  props: ['propsData']
```

```html
<!-- template -->
  <h1>{{ propsData }}</h1>

```

### emit

이벤트를 올릴 컴포넌트 (하위 컴포넌트)

```html
<!-- template -->
  <button @click="passEvent">click me</button>
```

```javascript
// Script
  methods: {
    passEvent() {
      this.emit('pass');
    }
  }
```

이벤트를 받을 컴포넌트 (상위 컴포넌트)

```html
<!-- template -->
<!-- @하위 컴포넌트에서 발생한 이벤트 이름="상위 컴포넌트에서 실행할 메서드 이름" -->
  <child-component @pass="logText"></child-component>

```

```javascript
// Script
  methods: {
    logText() {
      console.log('hi');
    }
  }
```

### 같은 레벨 컴포넌트 간의 통신

이벤트를 발생시키는 컴포넌트 (상위 컴포넌트의 하위 컴포넌트1)

상위 컴포넌트에 emit

```html
<!-- template -->
  <button @click="passEvent">click me</button>
```

```javascript
// Script
  methods: {
    passEvent() {
      this.emit('pass', 10);
    }
  }
```

이벤트를 받고, 프롭스를 내려 줄 컴포넌트 (상위 컴포넌트)

하위 컴포넌트1 에서 받은 이벤트를 data로 받고,

```javascript
// Script
  data() {
    return {
      nun: 10
    }
  }
  methods: {
    deliver(val) {
      this.num = val
    }
  }
```

하위 컴포넌트2로 내려준다.

```html
<!-- template -->
<!-- :하위 컴포넌트에서 받을 속성 이름="상위 컴포넌트에서 내릴 데이터 이름" -->
  <child-component :propsData="num"></child-component>
```

데이터를 받을 컴포넌트 (하위 컴포넌트2)

```javascript
// Script
  props: ['propsData']
```

```html
<!-- template -->
  <h1>{{ propsData }}</h1>

```

