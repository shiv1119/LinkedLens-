from rest_framework import serializers
from user.models import User
from .models import ProfilePhotoAnalysis

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username']

class ProfilePhotoAnalysisSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)  
    face_suggestions = serializers.CharField(allow_blank=True, allow_null=True, default="")
    background_suggestions = serializers.CharField(allow_blank=True, allow_null=True, default="")
    lighting_suggestions = serializers.CharField(allow_blank=True, allow_null=True, default="")
    expression_suggestions = serializers.CharField(allow_blank=True, allow_null=True, default="")
    image_quality_suggestions = serializers.CharField(allow_blank=True, allow_null=True, default="")

    class Meta:
        model = ProfilePhotoAnalysis
        fields = [
            'id',
            'user',
            'image',
        
            'face_detected',
            'face_centered',
            'face_score',
            'face_suggestions',

            'background_clarity',
            'background_suggestions',

            'lighting_score',
            'lighting_suggestions',
            
            # Facial Expression Analysis
            'smile_score',
            'expression_suggestions',
            
            # Image Quality Analysis
            'resolution',
            'sharpness_score',
            'pixelation_score',
            'contrast_score',  # New field
            'noise_score',  # New field
            'brightness_score',  # New field
            'image_quality_suggestions',
            
            # Metadata
            'created_at',
            'updated_at'
        ]
        read_only_fields = ['created_at', 'updated_at']
