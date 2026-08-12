from rest_framework import generics
from rest_framework.filters import OrderingFilter
from django_filters.rest_framework import DjangoFilterBackend
from .models import Watch, Category
from .serializers import WatchSerializer, CategorySerializer
from rest_framework.permissions import AllowAny, IsAuthenticated

class WatchListCreateView(generics.ListCreateAPIView):
    queryset = Watch.objects.all()
    serializer_class = WatchSerializer
    permission_classes = [AllowAny]
    filter_backends = [OrderingFilter, DjangoFilterBackend]
    ordering_fields = ['price', 'name']
    filterset_fields = ['category']

class WatchRetrieveUpdateDestroyView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Watch.objects.all()
    serializer_class = WatchSerializer
    permission_classes = [IsAuthenticated]

class CategoryListCreateView(generics.ListCreateAPIView):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer
    permission_classes = [AllowAny]