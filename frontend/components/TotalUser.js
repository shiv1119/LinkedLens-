"use client";
import { useEffect, useState, useRef } from "react";

export default function TotalUsers() {
  const [count, setCount] = useState(0);
  const targetNumber = 5000; 
  const countingSpeed = 50; 
  const sectionRef = useRef(null);
  const [startCount, setStartCount] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setStartCount(true);
        } else {
          setStartCount(false);
          setCount(0);
        }
      },
      { threshold: 0.5 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (startCount) {
      let currentCount = 0;
      const interval = setInterval(() => {
        currentCount += Math.ceil(targetNumber / 100);
        if (currentCount >= targetNumber) {
          currentCount = targetNumber;
          clearInterval(interval);
        }
        setCount(currentCount);
      }, countingSpeed);

      return () => clearInterval(interval);
    }
  }, [startCount]);

  return (
    <div ref={sectionRef} className="pt-16 pb-6 text-center relative">
      <div className="relative inline-block">
        <div className="absolute w-8 h-8 text-3xl animate-orbit">🌎</div>
        <h2 className="text-3xl md:text-4xl font-bold text-gray-800">
          Join Our Growing Community
        </h2>
      </div>

      <p className="text-gray-600 mt-4 max-w-3xl mx-auto">
        Millions of professionals trust our platform to enhance their LinkedIn presence.
        Get AI-powered insights and make your profile stand out!
      </p>
      <div className="mt-6 text-5xl md:text-6xl font-bold text-blue-600">
        {count.toLocaleString()}
        <span className="animate-plus">+</span>
      </div>
      <p className="text-gray-700 mt-2">Total Users Worldwide</p>

      <style jsx>{`
        @keyframes orbit {
          0% { transform: translateX(-300px) translateY(-35px); }
          25% { transform: translateX(300px) translateY(-35px); }
          50% { transform: translateX(300px) translateY(35px); }
          75% { transform: translateX(-300px) translateY(35px); }
          100% { transform: translateX(-300px) translateY(-35px); }
        }

        @keyframes colorChange {
          0% { filter: hue-rotate(0deg) opacity(1); }
          25% { filter: hue-rotate(60deg) opacity(0.8); }
          50% { filter: hue-rotate(120deg) opacity(1); }
          75% { filter: hue-rotate(180deg) opacity(0.8); }
          100% { filter: hue-rotate(240deg) opacity(1); }
        }

        @keyframes plusEffect {
          0% { opacity: 0; transform: scale(0.5); }
          50% { opacity: 1; transform: scale(1.2); }
          100% { opacity: 0; transform: scale(0.5); }
        }

        .animate-orbit {
          position: absolute;
          top: 0px;
          left: 45%;
          transform-origin: center;
          animation: orbit 3s linear infinite, colorChange 3s linear infinite;
        }

        .animate-plus {
          display: inline-block;
          margin-left: 5px;
          animation: plusEffect 1.5s infinite ease-in-out;
        }
      `}</style>
    </div>
  );
}
