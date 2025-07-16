"use client";
import { useState } from "react";

interface ServiceCardProps {
  title: string;
  icon: string;
  details: string;
}

function ServiceCard({ title, icon, details }: ServiceCardProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div
      className="bg-white shadow-lg rounded-lg group transition-all duration-300 cursor-pointer hover:bg-customBlue border-b-4 border-customeRed"
      onClick={() => setIsOpen(!isOpen)}
    >
      <div className="p-8 flex flex-col">
        <div>
          <p className="text-gray-500 group-hover:text-white">
            SERVICE AND REPAIRS
          </p>
          <h3 className="text-2xl font-bold text-customBlue group-hover:text-white mt-2 font-jost">
            {title}
          </h3>
        </div>
        <div
          className={`transition-all duration-500 ease-in-out overflow-hidden ${
            isOpen ? "max-h-96 opacity-100 pt-6" : "max-h-0 opacity-0"
          }`}
        >
          <p className="text-gray-600 group-hover:text-white">{details}</p>
        </div>

        <div className="mt-auto pt-6 flex justify-between items-center">
          <p className="text-customeRed font-semibold group-hover:text-white">
            {isOpen ? "READ LESS -" : "READ MORE +"}
          </p>
          <span
            className={`${icon} text-8xl text-gray-300 group-hover:text-white`}
          />
        </div>
      </div>
    </div>
  );
}

export default ServiceCard;
