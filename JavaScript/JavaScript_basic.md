### 변수 선언 키워드(let, const, var)

- **let** (**재할당 할 예정인** 변수 선언 시 사용 / 변수 재선언 불가능 / 블록 스코프)
- **const** (**재할당 할 예정 없는** 변수 선언 시 사용/ 변수 재선언 불가능 / 블록 스코프)
- var (재선언, 재할당 모두 가능 / 호이스팅 되는 특성 > 문제 발생 > *잘 쓰지 않음* / 함수 스코프 )
  - 호이스팅 : 변수를 선언 이전에 참조할 수 있는 현상 > undefined 반환



### 데이터 타입

- 원시 타입 (객체(object)가 아닌 기본 타입 / 변수에 해당 타입의 값이 담김 / 복사 시 실제 값 복사)

  - 숫자 타입

    - 계산 불가능 한 경우 > NaN 반환

  - 문자열 타입

    - 템플릿 리터럴

      ```javascript
      const fullName = `${firstName} ${lastNane}`
      ```

  - undefine (값이 없음 > 아무 값도 할당하지 않으면 자동 할당)

  - null (값이 없음을 의도적 표현)

    - 원시 타입이지만 typeof 사용할 때 object가 나옴

  - Boolean 타입 (true / false)

- 참조 타입 (객체(object)의 자료형, 변수에 해당 객체의 참조 값이 담김, 복사 시 참조 값 복사)

  - 함수, 배열, 객체 ..



### 연산자

- 할당 연산자

- 비교 연산자

  - 동등 비교 연산자 == *(특별한 경우를 제외하고 사용 X)*

    암묵적 타입 변환을 통해 타입을 일치 시킨 후 **값** 비교

    피연산자가 모두 객체일 경우 메모리의 같은 객체를 바라보는지 판별

  - 일치 비교 연산자 ===

    엄격한 비교, 암묵적 타입 변환이 발생하지 않아 **타입과 값** 모두 비교

    피연산자가 모두 객체일 경우 메모리의 같은 객체를 바라보는지 판별

- 논리 연산자 (&& : and / || : or / ! : not)

- 삼항 연산자

  왼쪽 조건식이 참이면 콜론(:) 앞의 값을 사용하고, 그렇지 않으면 콜론(:) 뒤의 값을 사용

  변수 할당 가능, 한 줄 표기 권장

  

### 조건문

- **if** statement - 조건: 소괄호(), 실행 코드: 중괄호{}

  ```javascript
  const nation = 'Korea'
  
  if (nation === 'Korea'){
      console.log('안녕하세요!')
  } else if (nation === 'France'){
      console.log('Bonjour!')
  } else {
      console.log('Hello!')
  }
  ```

- **switch** statement 

  - break문이 없는 경우 break문을 만나거나 default문을 실행할 때까지 다음 조건문 실행

  ```javascript
  const nation = 'Korea'
  switch(nation) {
      case 'korea':{
          console.log('안녕하세요!')
          break
      }
      case 'France':{
          console.log('Bonjour!')
          break
      }
      default: {
          console.log('Hello!')
      }
  }
  // break가 없으면 모두 출력
  ```

### 반복문

- while - 조건: 소괄호(), 실행 코드: 중괄호{}

  ```javascript
  let i = 0
  while (i<6) {
  	console.log(i)
      i += 1
  }
  ```

- for - 세미콜론(;)으로 구분되는 세 부분으로 구성 > initialization, condition, expression

  ```javascript
  for (let i = 0; i < 6; i++) {
  	console.log(i)
  }
  ```

- for ... in

  - 객체의 속성들을 순회할 때 사용 (객체 - key, value로 이루어진 자료구조)
  - 배열도 순회 가능하지만 인덱스 순으로 순회한다는 보장이 없어 권장하지 않음

  ```javascript
  const capitals = {
      korea : 'seoul',
      france : 'paris',
      USA : 'washington D.C'
  }
  for (let capital in capitas){
      console.log(capital) // korea, frace, USA
  }
  
  // for ... of 일 경우 에러
  ```

  

- for ... of

  - 반복 가능한 객체를 순회하며 값을 꺼낼 때 사용
    - 반복 가능한 객체의 종류: Array, Map, Set, String 등

  ```javascript
  const fruits = ['딸기', '바나나', '메론']
  for (let fruit of fruits) {
      fruit = fruit + '!'
      console.log(fruit)
  }
  
  // for ... in 일 경우 0, 1, 2 이런식으로 나옴
  ```

  

### 함수

- 매개변수와 인자의 개수 불일치 허용

- 함수 선언식 - 호이스팅 O

  ```javascript
  function name(args) {
  	// do something
  }
  ```

- 함수 표현식 - *이름 생략  가능*, 호이스팅 X

  ```javascript
  const name = function(args) {
  	// do sometion
  }
  ```



- Rest Parameter(...)

  함수가 정해지지 않은 수의 매개변수를 배열로 받음 (파이썬 *와 유사)

  ```javascript
  const restOpr = function (arg1, arg2, ...restArgs){
      return [arg1, arg2, restArgs]
  }
  restOpr(1,2,3,4,5) // [1,2,[3,4,5]]
  restOpr(1,2) // [1,2,[]]
  ```

- Spread operator

  배열 인자를 전개하여 전달 가능

  ```javascript
  const spreadOpr = function(arg1, arg2, arg3){
      return arg1 + arg2 + arg3
  }
  const numbers = [1,2,3]
  spreadOpr(...numbers) // 6
  ```

  ```javascript
  const array = [1,2,3]
  const newArray = [0, ...array, 4]
  
  console.log(newArray) // [0,1,2,3,4]
  // 얕은 복사에 활용 가능
  ```

  



#### ➡ 화살표 함수

- function 생략 가능
- 매개 변수가 하나 뿐이라면 '()'

- 몸통 표현식이 하나라면 '{}', return 도 생략 가능

```javascript
const arrow1 = function(name){
    return `hello, ${name}`
}

const arrow2 = (name) => { return `hello, ${name}` }
const arrow3 = name => { return `hello, ${name}` }
const arrow4 = name => `hello, ${name}`
```



### 문자열(string)

- includes : 특정 문자열의 존재여부를 참/ 거짓으로 반환

- split : 문자열을 토큰 기준으로 나눈 배열 반환

  ```javascript
  const str = 'a cup'
  str.split() // ['a cup']
  str.split('') // ['a',' ', 'c', 'u', 'p']
  str.split(' ') // ['a', 'cup']
  ```

- replace : 해당 문자열을 대상 문자열로 교체하여 반환

  ```javascript
  const str = 'a b c d'
  str.replace(' ', '-') // 'a-b c d'
  str.replaceAll(' ', '-') // 'a-b-c-d'
  ```

- trim : 문자열의 좌우 공백 제거하여 반환

  ```javascript
  const str = '  hello   '
  
  str.trim() // 'hello'
  str.trimStart() // 'hello  '
  str.trimEnd() // '  hello'
  ```



### 배열(array)

- 배열의 길이는 array. length 형태로 접근

  *배열의 마지막 원소는 array.length -1로 접근*



#### 기초 메서드

- reverse : 원본 배열의 요소들의 순서를 반대로 정렬

  ```javascript
  const numbers = [1,2,3,4,5]
  numbers.reverse()
  console.log(numbers)
  ```

- push : 배열 가장 뒤에 요소 추가

- pop : 배열의 가장 마지막 요소 제거

- unshift : 배열의 가장 앞에 요소 추가

-  shift : 배열의 가장 앞 요소 제거

- includes : 특정 값이 존재하는지 판별 후 참 또는 거짓 반환

- indexOf : 특정 값이 존재하는지 확인 후 가장 첫번째로 찾은 요소 인덱스 반환, 없을 경우 -1 반환

- join : 배열의 모든 요소를 연결하여 반환 (생략시 쉼표가 기본값)



#### 심화 메서드

- forEach

  배열의 각 요소에 대해 콜백 함수를 한번씩 실행 (반환 값 없음)

  ```javascript
  array.forEach((element, index, array) => {})
  ```

  ```javascript
  const fruits = ['딸기', '수박', '사과', '체리']
  fruits.forEach((fruit, index) => {
      console.log(fruit, index)
      // 딸기 0
      // 수박 1
      // 사과 2
      // 체리 3
  })
  ```

  

- map

  콜백 함수의 반환 값을 요소로하는 새로운 배열 반환

- filter

  콜백 함수의 반환 값이 참인 요소들만 모아서 새로운 배열 반환

- reduce

  콜백 함수의 반환 값들을 하나의 값에 누적후 반환

- find

  콜백 함수의 반환 값이 참이면 해당 요소를 반환

- some

  배열의 요소 중 하나라도 판별함수를 통과하면 참을 반환

- every

  배열의 모든 요소가 판별함수를 통과하면 참을 반환