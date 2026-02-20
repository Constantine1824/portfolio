from django.db import models
from cloudinary.models import CloudinaryField

class About(models.Model):
    about = models.TextField()

    def __str__(self):
        return self.about
    

class Skills(models.Model):
    name = models.CharField(max_length=255, blank=False, null=False)
    skill_img = CloudinaryField('image')
    level = models.IntegerField()

    def __str__(self):
        return self.name
    
    class Meta:
        verbose_name_plural = 'Skills'

class Resume(models.Model):
    resume_link = models.URLField()

    def __str__(self):
        return f"Resume: {self.resume_link[:50]}..."

class MemeUpload(models.Model):
    meme = CloudinaryField('image')

    def __str__(self):
        return f"Meme #{self.pk}"

class Projects(models.Model):
    name = models.CharField(max_length=100, blank=False, null=False)
    description = models.TextField()
    github_link = models.URLField()
    live_link = models.URLField(blank=True)
    kaggle_link = models.URLField(blank=True, null=True)
    base_image = CloudinaryField('image')

    def __str__(self):
        return self.name

    class Meta:
        verbose_name_plural = 'Projects'

