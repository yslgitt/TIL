## ❗❕ Migrations

```bash
python manage.py makemigrations
```

```bash
python manage.py migrate

#db.sqlite3 우클릭 open database
```

```bash
#확인
python manage.py sqlmigrate 앱 이름 0001
```

```bash
#확인
python manage.py showmigrations
```

```bash
#models.py 수정 (예시)

class Article(models.Model):
    
    title = models.CharField(max_length=30)
    content = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True) #최초 생성
    updated_at = models.DateTimeField(auto_now=True) #최종 수정

```



- 변경사항 발생 시 3단계 ❕ 
  - models.py : model 변경사항 발생 시!
  - `python manage.py makemigrations` : migrations 파일 생성!
  - `python manage.py migrate` : DB 반영!





## DB API

### Django shell

```bash
# 라이브러리 설치
pip install ipython
pip install django-extensions

# 라이브러리 등록: settings.py > INSTALLED_APPS = [..., 'django_extensions', ...] 
```

```bash
# 실행
python manage.py shell_plus
```





## ➕ CRUD (Create, Read, Update, Delete)

✔ CREATE

```shell
# 1
article = Article()
article.title = "first"
article.content = "django!"
article.save()

# article = Article(30,'제목','내용') # id, title, content 순으로 쓰면 생성 가능
```

```shell
# 2
article = Article(title='second', content='django!')
article.save()
```

```shell
# 3
Article.objects.create(title= 'third', content='django!')
```

```python
# str method
# models.py 수정 (예시)

class Article(models.Model):
    
    title = models.CharField(max_length=10)
    content = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
	
    def __str__(self):
        return self.title
```



✔  READ

```shell
# 나가기 : exit

# 전체 article 조회 (READ)
Article.objects.all()

# 매개변수와 일치하는 객체 반환 (하나만 반환 가능! 둘 이상이면 안됨.)
Article.objects.get(pk=1) #예시
Article.objects.get(content='django!') #예시
# 객체 없으면 DoesNotExist
# 둘 이상이면 MultipleObjectsReturned

# 매개변수와 일치하는 객체를 포함한 새 QuerySet 반환 (둘 이상 가능)
Article.objects.filter(content='django!') #예시
```



✔ UPDATE

```shell
article = Article.objects.get(pk=1)
article.title = '바꿀 제목'
article.content = '바꿀 내용'
article.save()
```



✔ DELETE

```shell
article = Article.objects.get(pk=1)
article.delete()
#삭제된 객체수와 객체 유형당 삭제수가 포함된 딕셔너리 반환
```





## ❗❕ Admin Site

```shell
# 생성
python manage.py createsuperuser
```

```python
# 등록
# articles/admin.py
from django.contrib import admin
from .models import Article
# Register your models here.

class ArticleAdmin(admin.ModelAdmin):
    list_display = ('title', 'content', 'pk', 'created_at') # 넣고 싶은 것.
    
admin.site.register(Article, ArticleAdmin)
```



## ❗❕ CRUD with views (게시판 만들기)

### 😀 READ(index)

```python
# 앱 폴더 >  views.py
from django.shortcuts import render, redirect
from .models import Article

def index(requeset):
    articles = Article.objects.all()[::-1]
    context = {
        'articles' : articles
    }
	return render(request,'articles/index.html', context)
```

```html
#index.html
{% extends 'base.html' %}

{% block content %}
  <h1>INDEX</h1>
  <a href="{% url 'articles:new' %}">NEW</a> #이동 경로
  <hr>
  {% for article in articles %}
    <h2>제목: {{ article.title }}</h2>
    <p>내용: {{ article.content }}</p>

    <a href="{% url 'articles:detail' article.pk %}">DETAIL</a> #이동 경로
  
  {% endfor %}

{% endblock content %}

```



### 🤖 CREATE(new)

- new

```python
# 앱 폴더> urls.py

from django.urls import path
from . import views

app_name = 'articles'
urlpatterns = [
    path('', views.index, name='index'),
    path('new/', views.new, name='new')
]

```

```python
# 앱 폴더 > views.py
def new(request):
    return render(request, 'articles/new.html')

# 앱 폴더 > templates 폴더 > 앱 이름 폴더 > new.html 생성
```



- create

```python
# 앱 폴더> urls.py
from django.urls import path
from . import views

app_name = 'articles'
urlpatterns = [
    path('', views.index, name='index'),
    path('new/', views.new, name='new'),
    path('create/', views.create, name='create'),
]
```

```python
# 앱 폴더 > views.py
def create(request):
    title = request.POST.get('title')
    content = request.POST.get('content')
    
    article = Article()
    article.title = title
    article.content = content
    article.save()

    return redirect('articles:detail', article.pk) #이동 경로 입력
```

- new.html

```html
{% extends 'base.html' %}

{% block content%}
  <h1>NEW</h1>
  
  <form action="{% url 'articles:create' %}" method="POST">
    {% csrf_token %}
    <label for="title">제목: </label>
    <input type="text" name="title" id="title">
    
    <br>
    <label for="content">내용: </label>
    <textarea name="content" id="content" cols="30" rows="10"></textarea>
    <br>
    <input type="submit" value="작성">
      
   	<br>
    <a href="{% url 'articles:index' %}">BACK</a>
    

  </form>

{% endblock content%}
```



- detail

```python
# 앱 폴더> urls.py
from django.urls import path
from . import views

app_name = 'articles'
urlpatterns = [
    path('', views.index, name='index'),
    path('new/', views.new, name='new'),
    path('create/', views.create, name='create'),
    path('<int:pk>', views.detail, name='detail'),
]
```

```python
# 앱 폴더 > views.py
def detail(request, pk):
    article = Article.objects.get(pk=pk)
    context = {
        'article' : article,
    }
    return render(request, 'articles/detail.html', context)
# 앱 폴더 > templates 폴더 > 앱 이름 폴더 > detail.html 생성
```

```html
# detail.html

{% extends 'base.html' %}

{% block content %}
  <h1>DETAIL</h1>
  <hr>
  <h2>{{ article.title }}</h2>
  <p>{{ article.content}}</p>

  <p>작성일 : {{article.created_at}}</p>
  <p>수정일 : {{article.updated_at}}</p>

  
  <a href="{% url 'articles:edit' article.pk %}">EDIT</a>
  <form action="{% url 'articles:delete' article.pk %}" method="POST">
    {% csrf_token %}
    <button class="btn btn-link p-0">DELETE</button>
  </form>
  <br>
  <a href="{% url 'articles:index' %}">BACK</a>

{% endblock content %}
```



### ✏ UPDATE(edit)

- edit, update

```python
# 앱 폴더> urls.py
from django.urls import path
from . import views

app_name = 'articles'
urlpatterns = [
    path('', views.index, name='index'),
    path('new/', views.new, name='new'),
    path('create/', views.create, name='create'),
    path('<int:pk>', views.detail, name='detail'),
    path('<int:pk>/edit/', views.edit, name='edit'),
    path('<int:pk>/update/', views.update, name='update')
]
```

```python
# 앱 폴더 > views.py
def edit(request, pk):
    article = Article.objects.get(pk=pk)
    context = {
        'article' : article,
    }
    return render(request,'articles/edit.html', context)
# 앱 폴더 > templates 폴더 > 앱 이름 폴더 > edit.html 생성

def update(request, pk):
    article = Article.objects.get(pk=pk)
    if request.method == 'POST':
        article.title = request.POST.get('title')
        article.content = request.POST.get('content')
        article.save()
        
    return redirect('articles:detail',article.pk)
```

- edit.html

```html
{% extends 'base.html' %}

{% block content %}
  <h1>EDIT</h1>
  
  <form action="{% url 'articles:update' article.pk %}" method="POST">
    {% csrf_token %}
    <label for="title">TITLE:</label>
    <input type="text" name="title" id="title" value="{{ article.title }}">
    <br>

    <label for="content">CONTENT:</label>
    <textarea name="content" id="content" cols="30" rows="10">{{ article.content }}</textarea>
    <br>

    <input type="submit" value="수정">
    <a href="{% url 'articles:detail' article.pk%}">BACK</a>


  </form>
```



### ☠ delete

```python
# 앱 폴더> urls.py
from django.urls import path
from . import views

app_name = 'articles'
urlpatterns = [
    path('', views.index, name='index'),
    path('new/', views.new, name='new'),
    path('create/', views.create, name='create'),
    path('<int:pk>', views.detail, name='detail'),
    path('<int:pk>/edit/', views.edit, name='edit'),
    path('<int:pk>/update/', views.update, name='update'),
    path('<int:pk>/delete/', views.delete, name='delete'),
]
```

```python
# 앱 폴더 > views.py
def delete(request,pk):
    article = Article.objects.get(pk=pk)
    if request.method == "POST":        
        article.delete()
        return redirect('articles:index')
    else:
        return redirect('articles:detail',article.pk)
```



<img src="{% url 'movie.poster_url' %}" alt="poster">
