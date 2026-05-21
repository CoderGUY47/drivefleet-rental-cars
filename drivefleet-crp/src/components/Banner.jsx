// Premium Hero Banner with interactive action buttons
"use client";

import { useRouter } from "next/navigation";
import { Avatar, Button } from "@heroui/react";
import Image from "next/image";

export default function Banner() {
  const router = useRouter();

  return (
    <div className="relative w-full min-h-screen overflow-hidden bg-black">
      <Image
        src="https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?w=1600&auto=format&fit=crop&q=80"
        alt="DriveFleet Hero"
        className="absolute inset-0 w-full h-full object-cover"
        fill
      />
      <div className="absolute inset-0 bg-black/60" />
      <div className="relative z-10 max-w-[90%] mx-auto px-4 sm:px-6 lg:px-10 pt-28 pb-12 lg:pt-40 lg:pb-20 flex flex-col min-h-screen justify-between gap-12">
        <div className="flex-1 flex flex-col justify-center">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
            {/* left column main typography intro */}
            <div>
              <h1 className="text-white font-bold leading-none tracking-tight text-[clamp(2.5rem,7vw,6.5rem)] uppercase italic">
                Feel The Luxury,
                <br />
                Live The Thrill.
              </h1>
              <p className="mt-6 text-white/80 text-base md:text-lg max-w-2xl leading-relaxed">
                Experience unmatched performance that pushes every limit—
                seamlessly paired with exquisite comfort designed to envelop you
                in luxury from the moment.
              </p>
            </div>

            {/* right column spacing placeholder */}
            <div />
          </div>
        </div>

        {/* bottom section membership stats and call to action buttons */}
        <div className="flex flex-col lg:flex-row items-start lg:items-end justify-between gap-8 w-full mt-auto">
          <div className="bg-white rounded-none p-4 flex items-center gap-4 shadow-xl w-full sm:w-72 max-w-xs flex-shrink-0">
            <div className="w-20 h-16 rounded-none overflow-hidden flex-shrink-0 relative">
              <Image
                src="https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?w=200&auto=format&fit=crop&q=80"
                alt="Car thumbnail"
                width={200}
                height={160}
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-7 h-7 bg-black/60 rounded-full flex items-center justify-center">
                  <span className="material-symbols-outlined text-white text-sm">
                    play_arrow
                  </span>
                </div>
              </div>
            </div>

            <div>
              <div className="flex items-center -space-x-2 mb-1">
                <Avatar
                  size="sm"
                  src="https://randomuser.me/api/portraits/men/32.jpg"
                  className="border-2 border-white"
                />
                <Avatar
                  size="sm"
                  src="https://randomuser.me/api/portraits/women/44.jpg"
                  className="border-2 border-white"
                />
                <Avatar
                  size="sm"
                  src="https://randomuser.me/api/portraits/men/55.jpg"
                  className="border-2 border-white"
                />
                <Avatar
                  size="sm"
                  fallback={
                    <span className="text-white font-bold text-xs">+</span>
                  }
                  className="bg-orange-500 border-2 border-white flex items-center justify-center text-white"
                />
              </div>
              <p className="text-gray-900 font-bold text-sm">12k+ Membership</p>
              <p className="text-gray-500 text-xs">Enjoy Our Rent Car</p>
            </div>
          </div>

          <div className="flex flex-col gap-4 w-full max-w-md">
            <div className="flex gap-3">
              <Button
                onClick={() => router.push("/explore-cars")}
                className="px-6 py-3 rounded-none bg-orange-50 text-black font-bold text-sm hover:opacity-90 transition-opacity"
              >
                Rent A Car
              </Button>
              <button
                onClick={() => router.push("/explore-cars")}
                className="px-6 py-3 rounded-none bg-white/15 backdrop-blur-sm border border-white text-white font-bold text-sm hover:bg-white/25 transition-colors"
              >
                Buy A Car
              </button>
            </div>
            <p className="text-white/80 text-sm md:text-base leading-relaxed">
              From exotic sports cars to luxury sedans and SUVs, DriveFleet
              offers an exceptional selection of premium, trusted, personalised
              service.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
