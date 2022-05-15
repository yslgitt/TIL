# Django PJT_10

#### 대전 3반 권예슬 김동신

>  ### Vue를 활용한 SPA 구성

> > #### 프로젝트 목표
> >
> > - 영화 정보를 제공하는 SPA 제작 
> > - AJAX통신과 JSON 구조에 대한 이해 
> > - Single File Component 구조에 대한 이해 
> > - vue-cli, vuex, vue-router등 플러그인 활용

#### 

## 🔨 기본 틀 구성

#### 컴포넌트 구조 확인

- 부모 자식 컴포넌트 간의 관계 연결 방법 결정
  - Vuex 사용 여부 결정을 위해 컴포넌트 구조 탐색
  - props와 emit 만으로 데이터를 주고 받기에는 어려울 것이라 판단되어 Vuex를 사용하기로 결정
  - 단, 필요한 경우 props 사용




### Router 

- HomeView, RandomeView, WatchListView 세 개의 컴포넌트 간 화면 전환을 위한 router 설정 필요(명세서 확인)
- 명세서에 명시된대로 path를 지정하여 각각의 route 객체 생성
- APP.vue 내에서 router-link 태그를 활용하여 각 페이지로 이동할 수 있는 요소 생성
  - bootstrap의 navbar 요소를 활용하여 요구된 배경색 및 틀 구현



## :key: API 받아오기

- tmdb 로부터 영화 데이터를 받아오기 위한 API 관련 로직 구현
- API_KEY 보안을 위해 env 파일 생성
- getMovies 메서드 생성
  - axios를 활용하여 API 데이터 요청
  - 성공적으로 받아왔을 경우 store의 getMovie action 수행
- getMovie action은 받아온 영화 데이터를 state내 movies 배열에 삽입하는 GET_MOVIES mutation 호출
- 마지막으로 Life Cycle Hook을 이용하여 created에 getMovie 메서드를 넣어줌
- 인스턴스가 생성됐을 경우 API 관련 메서드들을 이용하여 영화 데이터를 tmdb로부터 받아옴



#### code (App.vue)

```vue
<template>
  <div>
    <nav class="navbar navbar-expand-lg navbar-light mb-5" style="background-color: #e3f2fd;">
      <div class="container-fluid">
        <a class="navbar-brand" href="#">SSAFY</a>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse justify-content-end" id="navbarNavAltMarkup">
          <div class="navbar-nav">
            <router-link :to="{ name: 'home' }" class='mx-3'>HOME</router-link> |
            <router-link :to="{ name: 'random' }" class='mx-3'>RANDOM</router-link> |
            <router-link :to="{ name: 'watchlist' }" class='mx-3'>WATCHLIST</router-link>
          </div>
        </div>
      </div>
    </nav>
    <router-view/>
  </div>

</template>


<script>
const API_URL = "https://api.themoviedb.org/3/movie/top_rated"
const API_KEY = process.env.VUE_APP_TMDB_API_KEY
import axios from 'axios'

export default {
  name: 'App',
  components: {
    
  },
  data(){},
  methods: {
    getMovies () {
      const params = {
        api_key : API_KEY,
        region : 'KR',
        language : 'ko-KR',
      }
      axios({
        method:'get',
        url : API_URL,
        params
    }).then(res => {
      this.$store.dispatch('getMovie', res.data.results)
    })
    }
  },
created(){
  this.getMovies()
}
}
</script>
```





## :house_with_garden: Home 페이지

### HomeView

- MovieCard 컴포넌트와 부모-자식 관계임을 주어진 명세의 컴포넌트 구조로 확인
- 따라서, MovieCard 컴포넌트를 불러와 등록 후 출력하는 과정 구현

- MovieCard 컴포넌트는 개별 영화 데이터를 표시하는 컴포넌트이므로 HomeView 컴포넌트에서 반복문을 활용하여 각각의 컴포넌트를 생성하기로 결정

- 영화 데이터 받아오기
  - 페이지 로드시 APP.vue의 created로 인해 영화 데이터가 state에 등록되어있음
  - state의 데이터이므로 computed로 데이터를 받아서 movies 변수에 할당
- 영화 정보들이 들어있는 movies를 v-for를 활용하여 각각의 영화 데이터를 MovieCard 컴포넌트로 전달
- 영화카드가 viewport의 크기에 따라 출력되는 개수가 다르도록 grid system 적용



#### code

```vue
<template>
  <div>
     <div class='container'>
        <div class='row justify-content-center mx-5'>
         <movie-card
         v-for="movie in movies"
         :key="movie.id"
         :movie="movie"
         class='col-12 col-sm-6 col-lg-3 mb-5 mx-1'
         ></movie-card> 
        </div> 
     </div>
  </div>   
</template>

<script>
import MovieCard from "@/components/MovieCard.vue"

export default {
   name: "HomeView",
   components: {
      MovieCard,
   },
   computed: { 
      movies(){
      return this.$store.state.movies
   }}
}
</script>
```



### MovieCard

- HomeView에서 전송한 데이터를 props를 통해 수신
- 전달받은 데이터를 bootstrap card의 title과 content 부분에 출력
- 카드 내에서 이미지를 출력하기 위해서는 이미지를 불러올 수 있는 URL 필요
- 직접 img 태그 src 속성에 전체 주소를 기입할 수 있으나 코드의 가독성을 위해 computed 활용
  - tmdb에서 img를 불러오는 baseUrl을 지정
  - 영화별로 다른 포스터 주소를 videoId에 할당
  - 이후 최종 반환값은 두 주소를 더한 값
- src 속성에 v-bind를 활용하여 이미지 URL 지정

- 카드 내에서 전체 줄거리가 아닌 줄거리의 3~4줄만 출력되도록 하기 위해 따로 style 지정

  - 지정한 줄만큼만 내용이 출력되도록 하는 말줄임 스타일

    ```css
    p {
       overflow: hidden;
       text-overflow: ellipsis;
       display: -webkit-box;
       -webkit-line-clamp: 4;
       -webkit-box-orient: vertical;
    }
    ```



#### code

```vue
<template>
  <div>
    <div class="card">
      <img :src="imgUrl" class="card-img-top" alt="POSTER">
      <div class="card-body">
        <h5 class="card-title">{{ movie.title }}</h5>
        <p class="card-text">{{ movie.overview }}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default{
  name: "MovieCard",
  props: {
    movie : Object
  },
  computed: {
    imgUrl(){
      const baseUrl = "https://image.tmdb.org/t/p/w500"
      const videoId = this.movie.poster_path
      return baseUrl + videoId
    }
  }
} 
</script>

<style>
  p {
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 4;
    -webkit-box-orient: vertical;
  }
</style>
```



## :star: Random 페이지

### RandomView

- 랜덤 불러오기

  - pickMovie 메서드를 만들어 PICK버튼을 누르면 랜덤으로 영화를 불러옴

    - lodash의 sample 활용

      `import _ from 'lodash'` >>  `this.movie = _.sample(this.$store.state.movies)`

  - data에  `seen: false` 항목을 추가하여 PICK 버튼을 누르기 전까진 아무것도 보이지 않게 함

    PICK버튼을 눌러야 `seen: True`가 되고 영화가 보여짐

- 이미지 불러오기

  - ```vue
    computed: {
      imgUrl(){
        const baseUrl = "https://image.tmdb.org/t/p/w500"
        const videoId = this.movie.poster_path
        return baseUrl + videoId
      }
    }
    }
    ```

    위와 같이 이미지 URL을 만들어 `<img :src="imgUrl" class="card-img-top" alt="...">`에 쏙 넣어주기!



#### code

```vue
<template>
  <div class="d-flex flex-column justify-content-center">
    <button class="btn btn-success mx-auto" style="width: 18rem;" @click="pickMovie">PICK</button>
    <div v-if="seen">
      <div class="card mx-auto" style="width: 18rem;">
        <img :src="imgUrl" class="card-img-top" alt="...">
        <div class="card-body">
          <h5 class="card-title">{{ movie.title }}</h5>
          <p class="card-text">{{ movie.overview }}</p>
        </div>
      </div>
    </div>
    <div v-else>
      <div class="card mx-auto text-center" style="width: 18rem; height: 18rem; font-family: Avenir, Helvetica, Arial, sans-serif;">
        <p class="my-auto">Pick a MOVIE</p>      
      </div>
    </div>
  </div>
</template>

<script>
import _ from 'lodash' 
export default {
  name: 'RandomView',
  data() {
    return {
      movie: [],
      seen: false
    }
  },
  methods:{
    pickMovie(){
      this.seen = true
      this.movie = _.sample(this.$store.state.movies)
    }
  },
  computed: {
    imgUrl(){
      const baseUrl = "https://image.tmdb.org/t/p/w500"
      const videoId = this.movie.poster_path
      return baseUrl + videoId
    }
  }
  }
</script>
```



## :tv: Watch 페이지

### WatchListForm

- 입력창에 영화 제목 입력 받기

  - `@keyup.enter`, `@click` 이벤트를 만들어 `inputMovie`메서드 실행

    ```vue
      methods: {
        inputMovie: function() {
          const inputValue = document.querySelector('#input')
          const movieTitle = inputValue.value.trim()
          if (movieTitle) {
            this.$store.dispatch('createWatchList', movieTitle)
          }
          inputValue.value = '' //검색창 비우기
        }
      }
    ```

    - movieTitle이 있을 경우, `createWatchList` 액션 실행 > `CREATE_WATCH_LIST` 뮤테이션 실행

      ```javascript
       //store > index.js
        actions: {
      
          createWatchList : function (context, movieTitle) {
            context.commit('CREATE_WATCH_LIST', movieTitle)
          }
        }
      ```

      ```javascript
      //store > index.js
        mutations: {
      
          CREATE_WATCH_LIST : function (state, movieTitle) {
            state.watchlist.push(movieTitle)
          }
        },
      ```

      ```javascript
      //store > index.js
        state: {
            
          watchlist: [],
        },
      ```




#### code

```vue
<template>
  <div class="mx-5 rounded-3" style="background-color: #e3f2fd;">
    <br>
    <br>
    <div class="text-center">
      <h1 class="fw-bold">My Movie List</h1>
    </div>    
    <div class="d-flex justify-content-center my-3">
      <input type="text" @keyup.enter="inputMovie" id='input'>
      <button class="btn btn-secondary" @click="inputMovie">Add</button>
    </div>
    <br>
    <br>
  </div>
</template>

<script>
export default {
  name: 'WatchListForm',
  methods: {
    inputMovie: function() {
      const inputValue = document.querySelector('#input')
      const movieTitle = inputValue.value.trim()
      if (movieTitle) {
        this.$store.dispatch('createWatchList', movieTitle)
      }
      inputValue.value = ''
    }
  }
}
</script>
```



### WatchListView

- WatchListItem.vue로 watchlist 데이터 넘겨주기

  - components에 `WatchListItem` 추가 > store/state에 있는 데이터 불러오기 > v-for 사용하여 데이터 하나씩 뽑아옴

    ```vue
      data(){
        return {
          todos : this.$store.state.watchlist
        }
      }
    ```

    ```vue
          <watch-list-item 
          v-for="todo in todos"
          :key='todo'
          :todo='todo'
          >  
          </watch-list-item>
    ```




#### code

```vue
<template>
  <div>
    <watch-list-form></watch-list-form>
    <ul>
      <watch-list-item 
      v-for="todo in todos"
      :key='todo'
      :todo='todo'
      >  
      </watch-list-item>
    </ul>
  </div>

</template>

<script>
import WatchListForm from '@/components/WatchListForm.vue'
import WatchListItem from '@/components/WatchListItem.vue'

export default {
  name : 'WatchList',
  components : {
    WatchListForm,
    WatchListItem
  },
  data(){
    return {
      todos : this.$store.state.watchlist
    }
  }
}
</script>

<style>

</style>
```



### WatchListItem

- WatichListView에서 todo 넘겨받기

  ```vue
    props: {
      todo:String
    }
  ```

- CSS - 스트라이프 패턴 배경 출력

  ```Vue
  <template>
    <li class="ms-3 me-5 py-2 text-center" style="list-style:none;">
    
      {{ todo }}  
      
    </li>
  </template>
  ```

  ``` VUE
  <style>
    ul > li:nth-child(2n-1){
      background-color:whitesmoke;
    }
    ul > li:nth-child(2n){
      background-color: lightgray;
    }
  </style>
  ```

  - 홀,짝 나누어 색 지정!



#### code

```vue
<template>
  <li class="ms-3 me-5 py-2 text-center" style="list-style:none;">
    {{ todo }}      
  </li>
</template>

<script>
export default {
  name: 'WatchListItem',
  props: {
    todo:String
  }
}
</script>

<style>
  ul > li:nth-child(2n-1){
    background-color:whitesmoke;
  }
  ul > li:nth-child(2n){
    background-color: lightgray;
  }
</style>
```




