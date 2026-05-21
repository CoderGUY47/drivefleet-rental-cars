// Client-side booking tracking layout
"use client";

import { useState } from "react";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

export default function MyBookingCard({ booking }) {
  const router = useRouter();
  const [cancelling, setCancelling] = useState(false);

  const {
    id,
    carId,
    carName,
    carImage,
    category,
    pickupDate,
    returnDate,
    totalDays,
    totalCost,
  } = booking;

  const handleCancel = async () => {
    try {
      setCancelling(true);
      const { data: tokenData } = await authClient.token();
      const token = tokenData?.token || "";
      const apiUrl = process.env.NEXT_PUBLIC_SERVER_URL;

      const res = await fetch(`${apiUrl}/booking/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (res.ok) {
        toast.success("Booking cancelled successfully.");
        router.refresh(); // triggers server component re-fetch
      } else {
        toast.error("Failed to cancel booking. Please try again.");
      }
    } catch (err) {
      console.error("Failed to cancel booking:", err);
      toast.error("Something went wrong. Please try again.");
    } finally {
      setCancelling(false);
    }
  };

  return (
    <div className="w-full bg-[#0c0c0c] shadow-2xl overflow-hidden flex flex-col md:flex-row relative border border-neutral-800 rounded-none keep-dark-card">
      <div className="absolute top-4 right-4 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-[#0c0c0c] z-10 bg-orange-500">
        Reserved
      </div>

      {/* car image */}
      <div className="w-full md:w-64 h-48 md:h-auto flex-shrink-0 bg-black overflow-hidden relative">
        <img
          src={
            carImage ||
            "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&q=80&w=600"
          }
          alt={carName}
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-transparent to-[#0c0c0c]/40" />
      </div>

      {/* details */}
      <div className="p-6 flex-grow flex flex-col justify-between gap-4">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {/* main info */}
          <div className="lg:col-span-2 space-y-2">
            <div className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-orange-500">
              <span className="material-symbols-outlined text-[16px]">
                directions_car
              </span>
              <span>{category || "Luxury"}</span>
            </div>
            <h3 className="text-xl font-bold text-white tracking-wide">
              {carName}
            </h3>

            <div className="flex flex-wrap gap-4 pt-2 text-xs text-neutral-400 font-medium">
              <div className="flex items-center gap-1.5">
                <span className="material-symbols-outlined text-[15px] text-orange-500/80">
                  calendar_today
                </span>
                <span>
                  Pickup:{" "}
                  <strong className="text-neutral-200">{pickupDate}</strong>
                </span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="material-symbols-outlined text-[15px] text-orange-500/80">
                  calendar_today
                </span>
                <span>
                  Return:{" "}
                  <strong className="text-neutral-200">{returnDate}</strong>
                </span>
              </div>
            </div>
          </div>

          {/* metrics */}
          <div className="flex flex-row lg:flex-col justify-between lg:items-end border-t lg:border-t-0 lg:border-l border-neutral-800 pt-3 lg:pt-0 lg:pl-6">
            <div className="text-left lg:text-right">
              <span className="text-xs text-neutral-500 font-semibold uppercase block mb-0.5">
                Duration
              </span>
              <span className="text-sm font-bold text-white">
                {totalDays} Days
              </span>
            </div>
            <div className="text-right">
              <span className="text-xs text-neutral-500 font-semibold uppercase block mb-0.5">
                Total Cost
              </span>
              <span className="text-xl font-bold text-orange-500">
                ৳{totalCost}
              </span>
            </div>
          </div>
        </div>

        {/* cancel */}
        <div className="flex justify-end pt-3 border-t border-neutral-800 mt-auto">
          <button
            onClick={handleCancel}
            disabled={cancelling}
            className="px-5 py-2 text-xs font-bold uppercase tracking-widest text-red-500 border border-red-500/20 hover:border-red-500/40 hover:bg-red-500/5 transition-all duration-300 disabled:opacity-40 disabled:cursor-not-allowed"
          >
            {cancelling ? "Cancelling..." : "Cancel Booking"}
          </button>
        </div>
      </div>
    </div>
  );
}
