from django.urls import path, re_path
from . import views


urlpatterns = [
    path("inform/<int:id>/", views.inform),
    # neLat, neLng, swLat, swLng
    re_path(r"^stations/(?P<neLat>[-\d.]+)/(?P<neLng>[-\d.]+)/(?P<swLat>[-\d.]+)/(?P<swLng>[-\d.]+)/$",views.stations),
    path('map/<int:z>/<int:x>/<int:y>.pbf/', views.map_tile)
    ]
