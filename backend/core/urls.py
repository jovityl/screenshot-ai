from django.urls import path
from .views import health, captured_text_list, captured_text_detail, register

urlpatterns = [
    path("health/", health),
    path("captured-text/", captured_text_list),
    path("captured-text/<int:pk>/", captured_text_detail), 
    path("auth/register/", register),
]
