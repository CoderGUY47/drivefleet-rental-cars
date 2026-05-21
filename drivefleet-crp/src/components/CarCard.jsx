// UI component for displaying individual car listing
"use client";

import Link from "next/link";
import { HiArrowNarrowRight } from "react-icons/hi";

export default function CarCard({ car }) {
  const isAvailable = car.status === "Available" || !car.status;
  const carId = car._id || car.id;

  return (
    <div className="group w-full bg-white flex flex-col overflow-hidden hover:shadow-xl transition-shadow duration-300">
      <div className="relative overflow-hidden">
        <img
          src={
            car.image ||
            "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&q=80&w=800"
          }
          alt={car.name}
          className="w-full h-52 object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute top-3 left-3 text-xs font-bold uppercase px-3 py-1 bg-[#1d1d1d] text-orange-500">
          {car.category}
        </div>
        <div
          className={`absolute top-3 right-3 text-xs font-bold uppercase px-3 py-1 ${
            isAvailable
              ? "bg-orange-500 text-black"
              : "bg-neutral-500 text-white"
          }`}
        >
          {isAvailable ? "Available" : "Rented"}
        </div>
      </div>

      <div className="p-5 border-b border-gray-100 grow">
        <div className="flex items-center gap-1 text-xs text-gray-400 font-semibold mb-2 uppercase tracking-wider">
          <span className="material-symbols-outlined text-sm text-orange-500">
            location_on
          </span>
          {car.location}
        </div>
        <h3 className="text-lg font-bold text-gray-900 mb-1">{car.name}</h3>
        <p className="flex items-center justify-between text-sm text-gray-500 mb-4">
          <span>Start at</span>
          <b className="text-gray-900">৳{car.price} / day</b>
        </p>

        <div className="flex items-center justify-between pt-3 mt-3 border-t-2 border-orange-200 text-xs text-gray-500 font-semibold uppercase tracking-wider">
          <span className="flex items-center gap-1">
            <span className="material-symbols-outlined text-sm text-orange-500">
              airline_seat_recline_normal
            </span>
            {car.seats} Seats
          </span>
          <span className="flex items-center gap-1">
            <span className="material-symbols-outlined text-sm text-orange-500">
              local_gas_station
            </span>
            {car.fuelType || "Petrol"}
          </span>
        </div>
      </div>


      <div className="flex">
        <Link
          href={`/explore-cars/${carId}`}
          className={`group relative grow inline-flex items-center justify-center gap-2 py-3 font-bold uppercase tracking-widest text-xs overflow-hidden transition-all ${
            isAvailable
              ? "bg-gray-900 text-white"
              : "bg-neutral-200 text-gray-600"
          }`}
        >
          {isAvailable && (
            <div className="absolute inset-0 w-0 bg-orange-500 transition-all duration-300 ease-out group-hover:w-full" />
          )}
          <span className="relative z-10">
            {isAvailable ? "Rent This Car" : "View Details"}
          </span>
          <span className="relative z-10 group-hover:translate-x-1 transition-transform duration-300">
            <HiArrowNarrowRight />
          </span>
        </Link>
      </div>
    </div>
  );
}
