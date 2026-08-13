from django.urls import path
from .views import (
    WatchListCreateView,
    WatchRetrieveUpdateDestroyView,
    CategoryListCreateView,
    ContactCreateView,
    RegisterView
)

urlpatterns = [
    # საათები
    path('watches/', WatchListCreateView.as_view(), name='watch-list-create'),
    path('watches/<int:pk>/', WatchRetrieveUpdateDestroyView.as_view(), name='watch-detail'),

    # კატეგორიები
    path('categories/', CategoryListCreateView.as_view(), name='category-list-create'),

    # საკონტაქტო შეტყობინება
    path('contact/', ContactCreateView.as_view(), name='contact-create'),

    # რეგისტრაცია
    path('register/', RegisterView.as_view(), name='register'),
]