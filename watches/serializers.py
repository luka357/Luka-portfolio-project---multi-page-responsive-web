from rest_framework import serializers
from .models import Watch, Category

class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ['id', 'name']

class WatchSerializer(serializers.ModelSerializer):
    category = CategorySerializer(read_only=True)
    category_id = serializers.PrimaryKeyRelatedField(
        queryset=Category.objects.all(),
        source='category',
        write_only=True,
        allow_null=True,
        required=False
    )

    class Meta:
        model = Watch
        fields = [
            'id', 'name', 'price', 'description', 'image_url', 'in_stock', 'category', 'category_id']
        