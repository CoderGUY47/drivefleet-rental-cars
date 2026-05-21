// Modular site index footer and social directories
"use client";

import { Button } from "@heroui/react";
import Link from "next/link";
import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaChevronRight,
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaEnvelope,
} from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

export default function Footer() {
  return (
    <footer className="w-full bg-black border-t border-neutral-900 text-white">
      <div className="relative py-16 bg-black overflow-hidden">
        <div className="absolute left-0 top-0 bottom-0 w-full lg:w-[45%] pointer-events-none opacity-40 overflow-hidden select-none">
          <img
            src="/assets/vecteezy_sport-car-model-photo_26175422.jpg"
            alt="DriveFleet Premium Background"
            className="w-full h-full object-cover object-left -scale-x-100"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-black/15 to-black" />
        </div>

        <div className="relative z-10 max-w-[95%] mx-auto px-0 flex flex-col lg:flex-row gap-12 justify-between items-start">
          <div className="w-full lg:w-[40%] space-y-5">
            <Link href="/" className="flex items-center">
              <img
                src="/assets/drivefleet-logo.png"
                alt="DriveFleet"
                className="h-20 w-auto"
              />
              <span className="text-3xl font-bold italic text-orange-500 tracking-tight uppercase">
                DriveFleet
              </span>
            </Link>
            <p className="text-base text-white max-w-lg leading-relaxed">
              Experience the pinnacle of automotive engineering and premium
              high-performance mobility. Access the world's most elite vehicle
              fleet with DriveFleet.
            </p>
            {/* social media connection icons */}
            <div className="flex gap-3 pt-2">
              <FaFacebookF className="text-xl text-white bg-orange-500/20 border border-orange-500 size-10 p-2 rounded-none hover:bg-orange-600 transition-colors duration-200" />
              <FaInstagram className="text-xl text-white bg-orange-500/20 border border-orange-500 size-10 p-2 rounded-none hover:bg-orange-600 transition-colors duration-200" />
              <FaXTwitter className="text-xl text-white bg-orange-500/20 border border-orange-500 size-10 p-2 rounded-none hover:bg-orange-600 transition-colors duration-200" />
              <FaLinkedinIn className="text-xl text-white bg-orange-500/20 border border-orange-500 size-10 p-2 rounded-none hover:bg-orange-600 transition-colors duration-200" />
            </div>
          </div>

          <div className="w-full lg:w-[20%] space-y-6">
            <h4 className="text-white font-bold text-base uppercase tracking-widest relative pb-2 border-b border-orange-500 inline-block">
              Useful Links
            </h4>
            <ul className="space-y-3.5 text-base text-white/60">
              <li>
                <Link href="/" className="flex items-center gap-2.5 hover:text-orange-500 transition-colors duration-200">
                  <FaChevronRight className="text-[10px] text-orange-500 shrink-0" />
                  Home
                </Link>
              </li>
              <li>
                <Link href="/explore-cars" className="flex items-center gap-2.5 hover:text-orange-500 transition-colors duration-200">
                  <FaChevronRight className="text-[10px] text-orange-500 shrink-0" />
                  Explore Cars
                </Link>
              </li>
              <li>
                <Link href="/add-car" className="flex items-center gap-2.5 hover:text-orange-500 transition-colors duration-200">
                  <FaChevronRight className="text-[10px] text-orange-500 shrink-0" />
                  Add Car
                </Link>
              </li>
              <li>
                <Link href="/my-bookings" className="flex items-center gap-2.5 hover:text-orange-500 transition-colors duration-200">
                  <FaChevronRight className="text-[10px] text-orange-500 shrink-0" />
                  My Bookings
                </Link>
              </li>
              <li>
                <Link href="/my-added-cars" className="flex items-center gap-2.5 hover:text-orange-500 transition-colors duration-200">
                  <FaChevronRight className="text-[10px] text-orange-500 shrink-0" />
                  My Added Cars
                </Link>
              </li>
              <li>
                <Link href="/contact" className="flex items-center gap-2.5 hover:text-orange-500 transition-colors duration-200">
                  <FaChevronRight className="text-[10px] text-orange-500 shrink-0" />
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          <div className="w-full lg:w-[25%] space-y-6">
            <h4 className="text-white font-bold text-base uppercase tracking-widest relative pb-2 border-b border-orange-500 inline-block">
              Contact Info
            </h4>
            <ul className="space-y-3.5 text-base text-white/60">
              <li className="flex items-center gap-2.5 hover:text-orange-500 transition-colors duration-200 cursor-pointer">
                <FaMapMarkerAlt className="text-sm flex-shrink-0 text-orange-500" />
                <span>Mirpur DOHS, Road 4, House 12 <br /> Dhaka 1216, Bangladesh</span>
              </li>
              <li className="flex items-center gap-2.5 hover:text-orange-500 transition-colors duration-200 cursor-pointer">
                <FaPhoneAlt className="text-sm flex-shrink-0 text-orange-500" />
                <span>+880 1712-345678 <br /> Sat–Thu, 9am–7pm (BST, UTC+6)</span>
              </li>
              <li className="flex items-center gap-2.5 hover:text-orange-500 transition-colors duration-200 cursor-pointer">
                <FaEnvelope className="text-sm flex-shrink-0 text-orange-500" />
                <span>hello@drivefleet.com.bd
                  <br />
                  support@drivefleet.com.bd</span>
              </li>
            </ul>
          </div>

          {/* vip club subscription form */}
          <div className="w-full lg:w-[40%] space-y-6">
            <h4 className="text-white font-bold text-base uppercase tracking-widest relative pb-2 border-b border-orange-500 inline-block">
              Club Membership
            </h4>
            <div className="space-y-4">
              <h3 className="text-lg font-bold uppercase tracking-wider text-white">
                Subscribe to the Elite Circle
              </h3>
              <p className="text-xs text-neutral-400 max-w-sm leading-relaxed">
                Receive premium updates on new supercars, fleet locations, and
                exclusive member benefits.
              </p>
              <form
                onSubmit={(e) => e.preventDefault()}
                className="flex w-full items-center border border-neutral-800 bg-white/10 p-1 rounded-none"
              >
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-grow bg-transparent px-3 py-4 text-base text-white focus:outline-none placeholder-white/40 min-w-0"
                  required
                />
                <Button
                  type="submit"
                  className="bg-orange-500 text-black px-4 py-3 text-base font-bold uppercase tracking-widest hover:bg-orange-400 transition-colors font-bold rounded-none"
                >
                  Subscribe
                </Button>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* copyright information footer bar */}
      <div className="border-t border-neutral-900 bg-black py-6">
        <div className="w-[97%] mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-white/70">
          <span>
            &copy; {new Date().getFullYear()} DriveFleet Inc. All Rights reserved & <Link href="https://github.com/CoderGUY47" className="hover:text-orange-500 transition-colors">Designed By CoderGUY47</Link>
          </span>
          <div className="flex gap-6">
            {["Privacy Policy", "Terms of Service", "Sitemap"].map((item) => (
              <a
                key={item}
                href="#"
                className="hover:text-orange-500 transition-colors"
              >
                {item}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
