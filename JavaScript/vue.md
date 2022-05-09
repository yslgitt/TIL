## Template Syntax

### Directive 

v- 접두사가 있는 특수 속성 (속성 값은 단일 JS 표현식이 됨 - v-for은 제외)

- 전달인자(Arguments) : ':'(콜론)을 통해 전달인자를 받을 수도 있음
- 수식어(Modifiers) : '.'(점)으로 표시되는 특수 접미사

```html
<form v-on:submit.prevent="onSubmit">...</form>
```



##### v-text

![image-20220508164741775](C:/Users/duhon/AppData/Roaming/Typora/typora-user-images/image-20220508164741775.png)



##### v-html

- 엘리먼트의 innerHTML을 업데이트 *(XSS 공격에 취약)*
- 임의로 사용자로부터 입력 받은 내용은 v-html에 **절대 사용 금지**

![image-20220508164954382](C:/Users/duhon/AppData/Roaming/Typora/typora-user-images/image-20220508164954382.png)



##### v-show

- 조건부 렌더링
  - 요소는 항상 렌더링되고 DOM에 남아있음 *- IF와 비슷하시만 차이점* 
  - 단순히 엘리먼트에 display CSS속성을 토글

![image-20220508165249651](C:/Users/duhon/AppData/Roaming/Typora/typora-user-images/image-20220508165249651.png)

> true만 보여지고, false는 display: none 처리 됨



##### v-if, v-else-if, v-else

- 조건부 렌더링
  - 조건에 따라 요소를 렌더링(directive의 표현식이 true일 때만 렌더링)
  - 엘리먼트 및 포함된 directive는 토글하는 동안 삭제되고 다시 작성됨

![image-20220508165836694](C:/Users/duhon/AppData/Roaming/Typora/typora-user-images/image-20220508165836694.png)

> B만 보여지고, 나머지는 다 사라짐



![image-20220508170116959](C:/Users/duhon/AppData/Roaming/Typora/typora-user-images/image-20220508170116959.png)



##### v-for

- 원본 데이터를 기반으로 엘리먼트 또는 템플릿 블록을  여러번 렌더링
- item in items 구문 사용
  - item 위치의 변수를 각 요소에서 사용할 수 있음 (객체의 경우 key)
  - 반드시 key 속성을 각 요소에 작성
- v-if와 함께 사용하는 경우, v-for가 우선순위 더 높음 (가능하면 동시사용 하지 않음)

![image-20220508180053462](C:/Users/duhon/AppData/Roaming/Typora/typora-user-images/image-20220508180053462.png)



##### v-bind

- HTML요소의 속성에 Vue의 상태 데이터를 값으로 할당
- Object 형태로 사용하면 value가 true인 key가 class 바인딩 값으로 할당
- 약어
  - : (콜론)
  - v-bind:href ➡ :href

![image-20220508180611785](C:/Users/duhon/AppData/Roaming/Typora/typora-user-images/image-20220508180611785.png)



##### v-on

- 엘리먼트에 이벤트 리스너를 연결
- 이벤트 유형은 전달인자로 표시
- 특정 이벤트 발생 시, 주어진 코드 실행
- 약어 
  - @
  - v-on:click ➡ @click

![image-20220508185334740](C:/Users/duhon/AppData/Roaming/Typora/typora-user-images/image-20220508185334740.png)



##### v-model

- HTML form 요소의 값과 data를 **양방향** 바인딩 

- 수식어

  - .lazy

    input 대신 change 이벤트 이후에 동기화

  - .number

    문자열을 숫자로 변경

  - .trim

    입력에 대한 trim을 진행

![image-20220508210951014](C:/Users/duhon/AppData/Roaming/Typora/typora-user-images/image-20220508210951014.png)



---------

##### computed

- 데이터를 기반으로하는 계산된 속성
- 함수의 형태로 정의하지만 함수가 아닌 함수의 반환 값이 바인딩
- 종속된 데이터에 따라 저장 > 종속된 데이터가 변경될 때만 함수 실행
  - 어떤 데이터에도 의존하지 않는 computed 속성의 경우 절대 업데이트 되지 않음
- 반드시 반환 값이 있어야 함

![image-20220508211657673](C:/Users/duhon/AppData/Roaming/Typora/typora-user-images/image-20220508211657673.png)

![image-20220508211610693](C:/Users/duhon/AppData/Roaming/Typora/typora-user-images/image-20220508211610693.png)

![image-20220508211903154](C:/Users/duhon/AppData/Roaming/Typora/typora-user-images/image-20220508211903154.png)

> methods: data를 바꾸는 로직 (setter) / computed: data를 통한 값을 얻음 (getter)



##### watch

- 데이터를 감시 - 변화가 일어났을 때 실행되는 함수

![image-20220508214434259](C:/Users/duhon/AppData/Roaming/Typora/typora-user-images/image-20220508214434259.png)



![image-20220508215409181](C:/Users/duhon/AppData/Roaming/Typora/typora-user-images/image-20220508215409181.png)

![image-20220508215427646](C:/Users/duhon/AppData/Roaming/Typora/typora-user-images/image-20220508215427646.png)

![image-20220508215500448](C:/Users/duhon/AppData/Roaming/Typora/typora-user-images/image-20220508215500448.png)



##### filters

- 텍스트 형식화를 적용활 수 있는 필터
- interpolation 혹은 v-bind를 이용할 때 사용 가능
- 필터는 자바스크립트 표현식 마지막에 '|'와 함께 추가되어야 함
- 이어서(chaining) 사용 가능

![image-20220508215839160](C:/Users/duhon/AppData/Roaming/Typora/typora-user-images/image-20220508215839160.png)





## Lifecycle Hooks

##### created

- vue 인스턴스가 생성된 후에 호출

![image-20220508220914097](C:/Users/duhon/AppData/Roaming/Typora/typora-user-images/image-20220508220914097.png)

애플리케이션의 초기 데이터를 API요청을 통해 불러올 수 있음