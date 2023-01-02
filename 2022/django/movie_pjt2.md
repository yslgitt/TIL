# PJT07. 사용자 인증기반 관계형 DB 설계

👩🏻‍🤝‍👩🏻 페어: 권다솜, 권예슬



## 감상

### 진행 과정

1. 기본 틀 작성 (🚗:예슬, 🧭:다솜)
2. movies - index, create 작성 (🚗:다솜, 🧭:예슬)
3. movies - detail, update, delete 작성 (🚗:예슬, 🧭:다솜)
4. accounts 작성 (🚗:다솜, 🧭:예슬)
5. movies - comment - url.py, views.py 작성 (🚗:예슬, 🧭:다솜)
6. movies - html 수정 (🚗:다솜, 🧭:예슬)



### 오류

- remote를 지웠다 다시 생성하여 git pull 오류가 남
  - sol: 폴더를 지우고 다시 클론!
- model 선언을 자꾸 까먹음
  - sol: 뒤늦게 model 작성을 함!
- comment 생성 과정 중 movies > model.py에서 user 를 선언하지 않아 오류가 남
  - sol: user 선언하여 다시 migrate!



### 페어 소감

- 예슬 
  - 네이게이터 덕분에 오류를 평소보다 빨리 찾고 해결할 수 있었다!
  - 혼자 일 때보다 즐겁게! 빠르게! 프로젝트를 할 수 있었다! 
  - git 다루는 건 여전히 어렵고.. 무섭다..  

- 다솜

  

## 코드

### movies

- urls.py

  ```python
  from django.urls import path
  from . import views
  
  
  app_name = 'movies'
  urlpatterns = [
      path('', views.index, name='index'),
      path('create/', views.create, name='create'),
      path('<int:pk>/', views.detail, name='detail'),
      path('<int:pk>/delete/', views.delete, name='delete'),
      path('<int:pk>/update/', views.update, name='update'),
      path('<int:pk>/comments/', views.comment_create, name='comment_create'),
      path('<int:movie_pk>/comments/<int:comment_pk>/delete/', views.comment_delete, name='comment_delete'),
  ]
  ```

  

- views.py

  ```python
  from django.shortcuts import render, redirect, get_object_or_404
  from .models import Movie, Comment
  from .forms import MovieForm, CommentForm
  from django.views.decorators.http import require_http_methods, require_POST, require_safe
  from django.contrib.auth.decorators import login_required
  
  # Create your views here.
  @require_safe
  def index(request):
      movies = Movie.objects.order_by('-pk')
      context = {
          'movies': movies,
      }
      return render(request, 'movies/index.html', context)
  
  @login_required
  @require_http_methods(['GET', 'POST'])
  def create(request):
      if request.method == 'POST':
          form = MovieForm(request.POST, request.FILES)
          if form.is_valid():
              movie = form.save(commit=False)
              movie.user = request.user
              movie.save()
              return redirect('movies:detail', movie.pk)
      else:
          form = MovieForm()
      context = {
          'form': form,
      }
      return render(request, 'movies/create.html', context)
  
  @require_safe
  def detail(request, pk):
      movie = get_object_or_404(Movie, pk=pk)
      comment_form = CommentForm()
      comments = movie.comment_set.all()
      context = {
          'movie' : movie,
          'comment_form': comment_form,
          'comments': comments,
      }
      return render(request, 'movies/detail.html', context)
  
  @login_required
  @require_http_methods(['GET', 'POST'])
  def update(request, pk):
      movie = get_object_or_404(Movie, pk=pk)
      if request.user == movie.user:
          if request.method == 'POST':
              form = MovieForm(request.POST, instance=movie)
              if form.is_valid():
                  movie = form.save()
                  return redirect('movies:detail', movie.pk)
          else:
              form = MovieForm(instance=movie)
      else:
          return redirect('movies:index')
      context = {
          'movie': movie,
          'form': form,
      }
      return render(request, 'movies/update.html', context)
  
  @require_POST
  def delete(request, pk):
      movie = get_object_or_404(Movie, pk=pk)
      if request.user.is_authenticated:
          if request.user == movie.user:
              movie.delete()
      return redirect('movies:index')
  
  
  @require_POST
  def comment_create(request, pk):
      if request.user.is_authenticated:
          movie = get_object_or_404(Movie, pk=pk)
          comment_form = CommentForm(request.POST)
          if comment_form.is_valid():
              comment = comment_form.save(commit=False)
              comment.movie = movie
              comment.user = request.user
              comment.save()
          return redirect('movies:detail', movie.pk)
      return redirect('accounts:login')
  
  @require_POST
  def comment_delete(request, movie_pk ,comment_pk):
      if request.user.is_authenticated:
          comment = get_object_or_404(Comment, pk=comment_pk)
          if request.user == comment.user:
              comment.delete()
      return redirect('movies:detail', movie_pk)
  
  ```



- models.py

  ```python
  from django.db import models
  from django.conf import settings
  
  # Create your models here.
  class Movie(models.Model):
      user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, null=True)
      title = models.CharField(max_length=20)
      description = models.TextField()
  
      def __str__(self):
          return self.title
  
  
  class Comment(models.Model):
      movie = models.ForeignKey(Movie, on_delete=models.CASCADE)
      user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
      content = models.CharField(max_length=100)
  
      def __str__(self):
          return self.content
  
  ```

  

- forms.py

  ```python
  from django import forms
  from .models import Movie, Comment
  
  
  class MovieForm(forms.ModelForm):
  
      class Meta:
          model = Movie
          exclude = ('user',)
  
  class CommentForm(forms.ModelForm):
    
      class Meta:
          model = Comment
          fields = ('content',)
  ```

  

### accounts

- urls.py

  ```python
  from django.urls import path
  from . import views
  
  
  app_name = 'accounts'
  urlpatterns = [
      path('login/', views.login, name='login'),
      path('logout/', views.logout, name='logout'),
      path('signup/', views.signup, name='signup'),
      path('delete/', views.delete, name='delete'),
      path('update/', views.update, name='update'),
      path('password/', views.change_password, name='change_password'),
  ]
  
  ```



- views.py

  ```python
  from django.contrib.auth import login as auth_login
  from django.contrib.auth import logout as auth_logout
  from django.contrib.auth import update_session_auth_hash
  from django.contrib.auth.decorators import login_required
  from django.contrib.auth.forms import (
      AuthenticationForm, 
      UserCreationForm, 
      PasswordChangeForm,
  )
  from django.views.decorators.http import require_http_methods, require_POST
  from django.shortcuts import render, redirect
  from .forms import CustomUserChangeForm, CustomUserCreationForm
  
  # Create your views here.
  @require_http_methods(['GET', 'POST'])
  def login(request):
      if request.user.is_authenticated:
          return redirect('movies:index')
  
      if request.method == 'POST':
          form = AuthenticationForm(request, request.POST)
          if form.is_valid():
              # 로그인
              auth_login(request, form.get_user())
              return redirect(request.GET.get('next') or 'movies:index')
      else:
          form = AuthenticationForm()
      context = {
          'form': form,
      }
      return render(request, 'accounts/login.html', context)
  
  
  @require_POST
  def logout(request):
      if request.user.is_authenticated:
          auth_logout(request)
      return redirect('movies:index')
  
  
  @require_http_methods(['GET', 'POST'])
  def signup(request):
      if request.user.is_authenticated:
          return redirect('movies:index')
  
      if request.method == 'POST':
          form = CustomUserCreationForm(request.POST)
          if form.is_valid():
              user = form.save()
              auth_login(request, user)
              return redirect('movies:index')
      else:
          form = CustomUserCreationForm()
      context = {
          'form': form,
      }
      return render(request, 'accounts/signup.html', context)
  
  
  @require_POST
  def delete(request):
      if request.user.is_authenticated:
          # 반드시 회원탈퇴 후 로그아웃 함수 호출
          request.user.delete()
          auth_logout(request)
      return redirect('movies:index')
  
  
  @login_required
  @require_http_methods(['GET', 'POST'])
  def update(request):
      if request.method == 'POST':
          form = CustomUserChangeForm(request.POST, instance=request.user)
          if form.is_valid():
              form.save()
              return redirect('movies:index')
      else:
          form = CustomUserChangeForm(instance=request.user)
      context = {
          'form': form,
      }
      return render(request, 'accounts/update.html', context)
  
  
  @login_required
  @require_http_methods(['GET', 'POST'])
  def change_password(request):
      if request.method == 'POST':
          form = PasswordChangeForm(request.user, request.POST)
          if form.is_valid():
              form.save()
              update_session_auth_hash(request, form.user)
              return redirect('movies:index')
      else:
          form = PasswordChangeForm(request.user)
      context = {
          'form': form,
      }
      return render(request, 'accounts/change_password.html', context)
  
  ```



- forms.py

  ```python
  from django.contrib.auth.forms import UserChangeForm, UserCreationForm
  from django.contrib.auth import get_user_model
  
  
  class CustomUserChangeForm(UserChangeForm):
  
      # password = None
  
      class Meta:
          model = get_user_model() # User
          fields = ('email', 'first_name', 'last_name',)
  
  
  class CustomUserCreationForm(UserCreationForm):
  
      class Meta(UserCreationForm.Meta):
          model = get_user_model()
          fields = UserCreationForm.Meta.fields + ('email',)
  
  ```

  