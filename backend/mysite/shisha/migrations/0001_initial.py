# Generated by Django 5.0.4 on 2024-12-19 17:21

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = []

    operations = [
        migrations.CreateModel(
            name="Shop",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                ("name", models.CharField(help_text="店名", max_length=32)),
                ("url", models.URLField(blank=True, null=True)),
                (
                    "location",
                    models.CharField(blank=True, default="", max_length=8, null=True),
                ),
                ("mood", models.TextField(blank=True, default="", null=True)),
                ("time", models.TextField(blank=True, default="", null=True)),
                ("mouth", models.BooleanField()),
                ("goods", models.BooleanField()),
            ],
        ),
        migrations.CreateModel(
            name="User",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                ("name", models.CharField(max_length=32)),
                ("mail", models.EmailField(max_length=254)),
                (
                    "following",
                    models.ManyToManyField(
                        blank=True, related_name="followed_by", to="shisha.user"
                    ),
                ),
            ],
        ),
        migrations.CreateModel(
            name="Post",
            fields=[
                ("id", models.IntegerField(primary_key=True, serialize=False)),
                ("name", models.CharField(help_text="フレーバー名", max_length=32)),
                (
                    "memo",
                    models.TextField(
                        blank=True,
                        default="",
                        help_text="本文",
                        max_length=1024,
                        null=True,
                    ),
                ),
                (
                    "shop",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.CASCADE,
                        related_name="posts",
                        to="shisha.shop",
                    ),
                ),
                (
                    "liked",
                    models.ManyToManyField(
                        blank=True, related_name="like", to="shisha.user"
                    ),
                ),
                (
                    "user",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.CASCADE,
                        related_name="posts",
                        to="shisha.user",
                    ),
                ),
            ],
        ),
    ]
