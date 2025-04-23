import { FaCheckCircle, FaBalanceScale, FaMagic, FaImage } from "react-icons/fa";

const features = [
  {
    title: "Photo Checker",
    desc: "Analyze your LinkedIn profile picture for professionalism.",
    icon: <FaCheckCircle className="text-indigo-600 size-12" />,
  },
  {
    title: "Compare",
    desc: "Compare multiple profile photos to see which one performs best.",
    icon: <FaBalanceScale className="text-indigo-600 size-12" />,
  },
  {
    title: "Image Retouching",
    desc: "Enhance lighting, background, and overall photo quality.",
    icon: <FaMagic className="text-indigo-600 size-12" />,
  },
  {
    title: "Image Generation",
    desc: "Generate AI-powered profile photos with a professional touch.",
    icon: <FaImage className="text-indigo-600 size-12" />,
  },
];

export default function Features() {
  return (
    <div className="max-w-10xl mx-auto px-6 py-16">
      <section className="text-center">
        <h2 className="text-2xl md:text-4xl font-bold text-gray-900">✨ Our Features</h2>
        <p className="mt-4 text-md text-gray-600">
          Discover AI-powered tools to enhance your LinkedIn presence.
        </p>
        <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-white shadow rounded-xl p-8 text-center transform transition-all hover:-translate-y-1 hover:shadow-lg"
            >
              <div className="flex justify-center">{feature.icon}</div>
              <h3 className="mt-4 text-xl font-semibold text-indigo-700">{feature.title}</h3>
              <p className="mt-2 text-gray-600">{feature.desc}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
