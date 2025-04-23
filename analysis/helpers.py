import cv2
import numpy as np

import os
prototxt_path = "media/models/deploy.prototxt"
caffemodel_path = "media/models/res10_300x300_ssd_iter_140000.caffemodel"

face_net = cv2.dnn.readNetFromCaffe(prototxt_path, caffemodel_path)
def check_blurriness(image):
    gray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)
    variance = cv2.Laplacian(gray, cv2.CV_64F).var()
    return variance < 60  

def analyze_face(image):
    h, w = image.shape[:2]

    resized_image = cv2.resize(image, (320, 320))
    blob = cv2.dnn.blobFromImage(resized_image, scalefactor=1.0, size=(300, 300), mean=(104.0, 177.0, 123.0))

    face_net.setInput(blob)
    detections = face_net.forward()

    if detections.shape[2] == 0:
        return {"face_visibility_score": 0, "issues": ["No face detected"], "suggestions": ["Ensure your face is visible"]}

    for i in range(detections.shape[2]):
        confidence = detections[0, 0, i, 2]
        if confidence < 0.5: 
            continue

        box = detections[0, 0, i, 3:7] * np.array([w, h, w, h])
        x, y, x_max, y_max = box.astype("int")
        x, y = max(0, x), max(0, y)
        x_max, y_max = min(w, x_max), min(h, y_max)

        face_width, face_height = x_max - x, y_max - y
        face_center_x, face_center_y = (x + x_max) // 2, (y + y_max) // 2

        image_center_x, image_center_y = w // 2, h // 2

        x_threshold = w * 0.04 
        y_threshold = h * 0.04 

        x_deviation = face_center_x - image_center_x
        y_deviation = face_center_y - image_center_y

        is_centered_x = abs(x_deviation) <= x_threshold
        is_centered_y = abs(y_deviation) <= y_threshold
        is_centered = is_centered_x and is_centered_y

        face_area_ratio = (face_width * face_height) / (w * h)
        is_too_small = face_area_ratio < 0.15
        is_too_large = face_area_ratio > 0.65

        face_region = image[y:y_max, x:x_max]
        is_blurry = check_blurriness(face_region)

        issues, suggestions = [], []
        score = 100

        if not is_centered:
            issues.append("Face is not centered")
            score -= 20
            if x_deviation > x_threshold:
                suggestions.append("Move your face slightly to the left")
            elif x_deviation < -x_threshold:
                suggestions.append("Move your face slightly to the right")
                
            if y_deviation > y_threshold:
                suggestions.append("Move your face slightly up")
            elif y_deviation < -y_threshold:
                suggestions.append("Move your face slightly down")

        if is_too_small:
            issues.append("Face is too small")
            suggestions.append("Move closer to the camera")
            score -= 25
        
        if is_too_large:
            issues.append("Face is too large")
            suggestions.append("Move slightly back from the camera")
            score -= 15

        if is_blurry:
            issues.append("Image is blurry")
            suggestions.append("Use a higher-resolution camera or better lighting")
            score -= 30
        print(suggestions)
        return {
            "face_visibility_score": max(score, 0),
            "issues": issues if issues else [],
            "suggestions": suggestions
        }

def detect_background(image):
    hsv = cv2.cvtColor(image, cv2.COLOR_BGR2HSV)
    color_variance = np.var(hsv[:, :, 1])
    unique_colors = len(np.unique(image.reshape(-1, 3), axis=0))

    edges = cv2.Canny(cv2.cvtColor(image, cv2.COLOR_BGR2GRAY), 50, 150)
    edge_density = np.sum(edges > 0) / (image.shape[0] * image.shape[1])

    if color_variance < 20 and edge_density < 0.02 and unique_colors < 100:
        return "Plain", 100, []
    elif color_variance < 40 and edge_density < 0.05:
        return "Slightly Distracting", 70, ["Use a more neutral background."]
    else:
        return "Highly Distracting", 40, ["Choose a solid background or blur it."]

    
def analyze_lighting(image):
    gray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)
    brightness = np.mean(gray)
    shadow_mask = cv2.Canny(gray, 50, 150)
    shadow_percentage = np.sum(shadow_mask > 0) / (gray.shape[0] * gray.shape[1])

    if brightness < 50:
        return "Too Dark", 40, ["Increase lighting or move to a well-lit area."]
    elif brightness > 200:
        return "Too Bright", 50, ["Avoid direct light. Try softer lighting."]
    elif shadow_percentage > 0.08:
        return "Uneven Lighting", 60, ["Adjust angle to reduce shadows."]
    else:
        return "Balanced", 100, []


import cv2
import mediapipe as mp

mp_face_mesh = mp.solutions.face_mesh
face_mesh = mp_face_mesh.FaceMesh(
    static_image_mode=True, max_num_faces=1, min_detection_confidence=0.5
)

def analyze_expression(image):
    h, w, _ = image.shape
    image_rgb = cv2.cvtColor(image, cv2.COLOR_BGR2RGB)
    results = face_mesh.process(image_rgb)

    if not results.multi_face_landmarks:
        return "Face Not Detected", 0, ["Ensure your face is visible in the image."]

    face_landmarks = results.multi_face_landmarks[0].landmark

    mouth_landmarks = [61, 291, 13, 14] 
    eye_landmarks = [159, 145, 386, 374]  

    def landmark_to_coords(landmark):
        return int(landmark.x * w), int(landmark.y * h)

    try:
        left_x, left_y = landmark_to_coords(face_landmarks[mouth_landmarks[0]])
        right_x, right_y = landmark_to_coords(face_landmarks[mouth_landmarks[1]])
        upper_x, upper_y = landmark_to_coords(face_landmarks[mouth_landmarks[2]])
        lower_x, lower_y = landmark_to_coords(face_landmarks[mouth_landmarks[3]])

        left_eye_top_y = int(face_landmarks[eye_landmarks[0]].y * h)
        left_eye_bottom_y = int(face_landmarks[eye_landmarks[1]].y * h)
        right_eye_top_y = int(face_landmarks[eye_landmarks[2]].y * h)
        right_eye_bottom_y = int(face_landmarks[eye_landmarks[3]].y * h)
    except (KeyError, IndexError):
        return "Face Not Fully Visible", 0, ["Ensure your entire face is clearly visible."]

    mouth_width = abs(right_x - left_x)
    mouth_height = abs(lower_y - upper_y)


    face_width = abs(right_x - left_x) * 2
    smile_ratio = mouth_height / face_width  

    left_eye_openness = (left_eye_bottom_y - left_eye_top_y) / face_width
    right_eye_openness = (right_eye_bottom_y - right_eye_top_y) / face_width
    avg_eye_openness = (left_eye_openness + right_eye_openness) / 2

    lip_mid_y = (upper_y + lower_y) / 2
    mouth_mid_y = (left_y + right_y) / 2
    lip_curve = lip_mid_y - mouth_mid_y  

    suggestions = []

    if smile_ratio > 0.18 and lip_curve > 1.5 and avg_eye_openness > 0.015:
        expression = "Overly Smiling"
        score = 60
        suggestions.append("Use a slight smile for a professional look.")
    elif 0.10 < smile_ratio <= 0.18 and lip_curve > 1 and avg_eye_openness > 0.01:
        expression = "Formal Smile"
        score = 100
        suggestions.append("This is a perfect professional smile!")
    elif 0.05 < smile_ratio <= 0.10:
        expression = "Neutral"
        score = 50
        suggestions.append("A slight smile can make your profile picture more inviting.")
    else:
        expression = "Serious or Frowning"
        score = 40
        suggestions.append("Try adding a slight smile for a more approachable appearance.")

    if avg_eye_openness > 0.018:
        eye_suggestion = "Eyes Wide Open – Maintain a natural look to avoid looking surprised."
    elif 0.009 < avg_eye_openness <= 0.018:
        eye_suggestion = "Good Eye Contact – Your eyes look natural and professional."
    else:
        eye_suggestion = "Eyes Too Closed – Try opening your eyes slightly wider for a more engaging look."

    suggestions.append(eye_suggestion)

    return expression, score, suggestions


    
import concurrent.futures
import skimage.measure

def compute_sharpness(image_gray):
    return cv2.Laplacian(image_gray, cv2.CV_64F).var()

def compute_pixelation(image, w, h):
    entropy = skimage.measure.shannon_entropy(image)
    return entropy

def compute_contrast(image_gray):
    return np.std(image_gray)

def compute_noise(image_gray):
    return cv2.Laplacian(image_gray, cv2.CV_64F).std()

def compute_brightness(image_gray):
    return np.mean(image_gray)

def analyze_image_quality(image):
    h, w, _ = image.shape
    resolution = f"{w}x{h}"
    image_gray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)

    with concurrent.futures.ThreadPoolExecutor() as executor:
        sharpness_future = executor.submit(compute_sharpness, image_gray)
        pixelation_future = executor.submit(compute_pixelation, image, w, h)
        contrast_future = executor.submit(compute_contrast, image_gray)
        noise_future = executor.submit(compute_noise, image_gray)
        brightness_future = executor.submit(compute_brightness, image_gray)

        sharpness_score = min(max(int(sharpness_future.result() * 10), 0), 100)
        pixelation_score = min(max(int(pixelation_future.result() * 10), 0), 100)
        contrast_score = min(max(int(contrast_future.result() * 10), 0), 100)
        noise_score = min(max(int(noise_future.result() * 10), 0), 100)
        brightness_score = min(max(int(brightness_future.result() / 2.55), 0), 100)  # Normalize to 0-100

    suggestions = []

    if sharpness_score < 30:
        suggestions.append("The image appears blurry. Use a sharper image or improve focus.")

    if pixelation_score < 50:
        suggestions.append("The image is pixelated. Try using a higher-resolution version.")

    if contrast_score < 30:
        suggestions.append("The image has low contrast. Increase contrast to enhance visibility.")

    if noise_score > 60:
        suggestions.append("The image has high noise levels. Use better lighting or a higher-quality camera.")

    if brightness_score < 30:
        suggestions.append("The image is too dark. Increase brightness or adjust lighting conditions.")
    elif brightness_score > 80:
        suggestions.append("The image is too bright. Reduce exposure for better clarity.")

    return {
        "resolution": resolution,
        "sharpness_score": sharpness_score,
        "pixelation_score": pixelation_score,
        "contrast_score": contrast_score,
        "noise_score": noise_score,
        "brightness_score": brightness_score,
        "suggestions": suggestions,
    }