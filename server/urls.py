from django.urls import path
from . import views


urlpatterns = [
    path("inform/<int:id>/", views.inform),
    path("stations/",views.stations),
    path('map/<int:z>/<int:x>/<int:y>.pbf/', views.map_tile)
    ]
