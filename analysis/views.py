from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework.views import APIView
from rest_framework import status
import cv2
import numpy as np
import concurrent.futures
from .models import ProfilePhotoAnalysis
from .serializers import ProfilePhotoAnalysisSerializer
from .helpers import (
    analyze_face,
    detect_background,
    analyze_lighting,
    analyze_expression,
    analyze_image_quality,
)

class ProfilePhotoAnalysisAPI(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        image_file = request.FILES.get("image")
        if not image_file:
            return Response({"error": "No image uploaded"}, status=status.HTTP_400_BAD_REQUEST)

        try:
            file_bytes = np.frombuffer(image_file.read(), np.uint8)
            image = cv2.imdecode(file_bytes, cv2.IMREAD_COLOR)
            if image is None:
                raise ValueError("Invalid image format")
        except Exception as e:
            return Response({"error": f"Invalid image format: {str(e)}"}, status=status.HTTP_400_BAD_REQUEST)

        with concurrent.futures.ThreadPoolExecutor() as executor:
            futures = {
                "face": executor.submit(analyze_face, image),
                "background": executor.submit(detect_background, image),
                "lighting": executor.submit(analyze_lighting, image),
                "expression": executor.submit(analyze_expression, image),
                "quality": executor.submit(analyze_image_quality, image),
            }

        try:
            results = {key: future.result() for key, future in futures.items()}
        except Exception as e:
            return Response({"error": f"Analysis failed: {str(e)}"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

        print("Face Analysis Result:", results["face"])

        def format_suggestions(suggestions):
            if not suggestions:
                return "No suggestions"
            return ", ".join(suggestions) if isinstance(suggestions, list) else str(suggestions)

        face_suggestions = format_suggestions(results["face"].get("suggestions", []))

        face_centered = not any("Face is not centered" in issue for issue in results["face"].get("issues", []))

        resolution = results["quality"].get("resolution", "Unknown")
        sharpness_score = results["quality"].get("sharpness_score", 0)
        pixelation_score = results["quality"].get("pixelation_score", 0)
        contrast_score = results["quality"].get("contrast_score", 0)
        noise_score = results["quality"].get("noise_score", 0)
        brightness_score = results["quality"].get("brightness_score", 0)
        image_quality_suggestions = results["quality"].get("suggestions", "No suggestions")

        analysis = ProfilePhotoAnalysis.objects.create(
            user=request.user,
            image=image_file,
            face_detected=results["face"]["face_visibility_score"] > 0,
            face_centered=face_centered,
            face_suggestions=face_suggestions,
            face_score=results["face"]["face_visibility_score"],
            background_clarity=results["background"][1],
            background_suggestions=format_suggestions(results["background"][2]),
            lighting_score=results["lighting"][1],
            lighting_suggestions=format_suggestions(results["lighting"][2]),
            smile_score=results["expression"][1],
            expression_suggestions=format_suggestions(results["expression"][2]),
            resolution=resolution,
            sharpness_score=sharpness_score,
            pixelation_score=pixelation_score,
            contrast_score=contrast_score,
            noise_score=noise_score,
            brightness_score=brightness_score,
            image_quality_suggestions=image_quality_suggestions,
        )

        return Response(ProfilePhotoAnalysisSerializer(analysis).data, status=status.HTTP_201_CREATED)
