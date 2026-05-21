"use client";
import { useState } from "react";

export default function EditCarModal({
  isOpen,
  onClose,
  car,
  onUpdateSuccess,
}) {
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());

    if (!data.name || !data.price || !data.location) return;

    setIsSubmitting(true);
    setTimeout(() => {
      if (typeof window !== "undefined") {
        const stored = localStorage.getItem("cars_list");
        if (stored) {
          try {
            const list = JSON.parse(stored);
            const updatedList = list.map((item) =>
              item.id === car.id
                ? {
                    ...item,
                    ...data,
                  }
                : item,
            );
            localStorage.setItem("cars_list", JSON.stringify(updatedList));
            setIsSubmitting(false);
            if (onUpdateSuccess) onUpdateSuccess();
            onClose();
          } catch (err) {
            console.error(err);
            setIsSubmitting(false);
          }
        }
      }
    }, 600);
  };

  const inputCls =
    "w-full border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-800 focus:outline-none focus:border-orange-500 transition-colors";
  const labelCls =
    "block text-xs font-bold uppercase tracking-wider text-gray-600 mb-1.5";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-black/70 cursor-pointer"
        onClick={onClose}
      />

      <div className="relative w-full max-w-lg bg-white shadow-2xl max-h-[90vh] overflow-y-auto">
        <div className="h-1 w-full bg-orange-500" />

        <div className="p-8">
          <div className="flex justify-between items-center mb-7">
            <div>
              <span className="text-xs font-semibold uppercase tracking-widest block mb-1 text-orange-500">
                ADMIN PANEL
              </span>
              <h3 className="text-xl font-bold text-gray-900">Edit Vehicle</h3>
            </div>
            <button
              onClick={onClose}
              className="w-9 h-9 flex items-center justify-center border border-gray-200 hover:border-gray-400 transition-colors"
            >
              <span className="material-symbols-outlined text-gray-600 text-[20px]">
                close
              </span>
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className={labelCls}>Vehicle Name / Model</label>
              <input
                type="text"
                required
                name="name"
                defaultValue={car?.name || ""}
                placeholder="Tesla Model S"
                className={inputCls}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className={labelCls}>Category</label>
                <select
                  name="category"
                  defaultValue={car?.category || "Luxury"}
                  className={inputCls}
                >
                  <option value="Electric">Electric</option>
                  <option value="SUV">SUV</option>
                  <option value="Luxury">Luxury</option>
                  <option value="Sedan">Sedan</option>
                </select>
              </div>
              <div>
                <label className={labelCls}>Status</label>
                <select
                  name="status"
                  defaultValue={car?.status || "Available"}
                  className={inputCls}
                >
                  <option value="Available">Available</option>
                  <option value="Rented">Rented</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className={labelCls}>Rate / Day (৳)</label>
                <input
                  type="number"
                  required
                  name="price"
                  defaultValue={car?.price || ""}
                  placeholder="250"
                  className={inputCls}
                />
              </div>
              <div>
                <label className={labelCls}>Location</label>
                <input
                  type="text"
                  required
                  name="location"
                  defaultValue={car?.location || ""}
                  placeholder="Downtown"
                  className={inputCls}
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className={labelCls}>Seats</label>
                <input
                  type="number"
                  required
                  name="seats"
                  defaultValue={car?.seats || "5"}
                  placeholder="5"
                  className={inputCls}
                />
              </div>
              <div>
                <label className={labelCls}>Fuel Type</label>
                <input
                  type="text"
                  required
                  name="fuelType"
                  defaultValue={car?.fuelType || "Petrol"}
                  placeholder="Petrol / Electric"
                  className={inputCls}
                />
              </div>
            </div>

            <div>
              <label className={labelCls}>Image URL</label>
              <input
                type="url"
                name="image"
                defaultValue={car?.image || ""}
                placeholder="https://example.com/car.jpg"
                className={inputCls}
              />
            </div>

            <div>
              <label className={labelCls}>Description</label>
              <textarea
                name="description"
                defaultValue={car?.description || ""}
                placeholder="Brief description of the vehicle..."
                rows={3}
                className={`${inputCls} resize-none`}
              />
            </div>

            <div className="flex justify-end gap-3 pt-4 border-t border-gray-100">
              <button
                type="button"
                onClick={onClose}
                className="px-6 py-3 text-sm font-bold uppercase tracking-widest border border-gray-300 text-gray-700 hover:border-gray-500 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="px-8 py-3 text-sm font-bold uppercase tracking-widest text-gray-900 transition-opacity hover:opacity-90 disabled:opacity-50 flex items-center gap-2 bg-orange-500"
              >
                {isSubmitting ? (
                  <>
                    <span className="material-symbols-outlined text-base animate-spin">
                      sync
                    </span>
                    Saving...
                  </>
                ) : (
                  "Save Changes"
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
