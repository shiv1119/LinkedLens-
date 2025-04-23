import Features from "./Features";
import Testimonials from "./Feedback";
import HowItWorks from "./HowItWorks";
import LinkedinImage from "./LinkedinImage";
import TotalUsers from "./TotalUser";
import WorldVideo from "./WorldVideo";

export default function Home() {
    return (
      <div className="mt-16 min-h-screen">
        <header className="relative w-full h-[700px] md:h-[850px] flex items-center justify-center text-white text-center">
          <video
            autoPlay
            loop
            muted
            className="absolute top-0 left-0 w-full h-full object-cover"
          >
            <source src="/herovideo.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>

          <div className="absolute top-0 left-0 w-full h-full bg-black/60"></div>
          <div className="relative z-10 flex flex-col items-center max-w-3xl">
            <h1 className="text-3xl md:text-5xl font-bold drop-shadow-lg">
                Linked Lense
            </h1>
            <p className="mt-4 text-md md:text-lg px-4 drop-shadow-md">
                Elevate your LinkedIn presence with AI-powered analysis!  
                Get insights, compare multiple profile pictures, and enhance  
                your image for a lasting first impression.
            </p>
            <button className="mt-6 px-6 py-3 bg-transparent border-2 border-white text-white font-semibold rounded-lg shadow-md hover:bg-white/40 hover:border-white/80 hover:text-white transition transform hover:scale-105 cursor-pointer">
                Get Started
            </button>


          </div>
        </header>
        <div className="w-full md:w-[90%] mx-auto">
            <Features />
        </div>
        <div>
            <LinkedinImage />
        </div>
        <div className="bg-gray-100 mt-50">
        <div className="w-full  md:w-[90%] mx-auto" >
            <HowItWorks />
        </div>
        </div>
        <div className="w-full  md:w-[90%] lg:w-[80%] mx-auto">
            <Testimonials />
        </div>
        <div className="w-full  md:w-[90%] lg:w-[80%] mx-auto">
            <TotalUsers />
        </div>
        <div>
            <WorldVideo />
        </div>
      </div>
    );
}
