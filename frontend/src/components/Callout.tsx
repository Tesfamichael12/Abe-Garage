"use client";

import Link from "next/link";
import { FaArrowRight } from "react-icons/fa";
import Button from "@/components/ui/Button";

const Callout = () => {
  return (
    <section className="bg-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-customeRed text-white p-12 shadow-lg">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-center">
            {/* Left Section: Title and Subtitle */}
            <div className="lg:col-span-1">
              <h2 className="text-3xl font-bold font-jost mb-2">
                Schedule Your Appointment Today
              </h2>
              <p className="text-lg opacity-90">
                Your Automotive Repair & Maintenance Service Specialist
              </p>
            </div>

            {/* Middle Section: Phone Number */}
            <div className="lg:col-span-1 text-center md:text-left">
              <p className="text-4xl font-extrabold font-jost tracking-wider">
                1800.456.7890
              </p>
            </div>

            {/* Right Section: Button */}
            <div className="lg:col-span-1 flex justify-center md:justify-end">
              <Link href="/contact">
                <Button className="bg-white !text-black hover:!text-white font-bold py-4 px-8 shadow-md">
                  <div className="flex justify-between items-center gap-4">
                    <span>APPOINTMENT</span>
                    <FaArrowRight />
                  </div>
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Callout;
