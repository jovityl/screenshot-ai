from django.urls import path
from .views import health, captured_text, delete_text

urlpatterns = [
    path("health/", health),
    path("captured-text/", captured_text),
    path("captured-text/<int:pk>/", delete_text), 
]
