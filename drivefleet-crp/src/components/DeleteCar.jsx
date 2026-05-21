"use client";

import { useState } from "react";

export default function DeleteCar({ carId, carName, onDeleteSuccess }) {
  const [confirming, setConfirming] = useState(false);

  const handleDelete = () => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("cars_list");
      if (stored) {
        try {
          const cars = JSON.parse(stored);
          const filtered = cars.filter((c) => c.id !== carId);
          localStorage.setItem("cars_list", JSON.stringify(filtered));
          
          /* delete bookings associated with this removed car */
          const storedBookings = localStorage.getItem("fleet_bookings");
          if (storedBookings) {
            const bookings = JSON.parse(storedBookings);
            const filteredBookings = bookings.filter((b) => b.carId !== carId);
            localStorage.setItem("fleet_bookings", JSON.stringify(filteredBookings));
          }
          
          onDeleteSuccess();
        } catch (e) {
          console.error("Failed to delete vehicle:", e);
        }
      }
    }
  };

  if (confirming) {
    return (
      <div className="flex gap-1 animate-in fade-in duration-200">
        <button
          onClick={handleDelete}
          className="p-2.5 bg-error text-on-error hover:bg-error-container hover:text-on-error-container flex items-center justify-center transition-all rounded-none cursor-pointer"
          title="Confirm Delete"
        >
          <span className="material-symbols-outlined text-[18px]">done</span>
        </button>
        <button
          onClick={() => setConfirming(false)}
          className="p-2.5 bg-surface-variant hover:bg-outline-variant text-on-surface-variant flex items-center justify-center transition-all rounded-none cursor-pointer"
          title="Cancel"
        >
          <span className="material-symbols-outlined text-[18px]">close</span>
        </button>
      </div>
    );
  }

  return (
    <button
      onClick={() => setConfirming(true)}
      aria-label={`Delete ${carName}`}
      className="p-2.5 border border-error/40 hover:bg-error/10 text-error flex items-center justify-center transition-all rounded-none cursor-pointer"
      title="Delete Vehicle"
    >
      <span className="material-symbols-outlined text-[18px]">delete</span>
    </button>
  );
}
