"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState, useRef, useEffect } from "react";
import { authClient } from "@/lib/auth-client";
import { toast } from "react-toastify";
import AnimatedButton from "./AnimatedButton";
import {
  FiChevronDown,
  FiUser,
  FiLogOut,
  FiPlusCircle,
  FiList,
  FiTrendingUp,
  FiX,
} from "react-icons/fi";
import { CgMenuRight } from "react-icons/cg";

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const [showMenu, setShowMenu] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const { data: session } = authClient.useSession();
  const user = session?.user;

  // close dropdown when clicking outside
  useEffect(() => {
    function handleOutsideClick(e) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, []);

  const handleSignOut = async () => {
    try {
      setDropdownOpen(false);
      await authClient.signOut();
      toast.success("Logged out successfully");
      router.push("/");
    } catch (error) {
      console.error(error);
      toast.error("Failed to log out");
    }
  };

  const navLinks = [
    { label: "Home", href: "/" },
    { label: "Explore Cars", href: "/explore-cars" },
    ...(user
      ? [
          { label: "My Bookings", href: "/my-bookings" },
          { label: "Add Car", href: "/add-car" },
          { label: "My Added Cars", href: "/my-added-cars" },
        ]
      : []),
  ];

  return (
    <div className="fixed top-0 left-0 w-full z-50 p-3">
      <nav className="bg-black/80 backdrop-blur-md shadow-lg w-full rounded-none border border-white/10 h-20 flex items-center relative">
        <div className="flex items-center justify-between w-full mx-auto px-4 sm:px-6 lg:px-8">
          {/* main brand logo and home link */}
          <Link href="/" className="flex items-center gap-2">
            <img
              src="/assets/drivefleet-logo.png"
              alt="DriveFleet"
              className="h-12 w-auto object-contain"
            />
            <span className="text-2xl font-bold italic text-white tracking-tight uppercase hidden sm:block">
              DriveFleet
            </span>
          </Link>

          {/* primary menu navigation links */}
          <div className="hidden md:flex items-center gap-8 absolute left-1/2 -translate-x-1/2">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`text-sm font-semibold tracking-wide uppercase transition-colors duration-200 relative group ${
                    isActive ? "text-orange-500" : "text-white/80 hover:text-orange-500"
                  }`}
                >
                  {link.label}
                  <span
                    className={`absolute -bottom-1 left-0 h-[2px] bg-orange-500 transition-all duration-300 ${
                      isActive ? "w-full" : "w-0 group-hover:w-full"
                    }`}
                  />
                </Link>
              );
            })}
          </div>

          {/* secondary actions and session state */}
          <div className="flex items-center gap-2 sm:gap-4">
            <div className="flex items-center justify-end gap-3 sm:gap-4">
              {user ? (
                <div className="relative" ref={dropdownRef}>
                  {/* profile dropdown trigger */}
                  <button
                    onClick={() => {
                      if (typeof window !== "undefined" && window.innerWidth >= 1024) {
                        setDropdownOpen(!dropdownOpen);
                      }
                    }}
                    className="flex items-center gap-2.5 cursor-pointer lg:cursor-pointer focus:outline-none group cursor-default"
                  >
                    {user.image ? (
                      <img
                        src={user.image}
                        alt={user.name}
                        referrerPolicy="no-referrer"
                        className="w-10 h-10 rounded-full border-2 border-white object-cover group-hover:border-orange-500 transition-all"
                      />
                    ) : (
                      <div className="w-10 h-10 rounded-full bg-orange-500 border-2 border-white flex items-center justify-center text-white text-xs font-bold">
                        {user.name?.charAt(0)?.toUpperCase()}
                      </div>
                    )}
                    <span className="text-sm font-bold text-white uppercase tracking-wider hidden lg:block group-hover:text-orange-500 transition-colors">
                      {user.name}
                    </span>
                    <FiChevronDown
                      className={`text-white group-hover:text-orange-500 transition-all duration-300 hidden lg:block ${
                        dropdownOpen ? "rotate-180" : ""
                      }`}
                    />
                  </button>

                  {/* profile options menu */}
                  {dropdownOpen && (
                    <div className="absolute right-0 top-full mt-3 w-56 bg-black border border-white/10 shadow-2xl z-[9999] py-2 hidden lg:block">
                      {/* active user info banner */}
                      <div className="px-4 py-2.5 border-b border-white/10 mb-1">
                        <p className="text-[11px] text-gray-400 uppercase tracking-wider">
                          Signed in as
                        </p>
                        <p className="text-sm font-bold text-white truncate mt-0.5">
                          {user.email}
                        </p>
                      </div>

                      <Link
                        href="/profile"
                        onClick={() => setDropdownOpen(false)}
                        className="flex items-center gap-2.5 px-4 py-2.5 text-sm text-gray-300 hover:text-white hover:bg-white/5 transition-colors font-semibold"
                      >
                        <FiUser className="text-orange-500 text-base" /> My Profile
                      </Link>

                      <Link
                        href="/add-car"
                        onClick={() => setDropdownOpen(false)}
                        className="flex items-center gap-2.5 px-4 py-2.5 text-sm text-gray-300 hover:text-white hover:bg-white/5 transition-colors font-semibold"
                      >
                        <FiPlusCircle className="text-orange-500 text-base" /> Add Car
                      </Link>

                      <Link
                        href="/my-bookings"
                        onClick={() => setDropdownOpen(false)}
                        className="flex items-center gap-2.5 px-4 py-2.5 text-sm text-gray-300 hover:text-white hover:bg-white/5 transition-colors font-semibold"
                      >
                        <FiList className="text-orange-500 text-base" /> My Bookings
                      </Link>

                      <Link
                        href="/my-added-cars"
                        onClick={() => setDropdownOpen(false)}
                        className="flex items-center gap-2.5 px-4 py-2.5 text-sm text-gray-300 hover:text-white hover:bg-white/5 transition-colors font-semibold"
                      >
                        <FiTrendingUp className="text-orange-500 text-base" /> My Added Cars
                      </Link>

                      <div className="border-t border-white/10 mt-1 pt-1">
                        <button
                          onClick={handleSignOut}
                          className="flex w-full items-center gap-2.5 px-4 py-2.5 text-sm text-red-400 hover:text-red-300 hover:bg-red-500/5 transition-colors font-semibold cursor-pointer"
                        >
                          <FiLogOut /> Logout
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <>
                  <Link href="/signin">
                    <AnimatedButton className="!bg-white/10 !border !border-white">
                      Login
                    </AnimatedButton>
                  </Link>
                  <Link href="/signup">
                    <AnimatedButton className="!bg-orange-300/10 !border !border-orange-500">
                      Sign Up
                    </AnimatedButton>
                  </Link>
                </>
              )}
            </div>

            {/* responsive mobile navigation toggle */}
            <button
              onClick={() => setShowMenu(!showMenu)}
              className="md:hidden text-white p-1 ml-1 sm:ml-2 hover:text-orange-500 transition-colors flex items-center justify-center"
              aria-label="Toggle Menu"
            >
              {showMenu ? (
                <FiX className="text-3xl" />
              ) : (
                <CgMenuRight className="text-3xl" />
              )}
            </button>
          </div>
        </div>

        {/* responsive mobile overlay drawer */}
        {showMenu && (
          <div className="md:hidden bg-black/95 border-t border-white/10 py-4 px-6 absolute top-full left-0 w-full shadow-xl">
            <div className="flex flex-col gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setShowMenu(false)}
                  className={`text-sm font-semibold py-3 border-b border-white/10 tracking-wide uppercase transition-colors ${
                    pathname === link.href
                      ? "text-orange-500"
                      : "text-gray-300 hover:text-white"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
              {user ? (
                <div className="flex flex-col mt-4 gap-3">
                  <Link
                    href="/profile"
                    onClick={() => setShowMenu(false)}
                    className="text-sm font-semibold text-gray-300 py-3 border-b border-white/10 tracking-wide uppercase hover:text-white transition-colors"
                  >
                    Profile
                  </Link>
                  <Link
                    href="/add-car"
                    onClick={() => setShowMenu(false)}
                    className="text-sm font-semibold text-gray-300 py-3 border-b border-white/10 tracking-wide uppercase hover:text-white transition-colors"
                  >
                    Add Car
                  </Link>
                  <Link
                    href="/my-bookings"
                    onClick={() => setShowMenu(false)}
                    className="text-sm font-semibold text-gray-300 py-3 border-b border-white/10 tracking-wide uppercase hover:text-white transition-colors"
                  >
                    My Bookings
                  </Link>
                  <Link
                    href="/my-added-cars"
                    onClick={() => setShowMenu(false)}
                    className="text-sm font-semibold text-gray-300 py-3 border-b border-white/10 tracking-wide uppercase hover:text-white transition-colors"
                  >
                    My Added Cars
                  </Link>
                  <button
                    onClick={() => {
                      handleSignOut();
                      setShowMenu(false);
                    }}
                    className="mt-2 text-sm font-bold py-3 text-center bg-red-500/10 text-red-500 border border-red-500/20 tracking-wide uppercase"
                  >
                    Logout
                  </button>
                </div>
              ) : (
                <div className="flex flex-col gap-2 mt-4">
                  <Link
                    href="/signin"
                    onClick={() => setShowMenu(false)}
                    className="text-sm font-semibold text-gray-300 py-3 text-center border border-white/20 tracking-wide uppercase hover:border-white/40 transition-colors"
                  >
                    Login
                  </Link>
                  <Link
                    href="/signup"
                    onClick={() => setShowMenu(false)}
                    className="text-sm font-bold py-3 text-center bg-orange-500 text-black tracking-wide uppercase"
                  >
                    Sign Up
                  </Link>
                </div>
              )}
            </div>
          </div>
        )}
      </nav>
    </div>
  );
}
