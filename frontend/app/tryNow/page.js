"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
import { AnalyzePhoto } from "@/utils/route";
import { FaCheckCircle, FaTimesCircle, FaInfoCircle, FaUpload } from "react-icons/fa";

export default function ProfilePhotoUploader() {
    const { data: session } = useSession();
    const [file, setFile] = useState(null);
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState(null);

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        if (!file) {
            alert("Please select an image");
            return;
        }
    
        const formData = new FormData();
        formData.append("image", file);
    
        setLoading(true);
        setResult(null);
    
        const token = session?.accessToken;
    
        if (!token) {
            alert("You need to be logged in to upload a photo.");
            setLoading(false);
            return;
        }
    
        const data = await AnalyzePhoto(formData, token);
        setResult(data);
        setLoading(false);
    };

    return (
        <div className="mt-12 flex flex-col items-center justify-center min-h-screen p-6">
            <div className="bg-white shadow-sm border border-0 add-row rounded-xl p-8 max-w-5xl w-full">
                <h2 className="text-2xl md:text-3xl font-semibold text-center text-gray-900">
                    Upload & Analyze Your Profile Photo
                </h2>
                
                <form onSubmit={handleSubmit} className="space-y-6 mt-6">
                    <label className="cursor-pointer flex flex-col items-center justify-center border border-gray-400 rounded-md py-10 px-6 bg-gray-50 hover:bg-gray-100 transition">
                        <FaUpload className="text-gray-600 text-3xl mb-3" />
                        <span className="text-gray-700">Click to Upload</span>
                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleFileChange}
                            className="hidden"
                        />
                    </label>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full py-3 px-4 rounded-md font-medium text-white bg-blue-600 hover:bg-blue-700 transition disabled:bg-gray-400"
                    >
                        {loading ? "Analyzing..." : "Upload & Analyze"}
                    </button>
                </form>
                
                {result && (
                    <div className="mt-8 bg-gray-50 p-6 rounded-lg shadow-md border border-gray-300">
                        <h3 className="text-2xl font-semibold text-gray-900 mb-6">Analysis Result</h3>
                        <div className="flex items-center space-x-6">
                            <img 
                                src={result.image} 
                                alt="Uploaded" 
                                className="w-36 h-36 object-cover rounded-md border border-gray-400 shadow-md"
                            />
                            <div>
                                <p className="text-gray-800"><strong>User:</strong> {result.user.username}</p>
                                <p className="text-gray-800"><strong>Resolution:</strong> {result.resolution}</p>
                            </div>
                        </div>
                        <div className="mt-6 space-y-5">
                            {[
                                { label: "Face Score", value: result.face_score },
                                { label: "Background Clarity", value: result.background_clarity },
                                { label: "Lighting Score", value: result.lighting_score },
                                { label: "Smile Score", value: result.smile_score },
                                { label: "Sharpness", value: result.sharpness_score },
                                { label: "Pixelation", value: result.pixelation_score },
                                { label: "Contrast", value: result.contrast_score },
                                { label: "Noise", value: result.noise_score },
                                { label: "Brightness", value: result.brightness_score },
                            ].map((item, index) => (
                                <div key={index} className="flex flex-col">
                                    <p className="text-gray-800 font-medium">{item.label}</p>
                                    <div className="w-full bg-gray-200 rounded-md h-4 shadow-inner">
                                        <div 
                                            className="h-4 rounded-md bg-blue-600 transition-all"
                                            style={{ width: `${item.value}%` }}
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Suggestions */}
                        <div className="mt-8 space-y-4">
                            {[
                                { title: "Face Suggestions", content: result.face_suggestions },
                                { title: "Background Suggestions", content: result.background_suggestions },
                                { title: "Lighting Suggestions", content: result.lighting_suggestions },
                                { title: "Expression Suggestions", content: result.expression_suggestions },
                                { title: "Image Quality Suggestions", content: result.image_quality_suggestions },
                            ].map((item, index) => (
                                <div key={index} className="bg-white p-4 rounded-md shadow-md flex items-center space-x-4 border border-gray-300">
                                    <FaInfoCircle className="text-blue-500 text-xl" />
                                    <div>
                                        <h4 className="text-lg font-semibold text-gray-900">{item.title}</h4>
                                        <p className="text-gray-700">{item.content || "✅ No suggestions needed"}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
