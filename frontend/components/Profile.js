"use client";

import { useSession } from "next-auth/react";
import Image from "next/image";
import { useState, useEffect } from "react";
import { updateProfile } from "@/utils/route";

export default function ProfilePage() {
    const { data: session, status, update } = useSession();
    const [isEditing, setIsEditing] = useState(false);
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState(null);
    const [accessToken, setAccessToken] = useState(null); // Store token separately

    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        bio: "",
        profilePicture: "/avatar.jpg",
    });

    useEffect(() => {
        if (session?.user) {
            setFormData({
                firstName: session.user.firstName || "",
                lastName: session.user.lastName || "",
                bio: session.user.bio || "",
                profilePicture: session.user.profilePicture || "/avatar.jpg",
            });
            setAccessToken(session?.accessToken); // Store token for API calls
        }
    }, [session]);

    if (status === "loading") return <p className="text-center text-lg text-gray-500">Loading profile...</p>;
    if (!session) return <p className="text-center text-lg text-red-500">User not logged in</p>;

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const imageUrl = URL.createObjectURL(file);
            setFormData({ ...formData, profilePicture: imageUrl });
        }
    };

    const handleSaveChanges = async () => {
      setLoading(true);
      setMessage(null);
  
      if (!accessToken) {
          setMessage({ type: "error", text: "Unauthorized: No access token found." });
          setLoading(false);
          return;
      }
  
      const result = await updateProfile(formData, accessToken);
  
      if (result.success) {
          setMessage({ type: "success", text: "Profile updated successfully!" });
          setIsEditing(false);
  
          // ✅ Update NextAuth session with new user details
          await update({
              ...session,
              user: {
                  ...session.user,
                  firstName: formData.firstName,
                  lastName: formData.lastName,
                  bio: formData.bio,
                  profilePicture: formData.profilePicture, // ✅ Ensure profile picture updates
              },
          });
      } else {
          setMessage({ type: "error", text: result.errors?.message || "Failed to update profile" });
      }
  
      setLoading(false);
  };
  

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
            <div className="bg-white text-gray-800 p-8 rounded-lg shadow-xl w-96 text-center relative">
                {/* Profile Image */}
                <div className="flex justify-center">
                    <div className="relative w-28 h-28 rounded-full overflow-hidden border-4 border-blue-500 shadow-md">
                        <Image src={formData.profilePicture} alt="Profile" layout="fill" objectFit="cover" priority />
                    </div>
                </div>

                {/* User Details */}
                <h2 className="mt-4 text-2xl font-bold flex items-center justify-center gap-2">
                    <i className="fas fa-user text-blue-500"></i>
                    {formData.firstName} {formData.lastName}
                </h2>

                <p className="mt-2 text-gray-600 flex items-center justify-center gap-2">
                    <i className="fas fa-at text-blue-400"></i>@{session.user.username}
                </p>

                <p className="mt-2 text-gray-600 flex items-center justify-center gap-2">
                    <i className="fas fa-envelope text-blue-500"></i> {session.user.email}
                </p>

                <p className="mt-4 text-gray-500 italic flex items-center justify-center gap-2">
                    <i className="fas fa-info-circle text-blue-400"></i> {formData.bio || "No bio available"}
                </p>

                {/* Edit Button */}
                <button onClick={() => setIsEditing(true)} className="mt-4 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg shadow-md transition-all">
                    Edit Profile
                </button>
            </div>

            {/* Edit Modal */}
            {isEditing && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 transition-all">
                    <div className="bg-white text-gray-800 p-6 rounded-lg shadow-lg w-96 relative">
                        <h2 className="text-xl font-bold mb-4 text-center text-gray-800">Edit Profile</h2>

                        {/* Form Fields */}
                        <div className="mb-4">
                            <label className="block text-gray-600 font-medium mb-1">
                                <i className="fas fa-image text-blue-500 mr-2"></i> Profile Picture
                            </label>
                            <input type="file" accept="image/*" onChange={handleImageChange} className="w-full bg-gray-100 text-gray-800 p-2 rounded-lg border border-gray-300" />
                        </div>

                        <div className="mb-4">
                            <label className="block text-gray-600 font-medium mb-1">
                                <i className="fas fa-user text-blue-500 mr-2"></i> First Name
                            </label>
                            <input type="text" name="firstName" value={formData.firstName} onChange={handleChange} className="w-full bg-gray-100 text-gray-800 p-2 rounded-lg border border-gray-300" />
                        </div>

                        <div className="mb-4">
                            <label className="block text-gray-600 font-medium mb-1">
                                <i className="fas fa-user text-blue-500 mr-2"></i> Last Name
                            </label>
                            <input type="text" name="lastName" value={formData.lastName} onChange={handleChange} className="w-full bg-gray-100 text-gray-800 p-2 rounded-lg border border-gray-300" />
                        </div>

                        <div className="mb-4">
                            <label className="block text-gray-600 font-medium mb-1">
                                <i className="fas fa-comment text-blue-500 mr-2"></i> Bio
                            </label>
                            <textarea name="bio" value={formData.bio} onChange={handleChange} className="w-full bg-gray-100 text-gray-800 p-2 rounded-lg border border-gray-300"></textarea>
                        </div>

                        {/* Buttons */}
                        <div className="flex justify-between mt-4">
                            <button onClick={() => setIsEditing(false)} className="bg-gray-400 hover:bg-gray-500 text-white font-bold py-2 px-4 rounded-lg">Cancel</button>
                            <button onClick={handleSaveChanges} className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-lg">
                                {loading ? "Saving..." : "Save Changes"}
                            </button>
                        </div>

                        {message && <p className={`mt-2 text-center text-${message.type === "success" ? "green" : "red"}-500`}>{message.text}</p>}
                    </div>
                </div>
            )}
        </div>
    );
}
