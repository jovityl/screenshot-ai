from django.db import models
from django.contrib.auth.models import User

# Create your models here.
class CapturedText(models.Model):
    owner = models.ForeignKey(User, on_delete=models.CASCADE, related_name="captured_texts", null=True, blank=True)
    content = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ["-created_at"]

    def __str__(self):
        return f"{self.owner.username}: {self.content[:30]}"
