# PJT09. 알고리즘을 적용한 서버 구성

👩🏻‍🤝‍👩🏻 페어: 권다솜, 권예슬



## 감상

### 진행 과정(🚗:드라이버, 🧭:네비게이터)

1. 기본 틀 작성 (🚗:예슬, 🧭:다솜)
2. 유저 팔로우 기능 작성 (🚗:예슬, 🧭:다솜)
3. 리뷰 좋아요 기능 작성 (🚗:다솜, 🧭:예슬)
4. movies app - 전체 영화 목록 조회 페이지 작성 [index,view] (🚗:예슬, 🧭:다솜)
5. movies app - 단일 영화 상세 조회 페이지 작성 [detail,view] (🚗:다솜, 🧭:예슬)
5. 영화 추천 기능 - random으로 영화 10개 추천 페이지 작성 (🚗:다솜, 🧭:예슬)



### 정체 구간

- movie의 index.html에서 axios url 주소
  - sol : 이전 프로젝트와 비교하며 맞는 값을 찾음 -> 이전 프로젝트는 `/accounts/${articlePk}/likes/` 였는데 해당 프로젝트에서 사용한 주소는 `/community/${reviewPk}/like/`로 변경함

- 장르 불러오기 (참조 방법이 어려웠음)
  - sol : 교수님 찬스 + 친구 찬스 -> view.py에서 `model.genres.all()`로 가져오고 detail.html에서 for문과 함께 `{{genre.name}}`으로 불러옴



### 페어 소감

- 예슬 
  - 오늘도 페어랑 함께해서 좋았다!
  - 아이디어 내는 것도 쉽지 않고.. 복습이 많이 필요할 것 같음!
- 다솜

  - 그 동안 프로젝트 팀원은 개인이 하던 코드여서 막히는 부분에  도움을 줄 수 없었지만 이번엔 처음부터 함께해 작게라도 도움이 되어 좋았다.
  - 창작의 고통은 그 어떤 것보다 아팠다,,,
  - 생각보다 시간이 오래걸렸고, 신경써야하는 부분이 많았다.

## 코드

### movies

- views.py

  ```python
  from django.shortcuts import get_object_or_404, render
  from django.views.decorators.http import require_safe
  from .models import Movie, Genre
  from django.core.paginator import Paginator
  
  # Create your views here.
  @require_safe
  def index(request):
      movies = Movie.objects.all()
      paginator = Paginator(movies, 10)
  
      page_number = request.GET.get('page')
      page_obj = paginator.get_page(page_number)
  
      context = {
          'movies' : page_obj,
      }
      return render(request, 'movies/index.html', context)
  
  
  @require_safe
  def detail(request, movie_pk):
      movie = Movie.objects.get(pk=movie_pk)
      genres = movie.genres.all()
      context = {
          'movie' : movie,
          'genres' : genres,
  
      }
      return render(request, 'movies/detail.html', context)
  
  @require_safe
  def recommended(request):
      movies = Movie.objects.order_by('?')[:10]
  
      context = {
          'movies': movies
      }
      return render(request,'movies/recommended.html',context)
  ```

- index.html

  ```html
  {% extends 'base.html' %}
  
  {% block content %}
    <h1>Community</h1>
    <hr>
    {% for review in reviews %}
      <p>작성자 : <a href="{% url 'accounts:profile' review.user.username %}">{{ review.user }}</a></p>
      <p>글 번호: {{ review.pk }}</p>
      <p>글 제목: {{ review.title }}</p>
      <p>글 내용: {{ review.content }}</p>
      <form class="d-inline" data-review-pk="{{ review.pk }}">
        {% if user in review.like_users.all %}
          <button id="button-{{ review.pk }}">좋아요 취소</button>
        {% else %}
          <button id="button-{{ review.pk }}">좋아요</button>
        {% endif %}
      </form>
      <p id="cnt-{{ review.pk }}">{{ review.like_users.all|length }} 명이 이 글을 좋아합니다.</p>
      <a href="{% url 'community:detail' review.pk %}">[detail]</a>
      <hr>
    {% endfor %}
    <script src="https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js"></script>
    <script>
      const forms = document.querySelectorAll('.d-inline')
      const csrftoken = document.querySelector('[name=csrfmiddlewaretoken]').value
  
      forms.forEach(form => {
        form.addEventListener('submit',function(event){
          event.preventDefault()
          const reviewPk = event.target.dataset.reviewPk
  
          axios({
            method : 'post',
            url : `/community/${reviewPk}/like/`,
            headers : {
            'X-CSRFToken' : csrftoken
              }
          })
          .then(res => {
            const liked = res.data.liked
            const likeCnt = res.data.like_cnt
            const p = document.querySelector(`#cnt-${reviewPk}`)
  
            p.innerText = `${likeCnt} 명이 이 글을 좋아합니다.`
  
            const button = document.querySelector(`#button-${reviewPk}`)
            if (liked === true){
              button.innerText = '좋아요 취소'
            } else {
              button.innerText = '좋아요'
            }
          })
        })
      })
    </script>
  {% endblock %}
  ```

- detail.html

  ```html
  {% extends 'base.html' %}
  
  {% block content %}
  
    <h2 class="text-center">DETAIL</h2>
    <h3>{{ movie.pk }} 번째 글</h3>
    <hr>
    <img src="{{ movie.poster_path }}" alt="poster">
    <p>제목: {{ movie.title }}</p>
    <p>평점: {{ movie.vote_average }}</p>
    <p>관객수: {{ movie.popularity }}</p>
    <p>개봉날짜: {{ movie.release_date }}</p>
    <p>장르: 
    {% for genre in genres %}
      {{ genre.name }}
    {% endfor %}
    </p>
    <p>내용: {{ movie.overview }}</p>
  
    <hr>
  
    <a href="{% url 'movies:index' %}">[back]</a>
    <a href="{% url 'movies:recommended' %}">[recommend]</a>
  {% endblock %}
  ```

- recommended.html

  ```html
  {% extends 'base.html' %}
  
  {% block content %}
  <br>
  <h1>영화 추천</h1>
  <hr>
  {% for movie in movies %}
    <p>{{ movie.title }}</p>
    <p>{{ movie.vote_average }}</p>
    <p>{{ movie.release_date }}</p>
    <a href="{% url 'movies:detail' movie.pk %}">movie detail page</a>
    <hr>
  {% endfor %}
  {% endblock %}
  ```

### accounts

- views.py : 팔로우

  ```python
  @require_POST
  def follow(request, user_pk):
      if request.user.is_authenticated:
          person = get_object_or_404(get_user_model(), pk=user_pk)
          user = request.user
  
          if person != user:
              if person.followers.filter(pk=user.pk).exists():
                  person.followers.remove(user)
                  followed = False
              else:
                  person.followers.add(user)
                  followed = True
              context = {
                  'followed' : followed,
                  'follower_cnt' : person.followers.count(),
                  'following_cnt' : person.followings.count(),
              }
          return JsonResponse(context)
      return redirect('accounts:login')
  ```

- profile.html

  ```html
  {% extends 'base.html' %}
  
  {% block content %}
    <h1>{{ person.username }}의 프로필 페이지</h1>
    {% with followings=person.followings.all followers=person.followers.all %}
      <div>
        <div id="follow-cnt">
          팔로잉 : {{ followings|length }} / 팔로워 : {{ followers|length }}
        </div>
        {% if request.user != person %}
          <div>
            <form data-person-pk="{{ person.pk }}" id="follow-form">
              {% if request.user in followers %}
                <button id="followBtn">언팔로우</button>
              {% else %}
                <button id="followBtn">팔로우</button>
              {% endif %}
            </form>
          </div>
        {% endif %}
      </div>
    {% endwith %}
    <script src="https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js"></script>
    <script>
      const form = document.querySelector('#follow-form')
      const personPK = form.dataset.personPk
      const csrftoken = document.querySelector('[name=csrfmiddlewaretoken]').value
  
      form.addEventListener('submit', function(event){
        event.preventDefault()
        axios({
          method:'post',
          url: `/accounts/${personPK}/follow/`,
          headers: {
            'X-CSRFToken' : csrftoken
          }        
        })
        .then(res=> {
          const followed = res.data.followed
          const button = document.querySelector('button')
          if (followed === true){
            button.innerText = '언팔로우'
          } else {
            button.innerText = '팔로우'
          }
          const followCnt = document.querySelector('#follow-cnt')
          const followerCnt = res.data.follower_cnt
          const followingCnt = res.data.following_cnt
          followCnt.innerText = `팔로잉 : ${followingCnt} / 팔로워 : ${followerCnt}` 
        })
      })
    </script>
  {% endblock %}
  ```

### community

- views.py

  ```python
  @require_POST
  def like(request, review_pk):
      if request.user.is_authenticated:
          review = get_object_or_404(Review, pk=review_pk)
          user = request.user
  
          if review.like_users.filter(pk=user.pk).exists():
              review.like_users.remove(user)
              liked = False
          else:
              review.like_users.add(user)
              liked = True
          context = {
              'liked' : liked,
              'like_cnt' : review.like_users.count()
          }
          return JsonResponse(context)
      return redirect('accounts:login')
  ```

- index.html

  ```html
  {% extends 'base.html' %}
  
  {% block content %}
    <h1>Community</h1>
    <hr>
    {% for review in reviews %}
      <p>작성자 : <a href="{% url 'accounts:profile' review.user.username %}">{{ review.user }}</a></p>
      <p>글 번호: {{ review.pk }}</p>
      <p>글 제목: {{ review.title }}</p>
      <p>글 내용: {{ review.content }}</p>
      <form class="d-inline" data-review-pk="{{ review.pk }}">
        {% if user in review.like_users.all %}
          <button id="button-{{ review.pk }}">좋아요 취소</button>
        {% else %}
          <button id="button-{{ review.pk }}">좋아요</button>
        {% endif %}
      </form>
      <p id="cnt-{{ review.pk }}">{{ review.like_users.all|length }} 명이 이 글을 좋아합니다.</p>
      <a href="{% url 'community:detail' review.pk %}">[detail]</a>
      <hr>
    {% endfor %}
    <script src="https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js"></script>
    <script>
      const forms = document.querySelectorAll('.d-inline')
      const csrftoken = document.querySelector('[name=csrfmiddlewaretoken]').value
  
      forms.forEach(form => {
        form.addEventListener('submit',function(event){
          event.preventDefault()
          const reviewPk = event.target.dataset.reviewPk
  
          axios({
            method : 'post',
            url : `/community/${reviewPk}/like/`,
            headers : {
            'X-CSRFToken' : csrftoken
              }
          })
          .then(res => {
            const liked = res.data.liked
            const likeCnt = res.data.like_cnt
            const p = document.querySelector(`#cnt-${reviewPk}`)
  
            p.innerText = `${likeCnt} 명이 이 글을 좋아합니다.`
  
            const button = document.querySelector(`#button-${reviewPk}`)
            if (liked === true){
              button.innerText = '좋아요 취소'
            } else {
              button.innerText = '좋아요'
            }
          })
        })
      })
    </script>
  {% endblock %}
  ```