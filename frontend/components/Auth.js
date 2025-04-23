"use client";
import { useState } from "react";
import Register from "@/components/Register";
import Login from "@/components/Login";

export default function Auth() {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className="mt-16 flex justify-center items-center h-screen w-screen">
      <div className="flex flex-col lg:flex-row w-full lg:w-[70%] h-[90%] bg-white shadow-lg rounded-lg overflow-hidden">
        <div className="relative w-full lg:w-1/2 h-56 lg:h-full bg-gray-900 flex flex-col items-center justify-center text-white text-center px-6">
          <h1 className="text-3xl md:text-4xl font-bold">LinkedLense</h1>
          <p className="text-lg mt-2">
            {isLogin
              ? "Sign in to analyze and improve your LinkedIn profile photo."
              : "Sign up to get AI-driven insights on your LinkedIn profile picture."}
          </p>
        </div>

        <div className="flex w-full lg:w-1/2 items-center justify-center p-6">
          <div className="w-full max-w-md flex flex-col items-center">
            <div className="w-full">
              {isLogin ? <Login /> : <Register toggleToLogin={() => setIsLogin(true)} />}
            </div>

            <button
              className="font-semibold rounded transition duration-300 cursor-pointer mt-4"
              onClick={() => setIsLogin(!isLogin)}
            >
              <span className="text-black">
                {isLogin ? "Do not have an Account? " : "Already have an account? "}
              </span>
              <span className="text-indigo-600">
                {isLogin ? "Sign Up" : "Sign In"}
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
