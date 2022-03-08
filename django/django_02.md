## Migrations

```bash
python manage.py makemigrations
```

```bash
python manage.py migrate

#db.sqlite3 우클릭 open database
```

```bash
python manage.py sqlmigrate 앱 이름 0001
```

```bash
#확인
python manage.py showmigrations
```

```bash
#models.py 수정 (예시)

class Article(models.Model):
    
    title = models.CharField(max_length=10)
    content = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

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





## CRUD (Create, Read, Update, Delete)

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
```





## Admin Site

```shell
# 생성
python manage.py createsuperuser
```

```python
# 등록
# articles/admin.py
from django.contrib import admin
from .models import Article

admin.site.register(Article, ArticleAdmin)
```

```python
from .models import Article
# Register your models here.

class ArticleAdmin(admin.ModelAdmin):
    list_display = ('title', 'content', 'pk', 'created_at')
    
admin.site.register(Article, ArticleAdmin)
```

