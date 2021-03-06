# π§ Django



## κ°μνκ²½ μ€μ 

```bash
python -m venv κ°μνκ²½μ΄λ¦
```

```bash
source κ°μνκ²½μ΄λ¦/Scripts/activate
```



## Django μμ

```bash
pip install django==3.2.12
```

```bash
# νλ‘μ νΈ μμ±
# django-admin startproject νλ‘μ νΈμ΄λ¦ .
django-admin startproject firstpjt . # μ©! μμ§λ§κΈ°!
```

```bash
# λ‘μΌ νμΈ
python manage.py runserver

# bash μ°½ μμνλ‘ λλ¦¬κΈ°: ctrl + c
```

```bash
# μ νλ¦¬μΌμ΄μ μμ±
# python manage.py startapp μ νλ¦¬μΌμ΄μμ΄λ¦
python manage.py startapp articles
```

```python
# μ± λ±λ‘
# νλ‘μ νΈ ν΄λ > settings.py

INSTALLED_APPS = [
    # μ΄κ³³μ μ± μ΄λ¦ μΆκ° 
    'articles', # < μ΄λ κ²!
    
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
]
```

```python
# νλ‘μ νΈ ν΄λ > urls.py

from django.contrib import admin
from django.urls import path
# from μ νλ¦¬μΌμ΄μ import views
from articles import views 

urlpatterns = [
    path('admin/', admin.site.urls),
    # path('μ£Όμλͺ/', views.ν¨μ)
    path('index/', views.index)
]

```

```python
# μ± ν΄λ > views.py

from django.shortcuts import render

# ν¨μ λ§λ€κΈ° 
def index(request):
    return render(request,'index.html')
```

```html
# μ± ν΄λ > templates ν΄λ μμ± > html νμΌ μμ± (ex: index.html)
# ! + tab
```



## β

```python
#setting.py 
TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [BASE_DIR / 'templates',], #μ΄λΆλΆ μμ 
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
#κ°μ₯ λ°κΉ₯μ templates ν΄λ μμ± > base.html μμ±
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
# νλ‘μ νΈ ν΄λ > urls.py
from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('articles/', include('articles.urls')) #μ± μ΄λ¦ 
]
```

```python
# μ± ν΄λ μμ > urls.py λ§λ€κΈ°
from django.urls import path
from . import views

app_name = 'articles'
# μμ
urlpatterns = [
    path('', views.index, name='index'),
    path('new/', views.new, name='new'),
]
```

```python
# μ± ν΄λ > views.py 
def index(request):

    return render(request, 'articles/index.html')
```

```html
# μ± ν΄λ > templates ν΄λ μμ± > μ± μ΄λ¦μΌλ‘ ν΄λ μμ± > html μμ±

{% extends 'base.html' %}

{% block content %}

{% endblock content %}
```



