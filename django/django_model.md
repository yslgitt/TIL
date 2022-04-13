----

```bash
pip install django==3.2.12
# or
pip install -r requirements.txt
# > django-extensions 설치 시 
# 라이브러리 등록: settings.py > INSTALLED_APPS = [..., 'django_extensions', ...] 
```

```bash
# 프로젝트 생성
# django-admin startproject 프로젝트이름 .
django-admin startproject firstpjt . # 쩜! 잊지말기!
```

```bash
# 애플리케이션 생성
# python manage.py startapp 애플리케이션이름
python manage.py startapp articles
```

```bash
# 앱 등록
# 프로젝트 폴더 > settings.py

INSTALLED_APPS = [
    # 이곳에 앱 이름 추가 
    'articles', # < 이렇게!
    
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
]
```

```python
# 프로젝트 > urls.py
from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('articles/', include('articles.urls')),
]
```

```python
#setting.py 
TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [BASE_DIR / 'templates',], #이부분 수정
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]
```

```html
<-- 가장 바깥에 templates 폴더 생성 - base.html 생성 -->
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3" crossorigin="anonymous">
</head>
<body>
  <div class="container">
    {% block content %}

    {% endblock content %}
  </div>
  <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-ka7Sk0Gln4gmtz2MlQnikT1wXgYsOg+OMhuP+IlRH9sENBO0LRn5q+8nbTov4+1p" crossorigin="anonymous"></script>
</body>

</html>
```

```python
# 프로젝트 폴더 > urls.py
from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('articles/', include('articles.urls')) #앱 이름 
]
```

```python
# 앱 폴더 안에 > urls.py 만들기
from django.urls import path
from . import views

app_name = 'articles'
# 예시
urlpatterns = [
    path('', views.index, name='index'),
    path('new/', views.new, name='new'),
]
```

```python
# 앱 폴더 > views.py 
def index(request):

    return render(request, 'articles/index.html')
```

```python
# 앱 폴더 > templates 폴더 생성 > 앱 이름으로 폴더 생성 > html 생성

{% extends 'base.html' %}

{% block content %}
{% endblock content %}
```





------

#### Model 

#### "웹 애플리케이션의 데이터를 구조화하고 조작하기 위한 도구"

- models.py 작성

  ```python
  # articles/models.py
  class Article(models.Model):
      title = models.CharField(max_length=10)
      content = models.TextField()
      created_at = models.DateTimeField(auto_now_add=True)
      updated_at = models.DateTimeField(auto_now=True)
  
      def __str__(self):
          return self.title
  ```

  ```bash
  python manage.py makemigrations
  ```

  ```bash
  python manage.py migrate
  
  #db.sqlite3 우클릭 open database
  ```

- 변경사항 발생 시 3단계 ❕ 
  - models.py : model 변경사항 발생 시!
  - `python manage.py makemigrations` : migrations 파일 생성!
  - `python manage.py migrate` : DB 반영!





-------

- **READ(index)**

  ```python
  # 앱 폴더 > views.py
  
  from multiprocessing import context
  from django.shortcuts import render, redirect
  from .models import Article
  
  
  # Create your views here.
  
  def index(request):
      articles = Article.objects.order_by('-pk')
      context = {
          'articles' : articles
      }  
      return render(request, 'articles/index.html')
  ```

  ```html
  {% extends 'base.html' %}
  
  {% block content %}
    <h1>Articles</h1>
    <a href="">CREATE</a>
    <hr>
    {% for article in articles %}
    <p>글 번호: {{ article.pk }}</p>
    <p>글 제목: {{ article.title }}</p>
    <p>글 내용: {{ article.cotent }}</p>
    <a href="">DETAIL</a>
    <hr>
    {% endfor %}
  {% endblock content %}
  ```

- **CREATE**









-------



```python
# articles/forms.py

from django import forms

class ArticleForm(forms.Form):
    title = forms.CharField(max_length=10)
    content = forms.CharField()
```

