"use client";

import Link from "next/link";
import { HiArrowNarrowLeft, HiRefresh } from "react-icons/hi";
import { MdErrorOutline } from "react-icons/md";

export default function ErrorPage({ error, reset }) {
  return (
    <div className="min-h-screen bg-[#0c0c0c] flex flex-col items-center justify-center px-6 text-center">
      {/* icon */}
      <div className="mb-6 w-20 h-20 flex items-center justify-center border border-orange-500/30 bg-orange-500/10">
        <MdErrorOutline className="text-orange-500 text-5xl" />
      </div>

      {/* label */}
      <span className="text-xs font-bold tracking-[0.3em] uppercase text-orange-500 mb-3">
        Something went wrong
      </span>

      {/* heading */}
      <h1 className="text-4xl md:text-5xl font-black text-white mb-4 tracking-tight">
        Car Details Unavailable
      </h1>

      {/* divider */}
      <div className="w-16 h-1 bg-orange-500 mb-6 mx-auto" />

      {/* description */}
      <p className="text-gray-400 text-sm leading-relaxed max-w-sm mb-2">
        We couldn&apos;t load this vehicle&apos;s details. It may have been
        removed or there was a server error.
      </p>
      {error?.message && (
        <p className="text-xs text-gray-600 font-mono max-w-xs mb-8 truncate">
          {error.message}
        </p>
      )}

      {/* buttons */}
      <div className="flex flex-col sm:flex-row gap-3 mt-6">
        {/* try again */}
        <button
          onClick={reset}
          className="group relative inline-flex items-center justify-center gap-3 px-8 py-4 bg-gray-900 text-white font-bold uppercase tracking-widest text-xs overflow-hidden transition-all"
        >
          <div className="absolute inset-0 w-0 bg-orange-500 transition-all duration-300 ease-out group-hover:w-full" />
          <span className="relative z-10 flex items-center">
            <HiRefresh className="mr-2 text-base" />
          </span>
          <span className="relative z-10">Try Again</span>
        </button>

        {/* back to fleet */}
        <Link
          href="/explore-cars"
          className="group relative inline-flex items-center justify-center gap-3 px-8 py-4 text-white font-bold uppercase tracking-widest text-xs border border-white/10 hover:border-orange-500 hover:text-orange-500 transition-colors"
        >
          <HiArrowNarrowLeft className="text-base" />
          Back to Fleet
        </Link>
      </div>
    </div>
  );
}