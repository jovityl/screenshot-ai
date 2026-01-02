from django.contrib.auth import get_user_model
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response
from rest_framework import status
from .models import CapturedText
from .serializers import CapturedTextSerializer, RegisterSerializer
from django.shortcuts import get_object_or_404


User = get_user_model()

@api_view(["GET"])
@permission_classes([AllowAny])
def health(request):
    return Response({"status": "ok"})

@api_view(["POST"])
@permission_classes([AllowAny])
def register(request):
    serializer = RegisterSerializer(data=request.data)
    serializer.is_valid(raise_exception=True)
    serializer.save()
    return Response({"detail":"created"}, status=status.HTTP_201_CREATED)

@api_view(["GET", "POST"])
@permission_classes([IsAuthenticated])
def captured_text_list(request):
    if request.method == "GET":
        queryset = CapturedText.objects.filter(owner=request.user).order_by("-created_at")
        serializer = CapturedTextSerializer(queryset, many=True)
        return Response(serializer.data)

    if request.method == "POST":
        serializer = CapturedTextSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save(owner=request.user)
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    

@api_view(["PATCH", "DELETE"])
@permission_classes([IsAuthenticated])
def captured_text_detail(request, pk):
    obj = get_object_or_404(CapturedText, pk=pk, owner=request.user)

    if request.method == "PATCH":
        serializer = CapturedTextSerializer(obj, data=request.data, partial=True)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data)

    if request.method == "DELETE":
        obj.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)