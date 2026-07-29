from django.shortcuts import render
from rest_framework import generics
from .models import Watch
from .serializers import WatchSerializer
from rest_framework.permissions import IsAuthenticated

class WatchListCreateView(generics.ListCreateAPIView):
    queryset = Watch.objects.all()
    serializer_class = WatchSerializer
    permission_classes = [IsAuthenticated]

class WatchRetrieveUpdateDestroyView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Watch.objects.all()
    serializer_class = WatchSerializer
    permission_class = [IsAuthenticated]