"use client";

import Link from "next/link";
import Image from "next/image";
import AnimatedButton from "@/components/AnimatedButton";
import { HiArrowNarrowLeft } from "react-icons/hi";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col lg:flex-row bg-[#0c0c0c]">
      {/* left part */}
      <div className="relative lg:w-1/2 h-64 lg:h-auto">
        <Image
          src="https://images.unsplash.com/photo-1494976388531-d1058494cdd8?auto=format&fit=crop&w=1200&q=80"
          alt="Lost on the road"
          fill
          className="object-cover opacity-60"
          priority
        />
        {/* orange gradient overlay */}
        <div className="absolute inset-0 bg-linear-to-r from-transparent via-transparent to-[#0c0c0c] hidden lg:block" />
        <div className="absolute inset-0 bg-linear-to-t from-[#0c0c0c] to-transparent lg:hidden" />

        {/* brand tag on image */}
        <div className="absolute top-6 left-6 flex items-center gap-2">
          <span className="text-xs font-bold tracking-[0.2em] uppercase text-orange-500 border border-orange-500/40 px-3 py-1">
            DriveFleet
          </span>
        </div>
      </div>

      {/* right part */}
      <div className="flex-1 flex flex-col justify-center items-start px-10 py-16 lg:px-20 lg:py-0">
        {/* error code */}
        <div className="mb-2">
          <span className="text-xs font-bold tracking-[0.3em] uppercase text-orange-500">
            Error Code
          </span>
        </div>
        <div className="text-[10rem] lg:text-[14rem] font-black leading-none text-orange-500 select-none">
          404
        </div>

        {/* divider */}
        <div className="w-16 h-1 bg-orange-500 mb-6" />
        <h1 className="text-3xl lg:text-4xl font-black text-white mb-4 tracking-tight">
          Lost on the road?
        </h1>
        <p className="text-gray-400 text-sm leading-relaxed max-w-sm mb-10">
          The page you&apos;re looking for doesn&apos;t exist or may have been
          moved. Let&apos;s get you back behind the wheel.
        </p>

        {/* buttons */}
        <div className="flex flex-col sm:flex-row gap-3">
          <Link
            href="/"
            className="group relative inline-flex items-center justify-center gap-3 px-8 py-4 bg-gray-900 text-white font-bold uppercase tracking-widest text-xs overflow-hidden transition-all rounded-none"
          >
            <div className="absolute inset-0 w-0 bg-orange-500 transition-all duration-300 ease-out group-hover:w-full" />
            <span className="relative z-10 text-lg transition-transform duration-300 group-hover:rotate-45 flex items-center">
              <HiArrowNarrowLeft />
            </span>
            <span className="relative z-10">Back to Home</span>
          </Link>
          <Link
            href="/explore-cars"
            className="px-8 py-4 text-xs font-bold uppercase tracking-widest text-gray-300 bg-transparent border border-white/30 hover:border-orange-500 hover:text-orange-500 transition-colors"
          >
            Explore Cars
          </Link>
        </div>
      </div>
    </div>
  );
}
