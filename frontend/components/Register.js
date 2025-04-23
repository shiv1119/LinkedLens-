"use client";
import { useState } from "react";
import { registerUser } from "@/utils/route";
import { FaUser, FaEnvelope, FaLock } from "react-icons/fa";

export default function Register({ toggleToLogin }) {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});
    setLoading(true);
  
    if (formData.password !== formData.confirmPassword) {
      setErrors({ confirmPassword: "Passwords do not match." });
      setLoading(false);
      return;
    }
  
    const result = await registerUser({
      username: formData.username,
      email: formData.email,
      password1: formData.password,
      password2: formData.confirmPassword,
    });
  
    setLoading(false);
  
    if (!result.success) {
      console.log("Backend Errors:", result.errors);
  
      if (result.errors && typeof result.errors === "object") {
        setErrors(result.errors);
      } else {
        setErrors({ general: result.errors.message || "Registration failed." });
      }
      return;
    }
  
    alert("Registration successful!");
    toggleToLogin();
  };
  
  

  return (
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-4 lg:px-8">
      <div className="sm:mt-10 sm:mx-auto sm:w-full sm:max-w-sm"> 
       <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-900">Username</label>
          <div className="mt-2 flex items-center rounded-md border border-gray-300 bg-white px-3 py-1.5 text-gray-900 focus-within:outline-indigo-600">
            <FaUser className="text-gray-500" />
            <input
              type="text"
              name="username"
              placeholder="Username"
              onChange={handleChange}
              required
              className="w-full bg-transparent px-2 outline-none text-base"
            />
          </div>
          {errors.username && <p className="text-red-500 text-sm mt-1">{errors.username}</p>}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-900">Email address</label>
          <div className="mt-2 flex items-center rounded-md border border-gray-300 bg-white px-3 py-1.5 text-gray-900 focus-within:outline-indigo-600">
            <FaEnvelope className="text-gray-500" />
            <input
              type="email"
              name="email"
              placeholder="Email"
              onChange={handleChange}
              required
              className="w-full bg-transparent px-2 outline-none text-base"
            />
          </div>
          {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-900">Password</label>
          <div className="mt-2 flex items-center rounded-md border border-gray-300 bg-white px-3 py-1.5 text-gray-900 focus-within:outline-indigo-600">
            <FaLock className="text-gray-500" />
            <input
              type="password"
              name="password"
              placeholder="Password"
              onChange={handleChange}
              required
              className="w-full bg-transparent px-2 outline-none text-base"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-900">Confirm Password</label>
          <div className="mt-2 flex items-center rounded-md border border-gray-300 bg-white px-3 py-1.5 text-gray-900 focus-within:outline-indigo-600">
            <FaLock className="text-gray-500" />
            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm Password"
              onChange={handleChange}
              required
              className="w-full bg-transparent px-2 outline-none text-base"
            />
          </div>
          {errors.confirmPassword && <p className="text-red-500 text-sm mt-1">{errors.confirmPassword}</p>}
        </div>
          <div>
            <button
              type="submit"
              disabled={loading}
              className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-white font-semibold shadow-sm hover:bg-indigo-500 focus-visible:outline-indigo-600 cursor-pointer"
            >
              {loading ? "Registering..." : "Register"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
