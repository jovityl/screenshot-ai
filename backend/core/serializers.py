from rest_framework import serializers 
from django.contrib.auth import get_user_model
from .models import CapturedText

User = get_user_model()

class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, min_length=8)

    class Meta:
        model = User
        fields = ["username", "password"]
    
    def create(self, validated_data):
        return User.objects.create_user(**validated_data)

class CapturedTextSerializer(serializers.ModelSerializer):
    class Meta:
        model = CapturedText
        fields = "__all__"
        read_only_fields = ["id", "created_at", "owner"]

    