# coding: utf-8

from rest_framework import routers
from .views import UserViewSet, ShopViewSet, PostViewSet


router = routers.DefaultRouter()
router.register(r'users', UserViewSet)
router.register(r'shops', ShopViewSet)
router.register(r'posts', PostViewSet)
