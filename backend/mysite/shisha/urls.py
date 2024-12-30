# coding: utf-8

from rest_framework import routers
from .views import UserViewSet, ShopViewSet, PostViewSet, LogoutView
from django.urls import path, include
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
    TokenVerifyView,
)

router = routers.DefaultRouter()
router.register(r'users', UserViewSet)
router.register(r'shops', ShopViewSet)
router.register(r'posts', PostViewSet)


urlpatterns = [
    # JWT用エンドポイント
    path('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),  # ログイン
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),  # トークンリフレッシュ
    path('api/token/verify/', TokenVerifyView.as_view(), name='token_verify'),  # トークン確認
    path('api/logout/', LogoutView.as_view(), name='logout'),

    # ルーターのエンドポイントを含む
    path('api/', include(router.urls)),
]