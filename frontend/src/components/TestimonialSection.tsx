"use client";
import React, { useState, useEffect, useCallback } from "react";
import { FaChevronLeft, FaChevronRight, FaUserCircle } from "react-icons/fa";
import { testimonials } from "@/constants/testimonial";
import Image from "next/image";

function TestimonialSection() {
  const [current, setCurrent] = useState(0);

  const paginate = useCallback(
    (direction: "next" | "prev") => {
      if (direction === "next") {
        setCurrent((prev) => (prev + 1) % testimonials.length);
      } else {
        setCurrent((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
      }
    },
    [testimonials.length]
  );

  useEffect(() => {
    const interval = setInterval(() => {
      paginate("next");
    }, 5000);
    return () => clearInterval(interval);
  }, [paginate]);

  return (
    <div className="relative w-full max-w-[1200px] mx-auto py-12 px-4">
      <h2 className="text-4xl font-jost font-bold text-center text-customBlue mb-8">
        WHAT OUR CLIENTS SAY
      </h2>
      <div className="overflow-hidden relative h-64">
        {testimonials.map((testimonial, index) => (
          <div
            key={index}
            className={`absolute w-full h-full transition-opacity duration-500 ease-in-out ${
              index === current ? "opacity-100" : "opacity-0"
            }`}
          >
            <div className="flex flex-col items-center justify-center h-full text-center">
              <div className="relative mb-4">
                <i className="fi fi-rr-quote-right text-4xl text-customeRed absolute -top-4 -left-8 transform rotate-12"></i>
                <FaUserCircle className="text-8xl text-gray-300" />
              </div>
              <p className="text-lg text-gray-700 max-w-2xl">
                {testimonial.quote}
              </p>
              <p className="mt-4 font-bold text-customBlue">
                - {testimonial.name}
              </p>
            </div>
          </div>
        ))}
      </div>
      <div className="flex justify-center space-x-2 mt-4">
        {testimonials.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrent(index)}
            className={`w-3 h-3 rounded-full ${
              index === current ? "bg-customeRed" : "bg-gray-300"
            }`}
          ></button>
        ))}
      </div>
      <button
        onClick={() => paginate("prev")}
        className="absolute top-1/2 left-8 transform -translate-y-1/2 bg-white/50 hover:bg-white/80 p-2 rounded-full"
      >
        <FaChevronLeft />
      </button>
      <button
        onClick={() => paginate("next")}
        className="absolute top-1/2 right-8 transform -translate-y-1/2 bg-white/50 hover:bg-white/80 p-2 rounded-full"
      >
        <FaChevronRight />
      </button>
    </div>
  );
}

export default TestimonialSection;
