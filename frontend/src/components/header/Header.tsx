"use client";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { HiMenu, HiX } from "react-icons/hi";
import { signOut } from "next-auth/react";
import { useSession } from "next-auth/react";
import Button from "../ui/Button";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

function Header() {
  const { data: session } = useSession();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const router = useRouter();

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 64) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleSignOut = async () => {
    await signOut({ redirect: false });
    toast.success("Signed out successfully!");
    router.push("/signin");
  };

  const navLinks = (
    <>
      <li>
        <Link href="/" className="hover:text-customeRed">
          HOME
        </Link>
      </li>
      <li>
        <Link href="/about" className="hover:text-customeRed">
          ABOUT US
        </Link>
      </li>
      <li>
        <Link href="/services" className="hover:text-customeRed">
          SERVICES
        </Link>
      </li>
      <li>
        <Link href="/contact" className="hover:text-customeRed">
          CONTACT US
        </Link>
      </li>
      {session && (
        <li>
          <Link href="/dashboard" className="hover:text-customeRed">
            DASHBOARD
          </Link>
        </li>
      )}
    </>
  );

  return (
    <header className="relative z-50">
      {/* Static Header */}
      <div className="absolute top-0 left-0 right-0">
        {/* Top Bar */}
        <div className="md:flex justify-between items-stretch text-base md:text-lg lg:text-xl">
          <div className="flex items-center justify-center text-center bg-customeRed text-white p-3 md:p-4 flex-grow md:flex-grow-0 md:px-[35px]">
            <p>Enjoy the Beso while we fix your car</p>
          </div>
          <div className="hidden md:flex flex-grow justify-between items-center bg-customBlue text-white p-3 md:p-4 md:px-5">
            <p className="text-md font-jost">
              Monday - Saturday 7:00AM - 6:00PM
            </p>
            <p className="hidden lg:block text-md">
              Schedule Appointment:{" "}
              <span className="font-bold text-lg md:text-xl lg:text-2xl font-jost">
                1800 456 7890
              </span>
            </p>
          </div>
        </div>
        {/* Main Nav */}
        <div className="flex h-16 sm:h-[70px] bg-white justify-between items-center px-6 sm:px-14 shadow-md">
          <Image
            src="/images/logo.png"
            width={170}
            height={40}
            alt="logo"
            className="w-[140px] h-auto sm:w-[170px]"
          />
          <nav className="hidden sm:flex items-center">
            <ul className="flex flex-row items-center gap-7 text-customBlue font-semibold text-base lg:text-lg">
              {navLinks}
              {session ? (
                <li className="pl-7">
                  <Button onClick={handleSignOut}>LOGOUT</Button>
                </li>
              ) : (
                <li className="pl-7">
                  <Link href="/signin">
                    <Button>LOGIN</Button>
                  </Link>
                </li>
              )}
            </ul>
          </nav>
          <button
            onClick={toggleMenu}
            className={`sm:hidden text-customBlue text-2xl ${
              isMenuOpen ? "hidden" : "block"
            }`}
          >
            <HiMenu />
          </button>
        </div>
      </div>

      {/* Sticky Header */}
      <div
        className={`fixed top-0 left-0 right-0 z-40 transition-transform duration-300 ease-in-out ${
          isScrolled ? "translate-y-0" : "-translate-y-full"
        }`}
      >
        <div className="flex h-16 sm:h-[70px] bg-white justify-between items-center px-6 sm:px-14 shadow-md">
          <Image
            src="/images/logo.png"
            width={170}
            height={40}
            alt="logo"
            className="w-[140px] h-auto sm:w-[170px]"
          />
          <nav className="hidden sm:flex items-center">
            <ul className="flex flex-row items-center gap-7 text-customBlue font-semibold text-base lg:text-lg">
              {navLinks}
              {session ? (
                <li className="pl-7">
                  <Button onClick={handleSignOut}>LOGOUT</Button>
                </li>
              ) : (
                <li className="pl-7">
                  <Link href="/signin">
                    <Button>LOGIN</Button>
                  </Link>
                </li>
              )}
            </ul>
          </nav>
          <button
            onClick={toggleMenu}
            className={`sm:hidden text-customBlue text-2xl ${
              isMenuOpen ? "hidden" : "block"
            }`}
          >
            <HiMenu />
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`fixed top-0 right-0 h-full w-1/2 bg-white z-50 transform transition-transform duration-300 ease-in-out ${
          isMenuOpen ? "translate-x-0" : "translate-x-full"
        } sm:hidden`}
      >
        <div className="flex justify-end p-4">
          <button onClick={toggleMenu} className="text-customBlue text-2xl">
            <HiX />
          </button>
        </div>
        <ul className="flex flex-col items-start gap-4 text-customBlue font-semibold text-base px-6">
          {navLinks}
          {session ? (
            <li>
              <Button
                className="py-2 px-4"
                onClick={() => {
                  setIsMenuOpen(false);
                  handleSignOut();
                }}
              >
                LOGOUT
              </Button>
            </li>
          ) : (
            <li>
              <Link href="/signin" onClick={() => setIsMenuOpen(false)}>
                <Button className="py-2 px-4">LOGIN</Button>
              </Link>
            </li>
          )}
        </ul>
      </div>

      <div className="h-[114px] md:h-[130px]"></div>
    </header>
  );
}

export default Header;
