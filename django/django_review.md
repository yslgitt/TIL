## Web Framework

- Web : 인터넷에 연결된 컴퓨터를 통해 정보를 공유할 수 있는 전 세계적인 정보 공간

  - Static web page (정적 웹 페이지)

    - 서버에 미리 저장된 파일이 사용자에게 그대로 전달
    - 추가적인 처리 과정 없이 클라이언트에게 응답
    - 모든 상황에서 모든 사용자에게 동일한 정보 표시
    - HTML, CSS, JavaScript
    - flat page 라고도 함

  - Dynamic web page (동적 웹 페이지)

    - 추가적인 처리 과정 이후 클라이언트에게 응답

    - 방문자와 상호 작용으로 페이지 내용이 달라짐

    - Python, Java, C++ 사용, 데이터 베이스와 상호작용

      

- Framework (Application framework)

  - 프로그래밍에서 특정 운영 체제를 위한 응용 프로그램 표준 구조를 구현하는 클래스와 라이브러리 모임
  - 재사용할 수 있는 수많은 코드를 프레임워크로 통함함으로써 개발자가 새로운 어플리케이션을 위한 표준 코드를 다시 작성하지 않아도 같이 사용할 수 있도록 도움



- Web framework

  - 웹 페이지를 개발하는 과정에서 겪는 어려움을 줄이는 것이 주목적

    (데이터베이스 연동, 템플릿 형태의 표준, 세션 관리, 코드 재사용 등의 기능을 포함)

  - 동적인 웹페이지나 웹 애플리케이션, 웹 서비스 개발 보조용으로 만들어지는 Application framework의 일종



- Framework Architecture
  - MVC Design Pattern (model - view - controller)
  - Django는 **MTV Pattern**
    - **Model** (model) : 응용프로그램의 데이터 구조를 정의하고 데이터베이스의 기록을 관리 (추가, 수정, 삭제)
    - **Template** (view) : 파일의 구조나 레이아웃을 정의, 실제 내용을 보여주는데 사용 
    - **View** (controller) : HTTP 요청을 수신하고 HTTP 응답을 반환, Model을 통해 요청을 충족시키는데 필요한 데이터에 접근, template에게 응답의 서식 설정을 맡김



# Django

- 프로젝트 생성
  - `django-admin startproject <프로젝트명> .`
    - 프로젝트 이름으로 파이썬이나 장고에서 사용중인 키워드는 피해야 함. '-'도 사용 금지
- 프로젝트 구조
  - `__init__.py` : 파이썬에게 이 디렉토리를 하나의 파이썬 패키지로 다루도록 지시
  - `asgi.py` (Asynchronous Server Gateway Interface) :  Django 애플리케이션이 비동기식 웹 서버와 연결 및 소통하는 것을 도움
  - `settings.py` : 애플리케이션의 모든 설정을 포함
    - 앱 등록: `INSTALLED_APPS` 리스트 추가 (반드시 생성 후에 등록!)
  - `urls.py` : 사이트 url과 적절한 views의 연결을 지정
  - `wagi.py` (Web Server Gateway Interface) : Django 애플리케이션이 웹서버와 연결 및 소통하는 것을 도움 
  - `manage.py` : Django 프로젝트와 다양한 방법으로 상호작용 하는 커맨드라인 유틸리티 



- Application 생성

  - `python manage.py startapp articles` 
    - Application명은 복수형으로 하는 것을 권장

- Application 구조

  - `admin.py` : 관리자용 페이지 설정

  - `apps.py` : 앱의 정보가 작성

  - `models.py` : 앱에서 사용하는 model 정의

  - `tests.py` : 프로젝트의 테스트 코드 작성

  - `views.py` : view 함수들의 정의

    

### 요청과 응답

- URLs 

  - HTTP 요청을 알맞은 view로 전달

- View

  - HTTP 요청 수신, HTTP 응답 반환하는 함수 작성
  - Model을 통해 요청에 맞는 필요 데이터 접근
  - Template에게 HTTP 응답 서식을 맡김

- Templates

  - 실제 내용을 보여주는데 사용되는 파일

  - 파일의 구조나 레이아웃을 정의

  - app 폴더안의 templates 폴더 

    

- 추가 설정

  - LANGUAGE_CODE : 제공되는 번역 결정, USE_I18N
  - TIME_ZONE : 데이터베이스 연결의 시간대를 나타내는 문자열 지정, USE_TZ 
  - USE_I18N : 번역 시스템을 활성화해야하는지 여부 지정
  - USE_L10N : 지역화 된 형식 기본적으로 활성화할지 여부 결정, locale 형식  
  - USE_TZ : 시간대 인식 여부 지정





### Template

데이터 표현을 제어하는 도구이자 표현에 관련된 로직

- 표현과 로직 분리!
- 중복을 배제!

*코드 작성 순서: urls.py > views.py > templates*



- Django template language (DTL)

  - django template에서 사용하는 built-in template system
  - 조건, 반복, 변수 치환, 필터 등의 기능을 제공

  - Django 템플릿 시스템은 단순히 Python이 HTML에 포함 된 것이 아님
    - 프로그래밍적 로직이 아니라 프레젠테이션을 표현하기 위한 것
  - 파이썬처럼 일부 프로그래밍 구조(if, for 등)를 사용할 수 있지만, 이건 해당 Python 코드로 실행되는 것이 아님





- DTL Syntax

  - Variables (58-60p)

    - `{{  variables  }}`
    - 변수명은 영,숫자와 밑줄(_)의 조합으로 구성될 수 있으나 밑줄로는 시작 할 수 없음
    - 변수명에 공백이나 구두점 문자를 사용할 수 없음
    - `dot(.)`를 사용하여 변수 속성에 접근
    - render > 3번째 > 딕셔너리

  - Filters (61p)

    - `{{ variable|filter }}`
    - 표시할 변수를 수정 (ex) lower - 소문자 출력)

  - Tags

    - 출력 테스트를 만들거나 반복 또는 논리를 수행하여 제어 흐름을 만드는 등 보다 복잡한 일들을 수행
    - 일부 태그는 시작과 종료 태그가 필요(`{% if %}` ... `{% endif %}`)

  - Comments

    - `{# lorem #}` : 한 줄 주석에만 사용

    - 여러줄 주석은 

      ```
      {# comment #}
      	주석
      	주석
      {# endcomment #}
      ```

      



- Template inheritance
  - 템플릿 상속은 기본적으로 코드의 재사용성에 초점을 맞춤
  - 템플릿 상속을 사용하면 사이트의 모든 공통 요소를 포함하고, 하위 템플릿이 재정의(override) 할 수있는 블록을 정의하는 기본 “skeleton” 템플릿을 만들 수 있음
    - `{% extends '' %}`
      - 자식(하위)템플릿이 부모 템플릿을 확장한다는 것을 알림
      - 반드시 템플릿 최상단에 위치해야 함(= 템플릿의 첫번째 템플릿 태그여야 함) - 2개 이상 불가
    - `{% block content %} ... {% endblock content %}`
      - 하위 템플릿에서 재지정(overriden)할 수 있는 블록을 정의
      - 하위 템플릿이 채울 수 있는 공간
    - 세팅 > TEMPALTES > 'DIRS' : > [BASE_DIR/ 'templates'] 
  - `include`





### HTML Form

- **HTML `<form>` element**
  - 웹에서 사용자 정보를 입력하는 여러 방식(text, button, checkbox, file, hidden, image, password, radio, reset, submit)을 제공하고, 사용자로부터 할당된 데이터를 서버로 전송하는 역할을 담당
  - 핵심 속성
    - action : 입력 데이터가 전송될 URL 지정
    - method : 입력 데이터 전달 방식 지정
- **HTML `<input>` element**
  - 사용자로부터 데이터를 입력 받기 위해 사용
  - 핵심 속성
    - **name**
    - 중복 가능, 양식을 제출했을 때 name이라는 이름에 설정된 값을 넘겨서 값을 가져올 수 있음
    - 주요 용도는 GET/POST 방식으로 서버에 전달하는 파라미터(name 은 key , value 는 value)로 `?key=value&key=value` 형태로 전달
- **HTML `<label>` element**
  - 인터페이스 항목의 설명
  - input : id - label : for





- HTTP
  - HyperText Transfer Protocol
  - 웹에서 이루어지는 모든 데이터 교환의 기초
  - HTTP는 주어진 리소스가 수행 할 원하는 작업을 나타내는 request methods를 정의 (GET,POST,PUT,DELETE...)

- HTTP - **GET**

  - 정보 조회
  - 데이터를 가져올 때만 사용해야 함
  - 데이터를 서버로 전송할 때 body가 아닌 **Query String Parameters**를 통해 전송

  



### URLs

- Variable routing

  - 동적 라우팅

    - 주소 자체를 변수처럼 사용해서 동적으로 주소를 만드는 것

      `path('hello/<str:name>/', views.hello)`

    - str, int, slug(아스키 문자 또는 숫자, 하이픈 및 밑줄 문자로 구성된 슬러그 문자열)

- App URL mapping

  - 하나의 프로젝트의 여러 앱이 존재한다면, 각각의 앱 안에 urls.py을 만들고 프로젝트 urls.py에서 각 앱의 urls.py 파일로 URL 매핑을 위탁하게 가능

- Including other URLconfs (`include()`)

  - 다른 URLconf(app1/urls.py)들을 참조할 수 있도록 도움

  - 함수 include()를 만나게 되면, URL의 그 시점까지 일치하는 부분을 잘라내고, 남은 문자열 부분을 후속 처리를 위해 include된 URLconf로 전달

    ```python
    # firstpjt/urls.py
    
    from django.contrib import admin
    from django.urls import path, include
    
    
    urlpatterns = [
        path('admin/', admin.site.urls),
        path('articles/', include('articles.urls')),
        path('pages/', include('pages.urls')),
    ]
    ```

    - 장고는 명시적 상대경로 권장

- Naming URL patterns

  - Django는 URL에 이름을 지정하는 방법을 제공하므로써 뷰 함수와 템플릿에서 특정 주소를 쉽게 참조할 수 있도록 도움

    ```python
    # articles/urls.py
    
    urlpatterns = [
        path('index/', views.index, name='index'),
        path('greeting/', views.greeting, name='greeting'),
        path('dinner/', views.dinner, name='dinner'),
        path('throw/', views.throw, name='throw'),
        path('catch/', views.catch, name='catch'),
        path('hello/<str:name>/', views.hello, name='hello'),
    ]
    ```

    

  - **url tag 사용하기**
    - `{% url '' %}`
    - 주어진 URL 패턴 이름 및 선택적 매개 변수와 일치하는 절대 경로 주소를 반환
    - 템플릿에 URL을 하드 코딩하지 않고도 DRY 원칙을 위반하지 않고 링크를 출력하는 방법



- **Namespace**

  - 개체를 구분할 수 있는 범위를 나타내는 namespace

  - `URL namespace`

    - 예시:  articles app index 페이지에서 두번째 앱 index로 이동 하이퍼 링크를 클릭 시 현재 페이지로 이동

    - app_name attribute

      ```python
      # pages/urls.py
      
      app_name = 'pages'
      urlpatterns = [
          path('index/', views.index, name='index'),
      ]
      ```

      - URL namespace를 사용하면 서로 다른 앱에서 동일한 URL 이름을 사용하는 경우에도 이름이 지정된 URL을 고유하게 사용 할 수 있음
      - `:` 연산자를 사용하여 지정 
        - 예를들어, app_name이 `articles`이고 URL name이 `index`인 주소 참조는 `articles:index`

  - `Template namespace`

    - 예시: pages app index url로 이동해도 articles app의 index 페이지 출력

    - Django는 기본적으로 `app_name/templates/` 경로에 있는 templates 파일들만 찾을 수 있으며, INSTALLED_APPS에 작성한 app 순서로 tamplate을 검색 후 렌더링

    - 임의로 templates의 폴더 구조를 `app_name/templates/app_name` 형태로 변경해 임의로 이름 공간 생성 후 변경된 추가 경로 작성

      ```python
      # articles/views.py
      
      return render(request, 'articles/index.html')
      ```



- **static**

  - 정적 파일
  - 응답할 때 별도의 처리 없이 파일 내용을 그대로 보여주면 되는 파일 

  ```python
  STATICFILES_DIRS = [
      BASE_DIR / 'static',
  ]
  ```

  ```python
  STATIC_URL = '/static/'
  ```

  ```python
  # settings.py 예시
  
  STATIC_ROOT = BASE_DIR / 'staticfiles'
  ```

  ```bash
  $ python manage.py collectstatic
  ```

  ```dj
  <!-- articles/index.html -->
  
  {% extends 'base.html' %}
  {% load static %}
  
  {% block content %}
    <img src="{% static 'articles/sample.png' %}" alt="sample">
    ...
  {% endblock %}
  ```

  



## Django Model

- Model
  - 단일한 데이터에 대한 정보를 가짐 (필드, 동작)
  - 저장된 데이터베이스의 구조
  - 일반적으로 각각 model은 하나의 데이터베이스 테이블과 매핑 
  - 데이터를 **구조화**하고 **조작**하기 위한 도구

- Database

  - 데이터 베이스: 체계화된 데이터의 모임

  - 쿼리: 데이터를 조회하기 위한 명령어, 조건에 맞는 데이터를 추출하거나 조작하는 명령어

  - 기본 구조

    - 스키마: 데이터베이스에서 자료의 구조, 표현방법, 관계 등을 정의한 구조

    - 테이블

      - 열: 필드, 속성 - 고유한 데이터 형식 지정

      - 행: 레코드, 튜플

      - 기본키

        

- ORM (Object-Relational-Mapping)
  - 객체 지향 프로그래밍 언어를 사용하여 호환되지 않는 유형의 시스템간에 데이터를 변환하는 프로그래밍 기술
  - OPP 프로그래밍에서 RDBMS를 연동할 때, 데이터베이스와 객체지향 프로그래밍 언어간의 호환되지 않는 데이터를 변환하는 프로그래밍 기법



- 작성

  ```
  #models.py 수정 (예시)
  
  class Article(models.Model):
      
      title = models.CharField(max_length=30)
      content = models.TextField()
      created_at = models.DateTimeField(auto_now_add=True) #최초 생성
      updated_at = models.DateTimeField(auto_now=True) #최종 수정
  ```

  - CharField(max_length=None)
    - 길이 제한 있는 문자열
    - max_length은 필수 인자
  - TextField()
    - 글자수가 많을 때 사용



## Migration

model에 생긴 변화를 반영하는 방법

- 명령어

  - `makemigrations`: model 변경한 것에 대한 새로운 마이그레이션 만들 때 사용
  - `migrate`: 마이그레이션 DB 반영하기 위해 사용 
  - `sqlmigrate`: 마이그레이션에 대한 SQL 구문을 보기위해 사용, 어떻게 해석되어 동작할지 미리 확인 
  - `showmigrations`: 프로젝트 전체의 마이그레이션 상태 확인, migrate 여부 확인 

- DataField's options

  - auto_now_add : 최초 생성 일자

  - auto_now : 최초 수정 일자

    

## Database API

- DB API
  - DB를 조작하기 위한 도구
  - database-abstract API, database-access API
  - `Article.objects.all()` : 클래스 이름. 매니저. api
    - manager : 쿼리 작업이 제공되는 인터페이스
    - queryset : 전달받은 객체 목록으로 조회, 필터, 정렬 수행 할 수 있음



- Django shell

  

## CRUD

- CREATE, READ, UPDATE, DELETE