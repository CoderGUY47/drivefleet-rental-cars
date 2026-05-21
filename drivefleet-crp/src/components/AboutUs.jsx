// Company branding and mission description
"use client";

import Image from "next/image";
import Link from "next/link";
import AnimatedButton from "./AnimatedButton";
import { FiClock, FiShield, FiArrowRight } from "react-icons/fi";

export default function AboutUs() {
  return (
    <section className="py-24 bg-black border-t border-neutral-900 relative overflow-hidden">
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-[500px] h-[500px] bg-orange-500/5 blur-[120px] pointer-events-none" />
      <div className="max-w-[90%] mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* left side image with overlay statistics */}
          <div className="relative">
            <div className="relative overflow-hidden border border-neutral-800 shadow-2xl">
              <Image
                width={900}
                height={480}
                src="https://images.unsplash.com/photo-1511919884226-fd3cad34687c?auto=format&fit=crop&w=900&q=80"
                alt="DriveFleet Experience"
                className="w-full h-[480px] object-cover opacity-80"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
            </div>
            <div className="absolute -top-4 -left-4 bg-orange-500 text-black p-6 shadow-2xl">
              <p className="text-4xl font-black">1000+</p>
              <p className="text-xs font-bold uppercase tracking-widest mt-1">Cars Rented</p>
            </div>

            <div className="absolute -bottom-4 -right-4 bg-[#0c0c0c] border border-neutral-800 text-white p-5 shadow-xl">
              <p className="text-3xl font-black text-orange-500">98%</p>
              <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mt-1">Client Satisfaction</p>
            </div>
          </div>

          {/* right side text descriptions */}
          <div className="space-y-8">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-orange-500 block mb-3">
                About Us
              </span>
              <h2 className="text-4xl md:text-5xl font-extrabold text-white uppercase tracking-tight leading-tight">
                Redefining Premium Car Rental,{" "}
                <span className="text-orange-500 italic">One Drive</span> at a Time.
              </h2>
            </div>

            <p className="text-base text-gray-400 leading-relaxed">
              At DriveFleet, we believe every journey deserves an exceptional vehicle. From executive sedans
              to high-performance supercars, we curate the finest fleet for the most discerning drivers in Bangladesh.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div className="flex items-start gap-4 bg-white/5 border border-white/10 p-5">
                <div className="p-2.5 bg-orange-500/20 text-orange-500 border border-orange-500/30 shrink-0">
                  <FiClock className="text-xl" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white uppercase tracking-wider">24/7 Support</h4>
                  <p className="text-sm text-white/70 mt-1 leading-relaxed">
                    Round-the-clock elite assistance, anywhere you are.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4 bg-white/5 border border-white/10 p-5">
                <div className="p-2.5 bg-orange-500/20 text-orange-500 border border-orange-500/30 shrink-0">
                  <FiShield className="text-xl" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white uppercase tracking-wider">Competitive Pricing</h4>
                  <p className="text-sm text-white/70 mt-1 leading-relaxed">
                    Transparent rates, zero hidden fees, maximum value.
                  </p>
                </div>
              </div>
            </div>
            
            <Link href="/explore-cars">
              <AnimatedButton icon={<FiArrowRight />}>
                Explore Our Fleet
              </AnimatedButton>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
