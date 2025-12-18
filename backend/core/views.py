from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework import status

from .models import CapturedText
from .serializers import CapturedTextSerializer

@api_view(["GET"])
@permission_classes([AllowAny])
def health(request):
    return Response({"status": "ok"})

@api_view(["GET", "POST"])
@permission_classes([AllowAny])
def captured_text(request):
    if request.method == "POST":
        serializer = CapturedTextSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    if request.method =="GET":
        queryset = CapturedText.objects.order_by("-created_at")[:10]
        serializer = CapturedTextSerializer(queryset, many=True)
        return Response(serializer.data)
    
@api_view(["DELETE"])
@permission_classes([AllowAny])
def delete_text(request, pk):
    try:
        item = CapturedText.objects.get(pk=pk)
        item.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
    except CapturedText.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)