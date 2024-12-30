from django.contrib.auth.models import AbstractBaseUser, BaseUserManager
from django.db import models

class UserManager(BaseUserManager): 
    def create_user(self, email, name, password=None, following=None): 
        if not email: 
            raise ValueError('Users must have an email address') 
        user = self.model(email=self.normalize_email(email), name=name) 
        user.set_password(password) 
        user.save(using=self._db) 
        return user 
    def create_superuser(self, email, name, password=None, following=None): 
        user = self.create_user(email, name, password) 
        user.is_admin = True 
        user.save(using=self._db) 
        return user

class User(AbstractBaseUser): 
    email = models.EmailField(verbose_name='email address', max_length=255, unique=True) 
    name = models.CharField(max_length=32) 
    following = models.ManyToManyField("self", related_name="followed_by", symmetrical=False, blank=True) 
    is_active = models.BooleanField(default=True) 
    is_admin = models.BooleanField(default=False) 
    objects = UserManager() 
    USERNAME_FIELD = 'email' 
    REQUIRED_FIELDS = ['name']

    def has_perm(self, perm, obj=None): 
        return True 
    def has_module_perms(self, app_label): 
        return True 
    @property 
    def is_staff(self): 
        return self

# class User(models.Model):
#     name = models.CharField(max_length=32)
#     mail = models.EmailField()
#     following = models.ManyToManyField("self", related_name="followed_by", symmetrical=False, blank=True)

class Shop(models.Model):
    name = models.CharField(max_length=32, help_text="店名")
    url = models.URLField(null=True, blank=True)
    location = models.CharField(max_length=8, null=True, blank=True, default="")
    mood = models.TextField(null=True, blank=True, default="")
    time = models.TextField(null=True, blank=True, default="")
    mouth = models.BooleanField()
    goods = models.BooleanField()

class Tag(models.Model): name = models.CharField(max_length=32, unique=True)

class Post(models.Model):
    id = models.IntegerField(primary_key=True)
    user = models.ForeignKey(User, related_name='posts', on_delete=models.CASCADE)
    name = models.CharField(max_length=32, help_text="フレーバー名")
    shop = models.ForeignKey(Shop, related_name='posts', on_delete=models.CASCADE)
    memo = models.TextField(max_length=1024, help_text="本文", null=True, blank=True, default="")
    liked = models.ManyToManyField(User, related_name='like', blank=True)
    tags = models.ManyToManyField(Tag, related_name='posts', blank=True)

