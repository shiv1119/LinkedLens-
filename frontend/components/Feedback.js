"use client";
import Image from "next/image";
import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";

const testimonials = [
  {
    name: "Aarav Mehta",
    feedback: "“This AI-powered tool helped me pick the perfect LinkedIn profile photo. My engagement skyrocketed! I never realized how much my profile picture mattered. This tool made it super easy to optimize my presence!”",
    image: "/user1.jpg",
    rating: 5,
  },
  {
    name: "Sanya Kapoor",
    feedback: "“The analysis and insights are super useful! It's like having a personal branding expert in my pocket. It helped me choose a more professional image, and I immediately noticed an increase in profile views and recruiter messages.”",
    image: "/user2.png",
    rating: 4.5,
  },
  {
    name: "Rahul Sharma",
    feedback: "“I never realized how much my photo mattered until I used this tool. The AI feedback was incredibly insightful, helping me make small but impactful changes. Now, my profile looks more polished and inviting to potential connections.”",
    image: "/user3.jpg",
    rating: 4,
  }
];

const renderStars = (rating) => {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 !== 0;
  return (
    <div className="flex text-yellow-500 mt-2">
      {[...Array(fullStars)].map((_, i) => (
        <FaStar key={i} />
      ))}
      {hasHalfStar && <FaStarHalfAlt />}
      {[...Array(5 - fullStars - (hasHalfStar ? 1 : 0))].map((_, i) => (
        <FaRegStar key={i} />
      ))}
    </div>
  );
};

export default function Testimonials() {
  return (
    <div className="pt-16 pb-4">
      <h2 className="text-center text-3xl md:text-4xl font-bold text-gray-800 mb-10">
        What Our Users Say
      </h2>
      <div className="mx-auto grid grid-cols-1 md:grid-cols-2 gap-6 px-3 md:px-6">
        {testimonials.map((user, index) => (
          <div
            key={index}
            className="p-2 flex flex-col items-start text-left"
          >
            <div className="flex items-center space-x-4">
              <div className="w-[50px] h-[50px] rounded-full overflow-hidden border-2 border-indigo-500">
                <Image
                  src={user.image}
                  alt={user.name}
                  width={50}
                  height={50}
                  className="object-cover w-full h-full cursor-pointer"
                />
              </div>
              <div>
                <h3 className="text-lg font-bold text-blue-600 cursor-pointer">{user.name}</h3>
                <span>{renderStars(user.rating)}</span>
              </div>
            </div>
            <p className="text-gray-600 mt-3">{user.feedback}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
