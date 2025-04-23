from django.db import models
from django.conf import settings

class ProfilePhotoAnalysis(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    image = models.ImageField(upload_to="profile_photos/")
    face_detected = models.BooleanField(default=False)
    face_centered = models.BooleanField(default=False)
    face_score = models.IntegerField(default=0) 
    face_suggestions = models.TextField(null=True, blank=True)

    background_clarity = models.IntegerField(default=0) 
    background_suggestions = models.TextField(null=True, blank=True)

    lighting_score = models.IntegerField(default=0)
    lighting_suggestions = models.TextField(null=True, blank=True)

    smile_score = models.IntegerField(default=0)  
    expression_suggestions = models.TextField(null=True, blank=True)

    resolution = models.CharField(max_length=50, null=True, blank=True) 
    sharpness_score = models.IntegerField(default=0)
    pixelation_score = models.IntegerField(default=0) 
    contrast_score = models.IntegerField(default=0) 
    noise_score = models.IntegerField(default=0)
    brightness_score = models.IntegerField(default=0) 
    image_quality_suggestions = models.TextField(null=True, blank=True) 

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)  

    def __str__(self):
        return f"Profile Photo Analysis - {self.user.username} ({self.created_at.strftime('%Y-%m-%d %H:%M')})"
