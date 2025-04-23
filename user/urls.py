from django.urls import path
from .views import *

urlpatterns = [
    path('register/', RegisterView.as_view(), name='register'),
    path('token/', CustomTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('refresh/', CustomTokenRefreshView.as_view(), name='token_refresh'),
    path('profile/<int:pk>/', UserProfileView.as_view(), name='profile'),
    path("update-profile/", ProfileUpdateView.as_view(), name="update-profile"),
]
