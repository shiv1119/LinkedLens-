from django.urls import path
from .views import ProfilePhotoAnalysisAPI

urlpatterns = [
    path("analyze/", ProfilePhotoAnalysisAPI.as_view(), name="analyze-profile-photo"),
]
