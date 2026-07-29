from django.urls import path
from .views import WatchListCreateView, WatchRetrieveUpdateDestroyView

urlpatterns = [
    path('watches/', WatchListCreateView.as_view(), name='watch-list-create'),
    path('watches/<int:pk>/', WatchRetrieveUpdateDestroyView.as_view(), name='watch-detail'),
]