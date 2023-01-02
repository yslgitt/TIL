# 프레임워크 기반 웹 페이지 구현

## models.py

```python
from django.db import models

# Create your models here.

class Movie(models.Model):
    title = models.CharField(max_length=20)
    audience = models.IntegerField()
    release_date = models.DateField()
    genre = models.CharField(max_length=30)
    score = models.FloatField()
    poster_url = models.TextField()
    description = models.TextField()
```



## urls.py

```python
from django.urls import path
from . import views

app_name='movies'
urlpatterns = [
    path('', views.index, name='index'),
    path('new/', views.new, name='new'),
    path('create/', views.create, name='create'),
    path('<int:pk>', views.detail, name='detail'),
    path('<int:pk>/edit/', views.edit, name='edit'),
    path('<int:pk>/update/',views.update, name='update'),
    path('<int:pk>/delete/',views.delete, name='delete'),

]
```



## views.py

```python
from django.shortcuts import render,redirect
from .models import Movie

# Create your views here.

def index(request):
    movies = Movie.objects.all()[::-1]
    context = {
        'movies' : movies
    }
    return render(request,'movies/index.html', context)

def new(request):
    return render(request,'movies/new.html')

def create(request):
    title = request.POST.get('title')
    audience = request.POST.get('audience')
    release_date = request.POST.get('release_date')
    genre = request.POST.get('genre')
    score = request.POST.get('score')
    poster_url = request.POST.get('poster_url')
    description = request.POST.get('description')

    movie = Movie()
    movie.title = title
    movie.audience = audience
    movie.release_date = release_date
    movie.genre = genre
    movie.score = score
    movie.poster_url = poster_url
    movie.description = description
    movie.save()

    return redirect('movies:detail', movie.pk)

def detail(request, pk):
    movie = Movie.objects.get(pk=pk)
    context = {
        'movie' : movie,
    }
    return render(request, 'movies/detail.html', context)

def edit(request, pk):
    movie = Movie.objects.get(pk=pk)
    genres = ['코미디', '액션', '호러']
    context = {
        'movie': movie,
        'genres': genres,
    }

    return render(request, 'movies/edit.html', context)

def update(request, pk):
    movie = Movie.objects.get(pk=pk)
    if request.method == 'POST':
        movie.title = request.POST.get('title')
        movie.audience = request.POST.get('audience')
        movie.release_date = request.POST.get('release_date')
        movie.genre = request.POST.get('genre')
        movie.score = request.POST.get('score')
        movie.poster_url = request.POST.get('poster_url')
        movie.description = request.POST.get('description')
        movie.save()

    return redirect('movies:detail', movie.pk)

def delete(request, pk):
    movie = Movie.objects.get(pk=pk)
    if request.method == 'POST':
        movie.delete()
        return redirect('movies:index')
    else:
        return redirect('movies:detail', movie.pk)
```

#### 📍 point

- edit 경우, 장르 value 고정을 위해 장르들을 list로 미리 정의해주었다. 





## templates

### indext.html

```html
{% extends 'base.html' %}

{% block content %}
  <h1>INDEX</h1>
  
  <a href="{% url 'movies:new' %}">NEW</a>
  <hr>
  {% for movie in movies %}
    <a href="{% url 'movies:detail' movie.pk %}">{{ movie.title }}</a>
    <p> {{movie.score}} </p>
  
  {% endfor %}


{% endblock content %}
```



### new.html

```python
{% extends 'base.html' %}

{% block content %}
  <h1>NEW</h1>
  <hr>

  <form action="{% url 'movies:create' %}" method="POST">
    {% csrf_token %}
    <label for="title">TITLE:</label>
    <input type="text" name="title" id="title" min="0">
    <br>

    <label for="audience">AUDIENCE:</label>
    <input type="number" name="audience" id="audience">
    <br>

    <label for="release_date">RELEASE_DATE:</label>
    <input type="date" name="release_date" id="release_date">
    <br>

    <label for="genre">GENRE:</label>
    <select name="genre" id="genre">
      <option value="드라마">드라마</option>
      <option value="호러">호러</option>
      <option value="액션">액션</option>
    </select>
    <br>

    <label for="score">SCORE:</label>
    <input type="number" name="score" id="score" min="0" max="10" step="0.1">
    <br>

    <label for="poster_url">POSTER_URL:</label>
    <input type="text" name="poster_url" id="poster_url">
    <br>

    <label for="description">DESCRIPTION:</label>
    <textarea name="description" id="description" cols="30" rows="5"></textarea>
    <br>

    <input type="submit" value="Submit">  
  </form>

  <br>
  <hr>
  <a href="{% url 'movies:index' %}">BACK</a>

{% endblock content %}

```

#### 📍 point

- 다양한 input 태그를 활용해보았다.



### detail

```html
{% extends 'base.html' %}

{% block content %}
  <h1>DETAIL</h1>
  <hr>

  <img src="{{movie.poster_url}}" alt="poster" height="500">
  <br>
  <br>
  
  <p><b>{{ movie.title }}</b></p>
  <p>Audience: {{ movie.audience }}</p>
  <p>Release Date: {{ movie.release_date }}</p>
  <p>Genre: {{ movie.genre }}</p>
  <p>Score: {{ movie.score }}</p>
  <p>{{ movie.description }}</p>



  <a href="{% url 'movies:edit' movie.pk %}">
    <button class="btn btn-link p-0">EDIT</button>
  </a> 
  <form action="{% url 'movies:delete' movie.pk %}" method="POST" style="display:inline;">
    {% csrf_token %}
    <button class= "btn btn-link p-0">DELETE</button>
  </form>

      
  <br> 
  <hr>
  <a href="{% url 'movies:index' %}">BACK</a>
   


{% endblock content %}

```

#### 📍 point

- EDIT과 DELETE 위치를 나란히 맞추기 위해 많은 고민을 하였다. 

  둘 다 버튼으로 만들어 form에게 인라인 속성을 넣어주었다.

  (블록, 인라인 특성 잊지말자!)



### edit.html

```html
{% extends 'base.html' %}

{% block content %}
  <h1>EDIT</h1>
  <hr>

  <form action="{% url 'movies:update' movie.pk %}" method="POST">
    {% csrf_token %}
    <label for="title">TITLE:</label>
    <input type="text" name="title" id="title" value="{{movie.title}}">
    <br>

    <label for="audience">AUDIENCE:</label>
    <input type="number" name="audience" id="audience" value="{{movie.audience}}">
    <br>

    <label for="release_date">RELEASE_DATE:</label>
    <input type="date" name="release_date" id="release_date" value="{{movie.release_date | date:"Y-m-d"}}">
    <br>

    <label for="genre">GENRE:</label>
    <select name="genre" id="genre">
      {% for gr in genres %}
        {% if gr == movie.genre %}
          <option value={{ gr }} selected>{{ gr }}</option>
        {% else %}
          <option value={{ gr }}>{{ gr }}</option>
        {% endif %}
      {% endfor %}
    </select>
    <br>

    <label for="score">SCORE:</label>
    <input type="number" name="score" id="score" min="0" max="10" step="0.1" value="{{movie.score}}">
    <br>

    <label for="poster_url">POSTER_URL:</label>
    <input type="text" name="poster_url" id="poster_url" value="{{movie.poster_url}}">
    <br>

    <label for="description">DESCRIPTION:</label>
    <textarea name="description" id="description" cols="30" rows="5">{{movie.description}}</textarea>
    <br>

    <input type="reset" value="reset">
    <input type="submit" value="Submit">
  </form>

  <br>
  <hr>
  
  <a href="{% url 'movies:detail' movie.pk %}">BACK</a>

{% endblock content %}
```

#### 📍 point

- date, genre의 value값 설정이 매우 어려웠다.
  - date의 경우, `value="{{movie.release_date | date:"Y-m-d"}}"`이런 식으로 필터
  - genre의 경우, 반복문과 조건문을 활용해 seleted 될 수 있도록 하였다.