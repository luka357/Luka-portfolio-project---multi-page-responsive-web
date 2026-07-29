from django.db import models

class Watch(models.Model):
    name = models.CharField(max_length=100)
    price = models.DecimalField(max_digits=8, decimal_places=2)
    description = models.TextField(blank=True)
    image_url = models.URLField(blank=True)
    in_stock = models.BooleanField(default=True)

    def __str__(self):
        return self.name