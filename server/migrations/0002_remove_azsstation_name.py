# Generated by Django 4.1.7 on 2023-03-26 07:44

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('server', '0001_initial'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='azsstation',
            name='name',
        ),
    ]
