"use client"
import { FaMoneyBillWave, FaHourglassHalf } from "react-icons/fa";

export default function PricingComingSoon() {
  return (
    <div className="relative isolate bg-white px-6 py-24 sm:py-32 lg:px-8">
      <div aria-hidden="true" className="absolute inset-x-0 -top-3 -z-10 transform-gpu overflow-hidden px-36 blur-3xl">
        <div
          style={{
            clipPath:
              'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
          }}
          className="mx-auto aspect-1155/678 w-[72.1875rem] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30"
        />
      </div>
      <div className="w-full flex flex-col items-center justify-center py-20">
        <FaMoneyBillWave className="text-6xl text-yellow-500 animate-bounce" />
        <h2 className="mt-6 text-3xl md:text-4xl font-bold text-gray-800 drop-shadow-md">
          The Perfect Recipe for Affordable Pricing! 🍕💰
        </h2>
        <p className="mt-4 text-lg text-gray-600 text-center px-6 max-w-2xl">
          Our **pricing plans** are still **simmering on low heat**,  
          making sure we serve up the **best deal with the finest ingredients**.  
        </p>
        <p className="mt-2 text-gray-600 text-center px-6 max-w-2xl">
          Soon, you’ll be able to pick a plan that’s just right—**no overcooked budgets, no under-seasoned features!**  
        </p>
        <p className="mt-2 text-gray-500 text-center italic">
          (*No bank accounts were burned in the making of this pricing model... yet.*)  
        </p>

        <FaHourglassHalf className="mt-6 text-5xl text-gray-500 animate-pulse" />
        <p className="mt-2 text-gray-500 text-sm">ETA: Still marinating… but almost ready to serve! ⏳</p>
      </div>
    </div>
  );
}
