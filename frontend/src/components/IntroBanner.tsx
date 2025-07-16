"use client";

import { FaPlay } from "react-icons/fa";

const IntroBanner = () => {
  return (
    <div
      className="relative mt-20 bg-cover bg-center py-24 sm:py-32"
      style={{
        backgroundImage: "url('/images/imgi_9_bottomBanner-Dv_lQqAc.webp')",
      }}
    >
      <div className="absolute inset-0 bg-black opacity-50"></div>
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-white">
        <div className="max-w-2xl">
          <div className="flex items-center text-lg sm:text-xl mb-4">
            <p>Working since 1992</p>
            <span className="inline-block w-12 h-[2px] bg-customeRed ml-4"></span>
          </div>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold font-jost leading-tight">
            We are leader in Car Mechanical Work
          </h2>
          <div className="mt-8 flex items-center gap-6">
            <a
              href="https://youtu.be/p-BQ7TD0t0Y?si=bj0ibE6GibylJ6-j"
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-block transition-transform duration-300 hover:scale-110"
            >
              <button className="bg-customeRed rounded-full p-3 sm:p-5 group-hover:bg-white transition-colors duration-300">
                <FaPlay className="text-white text-lg sm:text-2xl group-hover:text-customeRed" />
              </button>
            </a>
            <div className="text-lg">
              <p className="font-semibold tracking-wider">WATCH INTRO VIDEO</p>
              <p className="text-gray-300">ABOUT US</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IntroBanner;
