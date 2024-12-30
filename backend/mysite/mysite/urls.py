# coding: utf-8

from django.urls import path, re_path as url
from django.conf.urls import include
from django.contrib import admin

from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
    TokenVerifyView,
)

from shisha.urls import router as shisha_router

urlpatterns = [
    url(r'^admin/', admin.site.urls),
    path('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('api/token/verify/', TokenVerifyView.as_view(), name='token_verify'),
    url(r'^api/', include(shisha_router.urls)),
]
