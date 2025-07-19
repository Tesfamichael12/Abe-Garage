"use client";

import Link from "next/link";
import Image from "next/image";
import {
  FaFacebookF,
  FaLinkedinIn,
  FaTwitter,
  FaGooglePlusG,
  FaTelegramPlane,
} from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-[#081336] text-gray-300">
      {/* Top Contact Bar */}
      <div className="py-6 border-b border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex items-center gap-4">
              <i className="flaticon-pin text-customeRed text-4xl"></i>
              <div>
                <p className="font-semibold">54B, Tailstoi Town 5238 MT,</p>
                <p>La city, IA 522364</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <i className="flaticon-email text-customeRed text-4xl"></i>
              <div>
                <p className="font-semibold">Email us :</p>
                <a
                  href="mailto:contact@autorex.com"
                  className="hover:text-customeRed"
                >
                  contact@autorex.com
                </a>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <i className="flaticon-call text-customeRed text-4xl"></i>
              <div>
                <p className="font-semibold">Call us on :</p>
                <p>+ 1800 456 7890</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Abe Garage Info */}
          <div>
            <Link href="/" className="inline-block mb-4">
              <Image
                src="/images/logo.png"
                alt="Abe Garage Logo"
                width={150}
                height={40}
              />
            </Link>
            <p className="text-gray-400 mb-6">
              Capitalize on low hanging fruit to identify a ballpark value added
              activity to beta test. Override the digital divide additional
              clickthroughs.
            </p>
          </div>

          {/* Useful Links */}
          <div>
            <h3 className="text-xl font-bold text-white mb-6">Usefull Links</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/" className="hover:text-customeRed">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-customeRed">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-customeRed">
                  Appointment
                </Link>
              </li>
              <li>
                <Link href="/" className="hover:text-customeRed">
                  Testimonials
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-customeRed">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Our Services */}
          <div>
            <h3 className="text-xl font-bold text-white mb-6">Our Services</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/services" className="hover:text-customeRed">
                  Performance Upgrade
                </Link>
              </li>
              <li>
                <Link href="/services" className="hover:text-customeRed">
                  Transmission Service
                </Link>
              </li>
              <li>
                <Link href="/services" className="hover:text-customeRed">
                  Break Repair & Service
                </Link>
              </li>
              <li>
                <Link href="/services" className="hover:text-customeRed">
                  Engine Service & Repair
                </Link>
              </li>
              <li>
                <Link href="/services" className="hover:text-customeRed">
                  Tyre & Wheels
                </Link>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-xl font-bold text-white mb-6">Newsletter</h3>
            <p className="text-gray-400 mb-4">Get latest updates and offers.</p>
            <div className="flex">
              <input
                type="email"
                placeholder="Enter your email"
                className="bg-[#2a2f4a] text-white px-4 py-3 rounded-l-md focus:outline-none w-full"
              />
              <button className="bg-customeRed text-white p-4 rounded-r-md hover:bg-red-700 text-xl">
                <FaTelegramPlane />
              </button>
            </div>
            <div className="flex space-x-4 mt-6">
              <a
                href="#"
                className="w-10 h-10 bg-[#2a2f4a] rounded-full flex items-center justify-center hover:bg-customeRed"
              >
                <FaFacebookF />
              </a>
              <a
                href="#"
                className="w-10 h-10 bg-[#2a2f4a] rounded-full flex items-center justify-center hover:bg-customeRed"
              >
                <FaLinkedinIn />
              </a>
              <a
                href="#"
                className="w-10 h-10 bg-[#2a2f4a] rounded-full flex items-center justify-center hover:bg-customeRed"
              >
                <FaTwitter />
              </a>
              <a
                href="#"
                className="w-10 h-10 bg-[#2a2f4a] rounded-full flex items-center justify-center hover:bg-customeRed"
              >
                <FaGooglePlusG />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Copyright Bar */}
      <div className="py-4 border-t border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center text-gray-500">
          <p>&copy; Copyright Abe Garage 2025. All right reserved.</p>
          <p>Built by Tesfamichael</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
