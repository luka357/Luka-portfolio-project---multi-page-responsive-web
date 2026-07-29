from rest_framework import serializers
from .models import Watch

class WatchSerializer(serializers.ModelSerializer):
    class Meta:
        model = Watch
        fields = [
            'id', 'name', 'price', 'description', 'image_url', 'in_stock'
        ]
        