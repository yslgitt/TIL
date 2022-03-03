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



