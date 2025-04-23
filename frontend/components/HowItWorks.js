import { FaUpload, FaChartBar, FaCheckCircle, FaMagic } from "react-icons/fa";

export default function HowItWorks() {
  return (
    <div className="w-full py-16">
      <div className="mx-auto text-center px-6">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-800 drop-shadow-md">
          How It Works
        </h2>
        <p className="mt-4 text-lg text-gray-600 max-w-3xl mx-auto">
            Upload your profile picture, get instant AI feedback, compare multiple images,  
          and improve your LinkedIn presence with professional analysis.
        </p>
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white p-6 rounded-lg shadow-md flex flex-col items-center transform transition-all hover:-translate-y-1 hover:shadow-lg">
            <FaUpload className="text-indigo-600 text-5xl mb-4" />
            <h3 className="text-xl font-semibold text-gray-800">Try It Out</h3>
            <p className="text-gray-600 text-center mt-2">
            Go to the <b>Try Now</b> and Upload your profile picture and get AI-powered analysis, feedback,  
              and a professionalism score.
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md flex flex-col items-center transform transition-all hover:-translate-y-1 hover:shadow-lg">
            <FaChartBar className="text-indigo-600 text-5xl mb-4" />
            <h3 className="text-xl font-semibold text-gray-800">Get Feedback</h3>
            <p className="text-gray-600 text-center mt-2">
              Receive insights on lighting, background, image quality, and more to  
              enhance your professional look.
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md flex flex-col items-center transform transition-all hover:-translate-y-1 hover:shadow-lg">
            <FaCheckCircle className="text-indigo-600 text-5xl mb-4" />
            <h3 className="text-xl font-semibold text-gray-800">Compare</h3>
            <p className="text-gray-600 text-center mt-2">
              Go to the <b>Compare</b> section and select two or multiple analyzed  
              images to see which one performs best.
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md flex flex-col items-center opacity-70 transform transition-all hover:-translate-y-1 hover:shadow-lg">
            <FaMagic className="text-indigo-600 text-5xl mb-4" />
            <h3 className="text-xl font-semibold text-gray-800">Retouch & Generate</h3>
            <p className="text-gray-600 text-center mt-2">
              <b>Coming soon:</b> AI-powered image retouching and generation for  
              a polished, professional LinkedIn photo.
            </p>
          </div>

        </div>
      </div>
    </div>
  );
}
