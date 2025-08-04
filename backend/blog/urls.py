from django.urls import path
from .views import register, login, logout, refresh_token, create_post, list_posts, get_post_detail, update_post, delete_post

urlpatterns = [
    path('register/', register),
    path('login/', login),
    path('logout/', logout),
    path('token/refresh/', refresh_token),
    path('posts/', list_posts),
    path('posts/<int:post_id>/', get_post_detail),
    path('posts/create/', create_post),
    path('posts/<int:post_id>/update/', update_post),
    path('posts/<int:post_id>/delete/', delete_post),

]