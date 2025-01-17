# coding: utf-8

from rest_framework import serializers

from .models import User, Shop, Post


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'email', 'name', 'password', 'following', 'is_active', 'is_admin']
        read_only_fields = ['is_active', 'is_admin']

    def create(self, validated_data):
        password = validated_data.pop('password')
        user = User.objects.create_user(**validated_data, password=password)
        return user

    def update(self, instance, validated_data):
        password = validated_data.pop('password', None)
        for attr, value in validated_data.items():
            setattr(instance, attr, value)
        if password:
            instance.set_password(password)
        instance.save()
        return instance


class ShopSerializer(serializers.ModelSerializer):
    class Meta:
        model = Shop
        fields = '__all__'

class PostSerializer(serializers.ModelSerializer):
    # userid = serializers.PrimaryKeyRelatedField(
    #     queryset=User.objects.all(), source='user', write_only=True
    # )
    # shopid = serializers.PrimaryKeyRelatedField(
    #     queryset=Shop.objects.all(), source='shop', write_only=True
    # )
    # user = UserSerializer(read_only=True)
    # shop = ShopSerializer(read_only=True)
    class Meta:
        model = Post
        fields = '__all__'
