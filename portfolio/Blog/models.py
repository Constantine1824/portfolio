from django.db import models
from cloudinary.models import CloudinaryField
from django.utils.text import slugify
from django_ckeditor_5.fields import CKEditor5Field
import random

class BlogPost(models.Model):
    title = models.CharField(max_length=200)
    slug = models.SlugField(unique=True, blank=True)
    content = CKEditor5Field('Content', config_name='extends')
    image = CloudinaryField('image', blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    is_published = models.BooleanField(default=True)

    def __str__(self):
        return self.title

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.title)
            original_slug = self.slug
            counter = 1
            if BlogPost.objects.filter(slug=self.slug).exists():
                rnt = random.randint(1, 50)
                self.slug = f"{original_slug}-{rnt}"
        super().save(*args, **kwargs)

    class Meta:
        ordering = ['-created_at']
