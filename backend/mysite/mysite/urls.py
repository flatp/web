# coding: utf-8

from django.urls import re_path as url
from django.conf.urls import include
from django.contrib import admin

from shisha.urls import router as shisha_router

urlpatterns = [
    url(r'^admin/', admin.site.urls),
    # blog.urlsをincludeする
    url(r'^api/', include(shisha_router.urls)),
]
