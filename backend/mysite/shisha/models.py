from django.db import models


class User(models.Model):
    name = models.CharField(max_length=32)
    mail = models.EmailField()
    following = models.ManyToManyField("self", related_name="followed_by", symmetrical=False, blank=True)

class Shop(models.Model):
    id = models.IntegerField(primary_key=True)
    name = models.TextField()
    url = models.URLField(null=True, blank=True)
    locate = models.TextField(null=True, blank=True, default="")
    mood = models.TextField(null=True, blank=True, default="")
    time = models.TextField(null=True, blank=True, default="")
    mouth = models.BooleanField()
    goods = models.BooleanField()

class Post(models.Model):
    id = models.IntegerField(primary_key=True)
    user = models.ForeignKey(User, related_name='posts', on_delete=models.CASCADE)
    body = models.TextField()
    shop = models.ForeignKey(Shop, related_name='posts', on_delete=models.CASCADE)
    memo = models.TextField(null=True, blank=True, default="")
    liked = models.ManyToManyField(User, related_name='like', blank=True)
