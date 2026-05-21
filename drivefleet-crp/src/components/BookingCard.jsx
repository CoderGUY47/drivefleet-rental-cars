"use client";

import { useState } from "react";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

export default function BookingCard({ car, currentUser }) {
  const router = useRouter();
  const today = new Date().toISOString().split("T")[0];

  const [pickupDate, setPickupDate] = useState("");
  const [returnDate, setReturnDate] = useState("");
  const [loading, setLoading] = useState(false);


  // calculate total booking days from pickup and return dates
  const totalDays = (() => {
    if (!pickupDate || !returnDate) return 0;
    const diff =
      (new Date(returnDate) - new Date(pickupDate)) / (1000 * 60 * 60 * 24);
    return diff > 0 ? diff : 0;
  })();

  const pricePerDay = car?.pricePerDay || car?.price || 0;
  const totalCost = (totalDays * pricePerDay).toFixed(2);

  // process form submission and create booking record
  const handleBook = async (e) => {
    e.preventDefault();

    if (!currentUser) {
      router.push("/signin");
      return;
    }

    if (totalDays <= 0) {
      toast.error("Return date must be after pickup date.");
      return;
    }

    try {
      setLoading(true);

      // retrieve authorization token for the api request
      const { data: tokenData } = await authClient.token();
      const token = tokenData?.token || "";

      const apiUrl = process.env.NEXT_PUBLIC_SERVER_URL;

      const payload = {
        carId: car._id || car.id,
        carName: car.name,
        carImage: car.image,
        category: car.category,
        pickupDate,
        returnDate,
        totalDays,
        totalCost: parseFloat(totalCost),
        userId: currentUser.id || currentUser._id,
        userEmail: currentUser.email,
        bookedAt: new Date().toISOString(),
      };

      const res = await fetch(`${apiUrl}/booking`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || "Booking failed");
      }

      toast.success("Booking confirmed! 🎉");
      setPickupDate("");
      setReturnDate("");
    } catch (err) {
      toast.error(err.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="lg:col-span-1">
      <div className="sticky top-28 border border-neutral-800 bg-[#0d0d0d] p-8 shadow-2xl">
        {/* header showing price details */}
        <div className="mb-6 pb-6 border-b border-neutral-800">
          <span className="text-xs font-semibold uppercase tracking-widest text-neutral-500 block mb-1">
            Starting from
          </span>
          <div className="flex items-end gap-1">
            <span className="text-4xl font-black text-white">
              ৳{pricePerDay}
            </span>
            <span className="text-sm text-neutral-500 mb-1 font-medium">
              / day
            </span>
          </div>
        </div>

        {/* form to select dates and submit booking */}
        <form onSubmit={handleBook} className="space-y-5">
          {/* pickup date input field */}
          <div>
            <label className="block text-[11px] font-bold uppercase tracking-widest text-neutral-400 mb-2">
              Pickup Date
            </label>
            <input
              type="date"
              required
              min={today}
              value={pickupDate}
              onChange={(e) => {
                setPickupDate(e.target.value);
                if (returnDate && returnDate <= e.target.value)
                  setReturnDate("");
              }}
              className="w-full bg-black border border-neutral-700 text-white text-sm px-4 py-3 focus:outline-none focus:border-orange-500 transition-colors appearance-none"
              style={{ colorScheme: "dark" }}
            />
          </div>

          {/* return date input field */}
          <div>
            <label className="block text-[11px] font-bold uppercase tracking-widest text-neutral-400 mb-2">
              Return Date
            </label>
            <input
              type="date"
              required
              min={pickupDate || today}
              value={returnDate}
              onChange={(e) => setReturnDate(e.target.value)}
              className="w-full bg-black border border-neutral-700 text-white text-sm px-4 py-3 focus:outline-none focus:border-orange-500 transition-colors appearance-none"
              style={{ colorScheme: "dark" }}
            />
          </div>

          {/* billing summary breakdown */}
          {totalDays > 0 && (
            <div className="bg-black border border-neutral-800 p-4 space-y-2">
              <div className="flex justify-between text-sm text-neutral-400">
                <span>
                  ৳{pricePerDay} × {totalDays} day{totalDays !== 1 ? "s" : ""}
                </span>
                <span className="text-white font-semibold">৳{totalCost}</span>
              </div>
              <div className="border-t border-neutral-800 pt-2 flex justify-between">
                <span className="text-xs font-bold uppercase tracking-widest text-neutral-500">
                  Total
                </span>
                <span className="text-lg font-black text-orange-500">
                  ৳{totalCost}
                </span>
              </div>
            </div>
          )}

          {/* submit reservation button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-4 text-sm font-black uppercase tracking-widest bg-orange-500 text-black hover:bg-orange-400 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading
              ? "Processing..."
              : currentUser
                ? "Reserve Now"
                : "Sign In to Book"}
          </button>

          {/* button linking to users bookings page */}
          {currentUser && (
            <button
              type="button"
              onClick={() => router.push("/my-bookings")}
              className="w-full py-3 text-xs font-bold uppercase tracking-widest text-neutral-400 border border-neutral-800 hover:border-orange-500/30 hover:text-orange-500 transition-colors"
            >
              View My Bookings
            </button>
          )}
        </form>

        {/* policy footer notice */}
        <p className="mt-6 text-[11px] text-neutral-600 text-center leading-relaxed">
          Free cancellation up to 24 hours before pickup. No hidden charges.
        </p>
      </div>
    </div>
  );
}
