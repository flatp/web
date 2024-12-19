# coding: utf-8

from rest_framework import serializers

from .models import User, Shop, Post


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = '__all__'


class ShopSerializer(serializers.ModelSerializer):
    class Meta:
        model = Shop
        fields = '__all__'

class PostSerializer(serializers.ModelSerializer):
    userid = serializers.PrimaryKeyRelatedField(
        queryset=User.objects.all(), source='user', write_only=True
    )
    shopid = serializers.PrimaryKeyRelatedField(
        queryset=Shop.objects.all(), source='shop', write_only=True
    )
    user = UserSerializer(read_only=True)
    shop = ShopSerializer(read_only=True)
    class Meta:
        model = Post
        fields = ('id', 'user', 'name', 'shop', 'memo', 'liked', 'userid', 'shopid')
