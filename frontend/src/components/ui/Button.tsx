"use client";

import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({ children, className, ...props }) => {
  return (
    <button
      className={`relative overflow-hidden bg-customeRed text-white font-bold py-3 px-6 shadow-md transition-all duration-300 ease-in-out group ${className}`}
      {...props}
    >
      <span className="relative z-10">{children}</span>
      <div className="absolute inset-0 bg-customeHover w-0 group-hover:w-full transition-all duration-300 ease-in-out"></div>
    </button>
  );
};

export default Button;
