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

  - 동등 비교 연산자 *(특별한 경우를 제외하고 사용 X)*

    암묵적 타입 변환을 통해 타입을 일치 시킨 후 **값** 비교

    피연산자가 모두 객체일 경우 메모리의 같은 객체를 바라보는지 판별

  - 일치 비교 연산자

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
  ```

  

