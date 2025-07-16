"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { wrap } from "popmotion";

interface Testimonial {
  id: number;
  text: string;
  name: string;
  title: string;
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    text: "As a car enthusiast, I'm very particular about who works on my vehicles. Abe Garage has proven to be trustworthy and skilled. Their diagnostic capabilities and repair work are top-notch.",
    name: "EMMA RODRIGUEZ",
    title: "CAR ENTHUSIAST",
  },
  {
    id: 2,
    text: "The team at Abe Garage has been exceptional in maintaining our fleet vehicles. Their attention to detail and professional service has exceeded our expectations. We highly recommend their services to any business looking for reliable automotive care.",
    name: "SARAH WILLIAMS",
    title: "FLEET MANAGER",
  },
  {
    id: 3,
    text: "I've been bringing my cars here for over 10 years. The quality of work and customer service is consistently outstanding. They always explain what needs to be done and never try to upsell unnecessary services.",
    name: "DAVID CHEN",
    title: "REGULAR CUSTOMER",
  },
];

const variants = {
  enter: (direction: number) => {
    return {
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
    };
  },
  center: {
    zIndex: 1,
    x: 0,
    opacity: 1,
  },
  exit: (direction: number) => {
    return {
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
    };
  },
};

const TestimonialSection = () => {
  const [[page, direction], setPage] = useState([0, 0]);
  const testimonialIndex = wrap(0, testimonials.length, page);

  const paginate = (newDirection: number) => {
    setPage([page + newDirection, newDirection]);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      paginate(1);
    }, 5000);
    return () => clearInterval(interval);
  }, [page]);

  return (
    <section className="relative py-24 bg-[#f2f2f2] overflow-hidden min-h-[450px]">
      {/* Background Q shape */}
      <div
        className="absolute -right-20 top-1/2 transform -translate-y-1/2 z-0 opacity-20"
        style={{
          backgroundImage: "url('/images/shape-1.png')",
          backgroundPosition: "center",
          backgroundSize: "contain",
          backgroundRepeat: "no-repeat",
          width: "500px",
          height: "500px",
        }}
      />

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center">
          {/* Left Column: Quote Icon */}
          <div className="w-1/4 flex justify-center">
            <div className="text-customeRed text-8xl font-bold opacity-80">
              <i
                className="flaticon-null"
                style={{
                  fontFamily: "Flaticon",
                  fontSize: "8rem",
                  lineHeight: 1,
                }}
              ></i>
            </div>
          </div>

          {/* Right Column: Content */}
          <div className="w-3/4 relative min-h-[300px]">
            <AnimatePresence initial={false} custom={direction}>
              <motion.div
                key={page}
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{
                  x: { type: "spring", stiffness: 300, damping: 30 },
                  opacity: { duration: 0.2 },
                }}
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={1}
                onDragEnd={(e, { offset, velocity }) => {
                  const swipe = Math.abs(offset.x) * velocity.x;
                  if (swipe < -10000) {
                    paginate(1);
                  } else if (swipe > 10000) {
                    paginate(-1);
                  }
                }}
                className="w-full absolute top-0 left-0"
              >
                <p className="text-gray-600 text-xl leading-relaxed mb-6">
                  {testimonials[testimonialIndex].text}
                </p>

                <div>
                  <p className="text-gray-800 font-bold text-lg tracking-wider">
                    - {testimonials[testimonialIndex].name}
                  </p>
                  <p className="text-blue-500 text-sm font-medium tracking-wider">
                    {testimonials[testimonialIndex].title}
                  </p>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Pagination dots */}
        <div className="absolute bottom-4 right-4 flex items-center gap-3">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() =>
                setPage([index, index > testimonialIndex ? 1 : -1])
              }
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === testimonialIndex
                  ? "bg-customeRed scale-125"
                  : "bg-gray-400 hover:bg-gray-500"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialSection;
