from django.urls import path
from .views import WatchListCreateView, WatchRetrieveUpdateDestroyView, CategoryListCreateView

urlpatterns = [
    path('watches/', WatchListCreateView.as_view(), name='watch-list-create'),
    path('watches/<int:pk>/', WatchRetrieveUpdateDestroyView.as_view(), name='watch-detail'),
    path('categories/', CategoryListCreateView.as_view(), name='category-list-create'),
]