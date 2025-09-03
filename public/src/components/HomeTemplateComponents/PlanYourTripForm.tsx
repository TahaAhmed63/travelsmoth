import React from "react";
import Image from "next/image";

export default function PlanYourTripForm() {
  return (
    <section className="relative w-full min-h-[420px] flex flex-col justify-center items-start py-12 px-4 md:px-0" style={{ background: "#f6f1e7" }}>
      {/* Background Vector */}
      <div className="absolute inset-0 w-full h-full z-0">
        <Image
          src="/New Project (58).png"
          alt="Background Vector"
          fill
          className="object-cover object-top"
          priority
        />
      </div>
      {/* Content */}
      <div className="relative z-10 max-w-4xl w-full mx-auto">
        <div className="mb-8">
          <div className="text-white text-lg md:text-xl font-medium mb-2" style={{ textShadow: "0 2px 8px #0006" }}>
            Have a custom itinerary?
          </div>
          <div className="text-white text-4xl md:text-5xl font-bold" style={{ textShadow: "0 2px 8px #0006" }}>
            Plan Your Trip
          </div>
        </div>
        {/* Form Card */}
        <form className="bg-[#e5e0d3]/90 rounded-2xl p-6 md:p-8 grid grid-cols-1 md:grid-cols-3 gap-4 shadow-lg max-w-4xl w-full">
          {/* Column 1 */}
          <div className="flex flex-col gap-4">
            <div className="bg-white rounded-lg px-4 py-3 text-sm font-medium text-gray-700 shadow flex flex-col">
              <span className="text-xs text-gray-400 mb-1">Departure Airport</span>
              London Heathrow
            </div>
            <div className="bg-white rounded-lg px-4 py-3 text-sm font-medium text-gray-700 shadow flex flex-col">
              <span className="text-xs text-gray-400 mb-1">Passengers</span>
              02A · 01C · 01
            </div>
            <input
              type="email"
              placeholder="Enter email address"
              className="bg-white rounded-lg px-4 py-3 text-sm text-gray-700 shadow placeholder-gray-400 outline-none"
            />
          </div>
          {/* Column 2 */}
          <div className="flex flex-col gap-4">
            <div className="bg-white rounded-lg px-4 py-3 text-sm font-medium text-gray-700 shadow flex flex-col">
              <span className="text-xs text-gray-400 mb-1">Arrival Airport</span>
              King Abdul Aziz Int...
            </div>
            <div className="bg-white rounded-lg px-4 py-3 text-sm font-medium text-gray-700 shadow flex flex-col">
              <span className="text-xs text-gray-400 mb-1">Service Type</span>
              Executive
            </div>
            <input
              type="tel"
              placeholder="Enter phone number"
              className="bg-white rounded-lg px-4 py-3 text-sm text-gray-700 shadow placeholder-gray-400 outline-none"
            />
          </div>
          {/* Column 3 */}
          <div className="flex flex-col gap-4">
            <div className="bg-white rounded-lg px-4 py-3 text-sm font-medium text-gray-700 shadow flex flex-col">
              <span className="text-xs text-gray-400 mb-1">Date</span>
              07 JUL - 15 JUL
            </div>
            <div className="bg-white rounded-lg px-4 py-3 text-sm font-medium text-gray-700 shadow flex flex-col">
              <span className="text-xs text-gray-400 mb-1">Stay</span>
              04 MAC - 03 MED
            </div>
            <button
              type="submit"
              className="bg-[#5d6b3c] hover:bg-[#4a552f] text-white font-semibold rounded-lg px-4 py-3 mt-1 shadow transition"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </section>
  );
} 