# 🔧 Django



## 가상환경 설정

```bash
python -m venv 가상환경이름
```

```bash
source 가상환경이름/Scripts/activate
```



## Django 시작

```bash
pip install django==3.2.12
```

```bash
# 프로젝트 생성
# django-admin startproject 프로젝트이름 .
django-admin startproject firstpjt . # 쩜! 잊지말기!
```

```bash
# 로켓 확인
python manage.py runserver

# bash 창 원상태로 돌리기: ctrl + c
```

```bash
# 애플리케이션 생성
# python manage.py startapp 애플리케이션이름
python manage.py startapp articles
```

```python
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
# 프로젝트 폴더 > urls.py

from django.contrib import admin
from django.urls import path
# from 애플리케이션 import views
from articles import views 

urlpatterns = [
    path('admin/', admin.site.urls),
    # path('주소명/', views.함수)
    path('index/', views.index)
]

```

```python
# 앱 폴더 > views.py

from django.shortcuts import render

# 함수 만들기 
def index(request):
    return render(request,'index.html')
```

```html
# 앱 폴더 > templates 폴더 생성 > html 파일 생성 (ex: index.html)
# ! + tab
```



## ✔

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
#가장 바깥에 templates 폴더 생성 > base.html 생성
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

```html
# 앱 폴더 > templates 폴더 생성 > 앱 이름으로 폴더 생성 > html 생성

{% extends 'base.html' %}

{% block content %}

{% endblock content %}
```



