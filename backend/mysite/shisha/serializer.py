# coding: utf-8

from rest_framework import serializers

from .models import User, Shop, Post


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('name', 'mail', 'following', 'like')


class ShopSerializer(serializers.ModelSerializer):
    class Meta:
        model = Shop
        fields = ('id', 'name', 'url', 'locate', 'mood', 'time', 'mouth', 'goods')

class PostSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)
    shop = ShopSerializer(read_only=True)
    class Meta:
        model = Post
        fields = ('id', 'user', 'name', 'shop', 'memo', 'liked')
