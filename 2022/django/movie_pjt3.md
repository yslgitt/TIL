# PJT08. DB 설계를 활용한 REST API 설계

👩🏻‍🤝‍👩🏻 페어: 권예슬, 박다빈



## 감상

### 진행 과정

1. 기본 틀(모델) 작성 (🚗:다빈, 🧭:예슬)

2. actor (🚗:예슬, 🧭:다빈)

3. movie (🚗:다빈, 🧭:예슬)

4. review (🚗:예슬, 🧭:다빈)

5. postman 확인 (🚗:다빈, 🧭:예슬)

   


### 새로 알게된 사실

```python
class ReviewSerializer(serializers.ModelSerializer):

    class MovieSerializer(serializers.ModelSerializer):

        class Meta:
            model = Movie
            fields = ('title',)

    movie = MovieSerializer(read_only=True)
    class Meta:
        model = Review
        fields = '__all__'
```

![image-20220422162045148](images/image-20220422162045148.png).

![image-20220422162103848](images/image-20220422162103848.png).

- 그냥 ReviewSerializer를 썼다면, 밑에와 같은  movie:7(pk)번호가 나오게 되는데, 

  movie를 Movieserializer에서 가져와서 새로 재정의 해주었기 때문에

  movie가 pk로 나오지 않고, Movie 모델에서 title 을 가져와서 출력해줄 수 있었다. !! 

  



### 오류

```python
from rest_framework import serializers
from movies.serializers.review import ReviewListSerializer
from ..models import Movie, Actor

class MovieSerializer(serializers.ModelSerializer):

    class Meta:
        model = Movie
        fields = ('title',)


class MovieListSerializer(serializers.ModelSerializer):
    class Meta:
        model = Movie
        fields = ('title', 'overview',)


class MovieDetailSerializer(serializers.ModelSerializer):
    
    class ActorListSerializer(serializers.ModelSerializer):
        class Meta:
            model = Actor
            fields = ('name',)
            
    actors = ActorListSerializer(many=True, read_only=True)
    review_set = ReviewListSerializer(many=True, read_only=True)

    class Meta:
        model = Movie
        fields = '__all__'
```

- serializer 폴더의 movie.py 에서

  `ActorListSerializer`를 import 해오는 과정에서 import 오류가 남.

  `교수님의 조언`

  **a -> b가 필요한데, b -> a가 필요하면 while True와 같은 상황이 발생함..**

  따라서 `ActorListSerializer`를 `MovieDetailSerializer`에 넣음으로써 해결할 수 있었다.

​	

➕

자잘한 실수가 꽤 있었다!  > 변수명 실수, '/' 실수, ''@api_view' 빠트리기... 등 등





### 페어 소감

- 역할을 번갈아 가며 진행하였다
- 시간별로 나누어 진행하지 않고, 코드를 작성하며 구역별로 역학을 나누어 진행하였는데 매우 효율적인 느낌!
- 모르는 부분을 페어와 함께 찾아나갈 수 있어 빠르게 해결할 수 있었다!
- 함께 해서 매우 즐겁다~





## 코드

- urls.py

  ```python
  from django.urls import path
  from . import views
  
  
  urlpatterns = [
      path('actors/', views.actor_list),
      path('actors/<int:actor_pk>', views.actor_detail),
      path('movies/', views.movie_list),
      path('movies/<int:movie_pk>', views.movie_detail),
      path('reviews/', views.review_list),
      path('reviews/<int:review_pk>', views.review_detail),
      path('movies/<int:movie_pk>/reviews', views.create_review),
  ]
  
  ```

  

- models.py

  ```python
  from django.db import models
  
  class Actor(models.Model):
      name = models.CharField(max_length=100)
  
  class Movie(models.Model):
      actors = models.ManyToManyField(Actor, related_name="movies")
      title = models.CharField(max_length=100)
      overview = models.TextField()
      release_date = models.DateTimeField()
      poster_path = models.TextField()
  
  class Review(models.Model):
      movie = models.ForeignKey(Movie, on_delete=models.CASCADE)
      title = models.CharField(max_length=100)
      content = models.TextField()
      
  ```



- views.py

  ```python
  from django.shortcuts import get_list_or_404, get_object_or_404, render
  
  
  
  from movies.serializers.actor import ActorListSerializer, ActorSerializer
  from movies.serializers.movie import MovieListSerializer, MovieDetailSerializer
  from movies.serializers.review import ReviewListSerializer, ReviewSerializer
  from .models import Actor, Movie, Review
  from rest_framework import status
  from rest_framework.decorators import api_view
  from rest_framework.response import Response
  # Create your views here.
  
  @api_view(['GET'])
  def actor_list(request):
      actors = get_list_or_404(Actor)
      serializer = ActorListSerializer(actors, many=True)
      return Response(serializer.data)
  
  @api_view(['GET'])
  def actor_detail(request, actor_pk):
      actor = get_object_or_404(Actor, pk=actor_pk)
      serializer = ActorSerializer(actor)
      return Response(serializer.data)
  
  
  
  @api_view(['GET'])
  def movie_list(request):
      movies = get_list_or_404(Movie)
      serializer = MovieListSerializer(movies, many=True)
      return Response(serializer.data)
  
  
  @api_view(['GET'])
  def movie_detail(request, movie_pk):
      movie = get_object_or_404(Movie, pk=movie_pk)
      serializer = MovieDetailSerializer(movie)
      return Response(serializer.data)
  
  @api_view(['GET'])
  def review_list(requset):
      reviews = get_list_or_404(Review)
      serializer = ReviewListSerializer(reviews, many=True)
      return Response(serializer.data)
  
  @api_view(['GET', 'DELETE', 'PUT'])
  def review_detail(request, review_pk):
      review = get_object_or_404(Review, pk=review_pk)
      if request.method == 'GET':
          serializer = ReviewSerializer(review)
          return Response(serializer.data)
  
      elif request.method == 'DELETE':
          review.delete()
          data = {
              'delete': f'데이터 {review_pk}번이 삭제되었습니다.',
          }
          return Response(data, status=status.HTTP_204_NO_CONTENT)
  
      elif request.method == 'PUT':
          serializer = ReviewSerializer(review, request.data)
          if serializer.is_valid(raise_exception=True):
              serializer.save()
              return Response(serializer.data)        
  
  @api_view(['POST'])
  def create_review(request, movie_pk):
      movie = get_object_or_404(Movie, pk=movie_pk)
      serializer = ReviewSerializer(data=request.data)
      if serializer.is_valid(raise_exception=True):
          serializer.save(movie=movie)
          return Response(serializer.data, status=status.HTTP_201_CREATED)
  
  
  ```

  

- serializers

  - actor.py

    ```python
    from movies.serializers.movie import MovieSerializer
    from rest_framework import serializers
    
    from ..models import Actor
    
    class ActorListSerializer(serializers.ModelSerializer):
    
        class Meta:
            model = Actor
            fields = '__all__'
    
    
    class ActorSerializer(serializers.ModelSerializer):
        movies = MovieSerializer(many=True, read_only=True)
        class Meta:
            model = Actor
            fields = '__all__'
    ```

    

  - movie.py

    ```python
    from rest_framework import serializers
    from movies.serializers.review import ReviewListSerializer
    ## a -> b가 필요한데, b -> a가 필요하면 while True 처럼 빙빙 돈다..
    from ..models import Movie, Actor
    
    class MovieSerializer(serializers.ModelSerializer):
    
        class Meta:
            model = Movie
            fields = ('title',)
    
    
    class MovieListSerializer(serializers.ModelSerializer):
        class Meta:
            model = Movie
            fields = ('title', 'overview',)
    
    
    
    
    class MovieDetailSerializer(serializers.ModelSerializer):
        class ActorListSerializer(serializers.ModelSerializer):
            class Meta:
                model = Actor
                fields = ('name',)
        actors = ActorListSerializer(many=True, read_only=True)
        review_set = ReviewListSerializer(many=True, read_only=True)
    
        class Meta:
            model = Movie
            fields = '__all__'
    ```

    

  - review.py

    ```python
    from rest_framework import serializers
    
    from ..models import Review, Movie
    
    
    
    class ReviewListSerializer(serializers.ModelSerializer):
    
        class Meta:
            model = Review
            fields = ('title','content',)
    
    
    
    class ReviewSerializer(serializers.ModelSerializer):
    
        class MovieSerializer(serializers.ModelSerializer):
    
            class Meta:
                model = Movie
                fields = ('title',)
    
        movie = MovieSerializer(read_only=True)
        class Meta:
            model = Review
            fields = '__all__'
            
           
    ```