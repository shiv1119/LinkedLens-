"use client";

import { ReactTyped } from "react-typed";

export default function WorldVideo() {
  return (
    <div className="relative w-full h-[70vh] overflow-hidden flex items-center justify-center">
      <video
        src="/worldvideo.mp4"
        autoPlay
        loop
        muted
        className="absolute top-0 left-0 w-full h-full object-cover z-10"
      />
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-black/50 via-transparent to-black/50 z-20"></div>
      <div className="absolute z-30 text-center w-full px-6">
        <h1 className="text-4xl md:text-5xl font-extrabold leading-snug text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-white to-purple-400 drop-shadow-lg neon-text animate-fadeIn">
          <ReactTyped
            strings={[
              "Try it now",
              "Get a Professional Headshot",
              "Look Smart & Confident",
              "Enhance Your LinkedIn Profile",
              "Stand Out with a Stunning Picture",
            ]}
            typeSpeed={60}
            backSpeed={40}
            loop
          />
        </h1>
      </div>
    </div>
  );
}
