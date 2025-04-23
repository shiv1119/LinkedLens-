import { getSession } from "next-auth/react";
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;
export const registerUser = async (formData) => {
    try {
        console.log("Request Payload:", JSON.stringify(formData));
        const response = await fetch(`${API_BASE_URL}/api/register/`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
        });

        console.log("Raw Response:", response);
        const data = await response.json();
        console.log("Parsed Response:", data);

        if (!response.ok) {
            return { success: false, errors: data.errors || { message: data.message || "Registration failed." } };
        }

        return { success: true, data };
    } catch {
        return { success: false, errors: { message: "Something went wrong. Please try again." } };
    }
};

export const updateProfile = async (formData, token) => {
    try {
        if (!token) {
            return { success: false, errors: { message: "Unauthorized: No access token provided." } };
        }
        console.log(formData)
        const response = await fetch(`${API_BASE_URL}/api/update-profile/`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`, 
            },
            body: JSON.stringify(formData),
        });

        const data = await response.json();

        if (!response.ok) {
            return { success: false, errors: data.errors || { message: data.message } };
        }

        return { success: true, data };
    } catch (error) {
        return { success: false, errors: { message: "Something went wrong. Please try again." } };
    }
};

export const AnalyzePhoto = async (formData, token) => {
    try {
        const response = await fetch(`${API_BASE_URL}/api/analyze/`, {
            method: "POST",
            body: formData,
            headers: {
                Authorization: `Bearer ${token}`, // Ensure token is passed
            },
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error analyzing photo:", error);
        return { error: "Failed to analyze the image" };
    }
};


