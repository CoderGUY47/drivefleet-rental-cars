import React from "react";
import { Button } from "@heroui/react";
import { FiMapPin, FiArrowRight, FiArrowUpRight } from "react-icons/fi";
import { FaGasPump, FaChair } from "react-icons/fa";
import { FaBangladeshiTakaSign } from "react-icons/fa6";
import Link from "next/link";
import AnimatedButton from "./AnimatedButton";
import Image from "next/image";

const FeaturedCars = async () => {
  const apiUrl = process.env.NEXT_PUBLIC_SERVER_URL;
  let cars = [];

  try {
    const res = await fetch(`${apiUrl}/featured`, { cache: "no-store" });
    if (res.ok) {
      cars = await res.json();
    }
  } catch (error) {
    console.error("Failed to fetch featured cars:", error);
  }

  if (!cars || cars.length === 0) {
    return null;
  }

  return (
    <section className="bg-black py-24 border-t border-neutral-900 relative">
      <div className="w-full md:max-w-[90%] mx-auto px-3 sm:px-6">
        {/* header title section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="text-left">
            <h2 className="text-3xl md:text-5xl font-bold text-white uppercase tracking-wider">
              Featured Cars
            </h2>
          </div>
          <Link href="/explore-cars">
            <AnimatedButton icon={<FiArrowRight />}>
              All Vehicles
            </AnimatedButton>
          </Link>
        </div>

        {/* grid catalog list container */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {cars.map((car) => {
            return (
              <div
                key={car.id || car._id}
                className="flex flex-col group bg-[#0c0c0c] border border-neutral-800 p-4 w-full"
              >
                <div className="relative h-86 w-full overflow-hidden shadow-sm">
                  <Image
                    width={1000}
                    height={1000}
                    src={
                      car.image ||
                      "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&q=80"
                    }
                    alt={car.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 grayscale group-hover:grayscale-0"
                  />
                  <div className="absolute top-4 right-4 bg-black/90 px-3 py-1.5 text-[10px] font-bold text-orange-500 uppercase tracking-widest border border-neutral-800">
                    {car.category}
                  </div>
                </div>
                <div className="pt-6 flex flex-col justify-between flex-1">
                  <div>
                    {/* location details label */}
                    <div className="flex items-center gap-1 text-neutral-400 text-xs font-bold uppercase tracking-widest mb-2">
                      <FiMapPin className="text-orange-500" />
                      <span>{car.location}</span>
                    </div>

                    {/* title and rate information row */}
                    <div className="flex flex-col sm:flex-row justify-between items-start gap-3 sm:gap-4 mb-5">
                      <h3 className="text-2xl font-bold text-white uppercase tracking-wider group-hover:text-orange-500 transition-colors text-left">
                        {car.name}
                      </h3>
                      <div className="text-left sm:text-right">
                        <span className="text-2xl font-bold text-white flex items-center gap-1 justify-start sm:justify-end">
                          <FaBangladeshiTakaSign className="text-lg" />
                          {car.price}
                        </span>
                        <span className="text-[10px] text-neutral-500 font-bold uppercase tracking-widest block">
                          /Day
                        </span>
                      </div>
                    </div>

                    {/* vehicle parameters specifications row */}
                    <div className="flex flex-col xl:flex-row items-start xl:items-center gap-4 text-neutral-400 text-xs font-bold uppercase tracking-widest mb-6 border-y border-neutral-800 py-4 w-full">
                      <div className="flex flex-col sm:flex-row xl:flex-row justify-between items-start sm:items-center gap-4 w-full">
                        <div className="flex items-center gap-6">
                          <div className="flex items-center gap-2">
                            <FaChair className="text-orange-500 text-sm" />
                            <span>{car.seats} Seats</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <FaGasPump className="text-orange-500 text-sm" />
                            <span>{car.fuelType || "Petrol"}</span>
                          </div>
                        </div>
                        <AnimatedButton className="w-full sm:w-auto">
                          <Link
                            href={`/explore-cars/${car.id || car._id}`}
                            className="inline-flex items-center justify-center gap-2 text-white !text-sm w-full"
                          >
                            Rent This Car{" "}
                            <FiArrowUpRight className="text-base font-bold" />
                          </Link>
                        </AnimatedButton>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default FeaturedCars;
