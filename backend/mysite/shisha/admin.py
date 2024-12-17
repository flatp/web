from django.contrib import admin

from .models import User, Shop, Post


@admin.register(User)
class User(admin.ModelAdmin):
    pass

@admin.register(Shop)
class Shop(admin.ModelAdmin):
    pass

@admin.register(Post)
class Post(admin.ModelAdmin):
    pass
