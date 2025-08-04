from django.db import models
from django.contrib.auth.models import AbstractUser

class User(AbstractUser):
    pass  # We extend in case we need custom fields later

class Post(models.Model):
    title = models.CharField(max_length=200)
    content = models.TextField()
    author = models.ForeignKey(User, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.title
