# coding: utf-8

from rest_framework import viewsets
from rest_framework.response import Response
from rest_framework.decorators import action

from .models import User, Shop, Post
from .serializer import UserSerializer, ShopSerializer, PostSerializer


class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer

    @action(detail=True, methods=['post'], url_path='follow')
    def follow_user(self, request, pk=None):
        target_user_id = request.data.get('target_user_id')
        user = self.get_object()
        target_user = User.objects.get(pk=target_user_id)
        
        if target_user not in user.following.all():
            user.following.add(target_user)
            return Response({"detail": f"{target_user.name}をフォローしました。"}, status=status.HTTP_200_OK)
        return Response({"detail": "既にフォローしています。"}, status=status.HTTP_400_BAD_REQUEST)
    
    @action(detail=True, methods=['post'], url_path='unfollow')
    def unfollow_user(self, request, pk=None):
        target_user_id = request.data.get('target_user_id')
        user = self.get_object()
        target_user = User.objects.get(pk=target_user_id)
        
        if target_user in user.following.all():
            user.following.remove(target_user)
            return Response({"detail": f"{target_user.name}のフォローを取り消しました。"}, status=status.HTTP_200_OK)
        return Response({"detail": "フォローしていません。"}, status=status.HTTP_400_BAD_REQUEST)


class ShopViewSet(viewsets.ModelViewSet):
    queryset = Shop.objects.all()
    serializer_class = ShopSerializer

class PostViewSet(viewsets.ModelViewSet):
    queryset = Post.objects.all().order_by('-id')
    serializer_class = PostSerializer

    @action(detail=False, methods=['get'], url_path='user-posts/(?P<user_id>[^/.]+)')
    def user_posts(self, request, user_id=None):
        posts = Post.objects.filter(user__id=user_id).order_by('-id')
        serializer = self.get_serializer(posts, many=True)
        return Response(serializer.data)

    @action(detail=False, methods=['get'], url_path='following-posts/(?P<user_id>[^/.]+)')
    def following_posts(self, request, user_id=None):
        user = User.objects.get(pk=user_id)
        following_users = user.following.all()
        posts = Post.objects.filter(user__in=following_users).order_by('-id')
        serializer = self.get_serializer(posts, many=True)
        return Response(serializer.data)
    
    @action(detail=True, methods=['post'], url_path='like')
    def like_post(self, request, pk=None):
        user_id = request.data.get('user_id')
        post = self.get_object()
        user = User.objects.get(pk=user_id)
        
        if user not in post.liked.all():
            post.liked.add(user)
            return Response({"detail": "投稿をいいねしました。"}, status=status.HTTP_200_OK)
        return Response({"detail": "既にいいねしています。"}, status=status.HTTP_400_BAD_REQUEST)

    @action(detail=True, methods=['post'], url_path='unlike')
    def unlike_post(self, request, pk=None):
        user_id = request.data.get('user_id')
        post = self.get_object()
        user = User.objects.get(pk=user_id)
        
        if user in post.liked.all():
            post.liked.remove(user)
            return Response({"detail": "いいねを取り消しました。"}, status=status.HTTP_200_OK)
        return Response({"detail": "いいねしていません。"}, status=status.HTTP_400_BAD_REQUEST)
