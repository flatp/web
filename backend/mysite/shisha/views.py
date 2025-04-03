# coding: utf-8

from rest_framework import viewsets, status
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.decorators import action
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework_simplejwt.tokens import RefreshToken
from django_filters.rest_framework import DjangoFilterBackend, FilterSet
from django.db.models import Count
from .models import User, Shop, Post
from .serializer import UserSerializer, ShopSerializer, PostSerializer

class LogoutView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        try:
            refresh_token = request.data.get("refresh")
            token = RefreshToken(refresh_token)
            token.blacklist()  # リフレッシュトークンをブラックリストに追加
            return Response({"message": "Successfully logged out"}, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)
        
class ShopFilter(FilterSet):
    class Meta:
        model = Shop
        fields = {
            'name': ['icontains'], 
            'location': ['icontains'], 
            # 'mouth': ['exact'],
            # 'goods': ['exact'],
        }

class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer

    def get_permissions(self):
        # 作成時は誰でもアクセス可能、それ以外は認証が必要
        if self.action in ['create']:
            return [AllowAny()]
        return [IsAuthenticated()]

    def perform_create(self, serializer):
        # パスワードをハッシュ化して保存
        serializer.save()

    def perform_update(self, serializer):
        # 更新時も同様にハッシュ化を行う
        serializer.save()

    # @action(detail=True, methods=['post'], url_path='follow')
    # def follow_user(self, request, pk=None):
    #     target_user_id = request.data.get('target_user_id')
    #     user = self.get_object()
    #     target_user = User.objects.get(pk=target_user_id)
        
    #     if target_user not in user.following.all():
    #         user.following.add(target_user)
    #         return Response({"detail": f"{target_user.name}をフォローしました。"}, status=status.HTTP_200_OK)
    #     return Response({"detail": "既にフォローしています。"}, status=status.HTTP_400_BAD_REQUEST)
    @action(detail=True, methods=['post'], url_path='follow')
    def follow_user(self, request, pk=None):
        user = request.user
        target_user = self.get_object()

        if user == target_user:
            return Response({"detail": "自分自身をフォローすることはできません。"}, status=status.HTTP_400_BAD_REQUEST)
        if target_user not in user.following.all():
            user.following.add(target_user)
            return Response({"detail": f"{target_user.name}をフォローしました。"}, status=status.HTTP_200_OK)
        return Response({"detail": "既にフォローしています。"}, status=status.HTTP_400_BAD_REQUEST)
    
    # @action(detail=True, methods=['post'], url_path='unfollow')
    # def unfollow_user(self, request, pk=None):
    #     target_user_id = request.data.get('target_user_id')
    #     user = self.get_object()
    #     target_user = User.objects.get(pk=target_user_id)
        
    #     if target_user in user.following.all():
    #         user.following.remove(target_user)
    #         return Response({"detail": f"{target_user.name}のフォローを取り消しました。"}, status=status.HTTP_200_OK)
    #     return Response({"detail": "フォローしていません。"}, status=status.HTTP_400_BAD_REQUEST)
    @action(detail=True, methods=['post'], url_path='unfollow')
    def unfollow_user(self, request, pk=None):
        user = request.user
        target_user = self.get_object()

        if target_user in user.following.all():
            user.following.remove(target_user)
            return Response({"detail": f"{target_user.name}のフォローを取り消しました。"}, status=status.HTTP_200_OK)
        return Response({"detail": "フォローしていません。"}, status=status.HTTP_400_BAD_REQUEST)


class ShopViewSet(viewsets.ModelViewSet):
    queryset = Shop.objects.all()
    serializer_class = ShopSerializer
    filter_backends = [DjangoFilterBackend]
    filterset_class = ShopFilter

class PostViewSet(viewsets.ModelViewSet):
    queryset = Post.objects.all().order_by('-id')
    serializer_class = PostSerializer

    # @action(detail=False, methods=['get'], url_path='user-posts/(?P<user_id>[^/.]+)')
    # def user_posts(self, request, user_id=None):
    #     posts = Post.objects.filter(user__id=user_id).order_by('-id')
    #     serializer = self.get_serializer(posts, many=True)
    #     return Response(serializer.data)
    @action(detail=False, methods=['get'], url_path='user-posts')
    def user_posts(self, request):
        user = request.user
        posts = Post.objects.filter(user__id=user.id).order_by('-id')
        serializer = self.get_serializer(posts, many=True)
        return Response(serializer.data)

    # @action(detail=False, methods=['get'], url_path='following-posts/(?P<user_id>[^/.]+)')
    # def following_posts(self, request, user_id=None):
    #     user = User.objects.get(pk=user_id)
    #     following_users = user.following.all()
    #     all_users = list(following_users) + [user]
    #     posts = Post.objects.filter(user__in=all_users).order_by('-id')
    #     serializer = self.get_serializer(posts, many=True)
    #     return Response(serializer.data)
    @action(detail=False, methods=['get'], url_path='following-posts')
    def following_posts(self, request):
        user = request.user
        following_users = user.following.all()
        all_users = list(following_users) + [user]
        posts = Post.objects.filter(user__in=all_users).order_by('-id')
        serializer = self.get_serializer(posts, many=True)
        return Response(serializer.data)
    
    @action(detail=True, methods=['post'], url_path='like')
    def like_post(self, request, pk=None):
        # user_id = request.data.get('user_id')
        user = request.user
        post = self.get_object()
        user = User.objects.get(pk=user.id)
        
        if user not in post.liked.all():
            post.liked.add(user)
            return Response({"detail": "投稿をいいねしました。"}, status=status.HTTP_200_OK)
        return Response({"detail": "既にいいねしています。"}, status=status.HTTP_400_BAD_REQUEST)

    @action(detail=True, methods=['post'], url_path='unlike')
    def unlike_post(self, request, pk=None):
        # user_id = request.data.get('user_id')
        user = request.user
        post = self.get_object()
        user = User.objects.get(pk=user.id)
        
        if user in post.liked.all():
            post.liked.remove(user)
            return Response({"detail": "いいねを取り消しました。"}, status=status.HTTP_200_OK)
        return Response({"detail": "いいねしていません。"}, status=status.HTTP_400_BAD_REQUEST)
    
    # @action(detail=False, methods=['get'], url_path='liked-posts/(?P<user_id>[^/.]+)')
    # def liked_posts(self, request, user_id=None):
    #     posts = Post.objects.filter(liked__id=user_id).order_by('-id')
    #     serializer = self.get_serializer(posts, many=True)
    #     return Response(serializer.data)
    @action(detail=False, methods=['get'], url_path='liked-posts')
    def liked_posts(self, request):
        user = request.user
        posts = Post.objects.filter(liked__id=user.id).order_by('-id')
        serializer = self.get_serializer(posts, many=True)
        return Response(serializer.data)
    
    @action(detail=False, methods=['get'], url_path='popular-posts')
    def popular_posts(self, request):
        limit = int(request.query_params.get('limit', 10))
        shop_id = request.query_params.get('shop_id')
        posts = Post.objects.annotate(like_count=Count('liked')).order_by('-like_count')

        if shop_id:
            posts = posts.filter(shop_id=shop_id)
        posts = posts[:limit]
        serializer = self.get_serializer(posts, many=True)
        return Response(serializer.data)
    
    @action(detail=False, methods=['post'], url_path='create')
    def create_post(self, request, pk=None):
        user = request.user
        id = request.data.get('id')
        name = request.data.get('name')
        shop_id = request.data.get('shop_id')
        memo = request.data.get('memo')
        shop = Shop.objects.get(pk=shop_id)

        post = Post.objects.create(
            id=id,
            user=user,
            name=name,
            shop=shop,
            memo=memo
        )

        return Response(
            {"detail": f"投稿 '{post.name}' が作成されました。"},
            status=status.HTTP_201_CREATED
        )
