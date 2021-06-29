# component_design_patterns

## 1. Common Approach

일반적인 접근 방식으로,
props로 내려주고 emit으로 올려주는 컴포넌트 통신을 사용

## 2. Component with Slots

슬롯을 이용한 컴포넌트 설계 방식으로
컴포넌트를 비교적 자유롭게 커스텀 할 수 있는 장점이 있다.

## 3. Controlled Component

checkbox를 예로,
상위 컴포넌트에서 v-model(기본적으로 :value, @input로 동작)로 하위 컴포넌트와 연결해 주고,
하위 컴포넌트(checkbox)에서는 props로 value를 받고, emit으로 input 이벤트를 올려서
하위에서 데이터를 조작하는 것이 아니라 상위 컴포넌트에서 하위 컴포넌트를 조작하는 형식으로
작은 컴포넌트 단위를 다룰 때 유용하다.

## 4. Renderless Component

표현을 하지 않는 컴포넌트로 데이터만을 가지고 v-slot (slot, scoped slot(2.6버전 이후에 지원하지 않을 예정))을
사용해서 하위 컴포넌트에서 상위 컴포넌트로 데이터를 받아 표현할 수 있는 형식
