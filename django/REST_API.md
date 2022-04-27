```bash
python -m venv 가상환경이름

source 가상환경이름/Scripts/activate
```

```python
pip install django==3.2.12
# pip install -r requirements.txt

# 프로젝트 생성: django-admin startproject 프로젝트이름 .
django-admin startproject practice . # 쩜! 잊지말기!

# 로켓 확인
python manage.py runserver
# bash 창 원상태로 돌리기: ctrl + c

# 애플리케이션
# python manage.py startapp 애플리케이션이름
python manage.py startapp articles
```

```python
# settings.py 
INSTALLED_APPS = [
    'articles',
    'django_seed',
    'django_extensions',
    'rest_framework',
    ...
]

# my_api/urls.py
from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/v1/', include('articles.urls')),
]

# articles/urls.py
from django.urls import path
from . import views

urlpatterns = [
    
]
```

```python
# models.py
# 모델 생성

#예시
from django.db import models

# Create your models here.
class Article(models.Model):
    title = models.CharField(max_length=200)
    content = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
```

```bash
python manage.py makemigrations
python manage.py migrate
```

```bash
# django-seed 라이브러리를 사용해 모델 구조에 맞는 데이터 생성 
python manage.py seed articles --number=5
```

```python
# articles/serializers.py
from .models import Article
from rest_framework import serializers

class ArticleListSerializer(serializers.ModelSerializer):

    class Meta:
        model = Article
        fields = ('id','title',)


class ArticleSerializer(serializers.ModelSerializer):
 
    class Meta:
        model = Article
        fields = '__all__'
```

   

-------



### ✔ GET

- Article List

```python
# articles > urls.py
from django.urls import path
from . import views

urlpatterns = [
    path('articles/', views.article_list),
]
```

```python
# articles > views.py
from django.shortcuts import get_list_or_404, render

from articles.serializers import ArticleListSerializer

from .models import Article

from rest_framework.response import Response
from rest_framework.decorators import api_view

# Create your views here.

@api_view(['GET'])
def article_list(request):
    articles = get_list_or_404(Article)
    serializer = ArticleListSerializer(articles, many=True)
    return Response(serializer.data)
```

- Article Detail

```python
# articles > urls.py
from django.urls import path
from . import views

urlpatterns = [
    path('articles/', views.article_list),
    path('articles/<int:article_pk>/', views.article_detail),
]
```

```python
# articles > views.py
from django.shortcuts import get_list_or_404, get_object_or_404, render

from articles.serializers import ArticleListSerializer, ArticleSerializer

from .models import Article

from rest_framework.response import Response
from rest_framework.decorators import api_view

# Create your views here.

@api_view(['GET'])
def article_list(request):
    articles = get_list_or_404(Article)
    serializer = ArticleListSerializer(articles, many=True)
    return Response(serializer.data)

@api_view(['GET'])
def article_detail(request, article_pk):
    article = get_object_or_404(Article, pk=article_pk)
    serializer = ArticleSerializer(article)
    return Response(serializer.data)
```





### ✔ POST

```python
# articles > views.py
from rest_framework import status # 추가

@api_view(['GET','POST'])
def article_list(request):
    if request.method == 'GET':
        articles = get_list_or_404(Article)
        serializer = ArticleListSerializer(articles, many=True)
        return Response(serializer.data)
    elif request.method == 'POST':
        serializer = ArticleSerializer(data=request.data)
        if serializer.is_valid(raise_exception=True):
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
```

- raise_exception : 검증 실패하면 400 오류 발생





### ✔ DELETE

```python
# articles/views.py
@api_view(['GET','DELETE'])
def article_detail(request, article_pk):
    article = get_object_or_404(Article, pk=article_pk)

    if request.method == 'GET':
        serializer = ArticleSerializer(article)
        return Response(serializer.data)

    elif request.method == 'DELETE':
        article.delete()
        data = {
            'delete' : f'데이터 {article_pk}번이 삭제되었습니다.'
        }
        return Response(data, status=status.HTTP_204_NO_CONTENT)
```





### ✔ PUT

```python
@api_view(['GET', 'DELETE', 'PUT'])
def article_detail(request, article_pk):
    article = get_object_or_404(Article, pk=article_pk)

    if request.method == 'GET':
        serializer = ArticleSerializer(article)
        return Response(serializer.data)

    elif request.method == 'DELETE':
        article.delete()
        data = {
            'delete' : f'데이터 {article_pk}번이 삭제되었습니다.'
        }
        return Response(data, status=status.HTTP_204_NO_CONTENT)

    elif request.method == 'PUT':
        serializer = ArticleSerializer(article, request.data)
        if serializer.is_valid(raise_exception=True):
            serializer.save()
            return Response(serializer.data)
```





