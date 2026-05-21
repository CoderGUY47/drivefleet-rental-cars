"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { toast } from "react-toastify";
import { authClient } from "@/lib/auth-client";
import { FaBangladeshiTakaSign, FaPen, FaTrashCan } from "react-icons/fa6";
import { FiMapPin, FiCheckCircle, FiXCircle } from "react-icons/fi";
import AnimatedButton from "@/components/AnimatedButton";

export default function MyAddedCarsPage() {
  const router = useRouter();
  const { data: session, isPending: checkingAuth } = authClient.useSession();
  const currentUser = session?.user;

  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingCar, setEditingCar] = useState(null);
  const [deletingCarId, setDeletingCarId] = useState(null);

  /* edit modal form fields */
  const [editPrice, setEditPrice] = useState("");
  const [editDescription, setEditDescription] = useState("");
  const [editAvailability, setEditAvailability] = useState("");
  const [editImage, setEditImage] = useState("");
  const [editCategory, setEditCategory] = useState("");
  const [editLocation, setEditLocation] = useState("");
  const [editSeats, setEditSeats] = useState("");
  const [editFuelType, setEditFuelType] = useState("");
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    if (!checkingAuth && !currentUser) {
      router.push("/signin");
      return;
    }

    if (currentUser) {
      fetchMyCars();
    }
  }, [currentUser, checkingAuth]);

  const fetchMyCars = async () => {
    try {
      setLoading(true);
      const { data: tokenData } = await authClient.token();
      const apiUrl = process.env.NEXT_PUBLIC_SERVER_URL;
      const res = await fetch(`${apiUrl}/my-cars/${currentUser.email}`, {
        headers: {
          Authorization: `Bearer ${tokenData?.token}`,
        },
        cache: "no-store",
      });

      if (res.ok) {
        const data = await res.json();
        setCars(data);
      } else {
        toast.error("Failed to load your listed vehicles.");
      }
    } catch (err) {
      console.error(err);
      toast.error("An error occurred while fetching your cars.");
    } finally {
      setLoading(false);
    }
  };

  const handleOpenEdit = (car) => {
    setEditingCar(car);
    setEditPrice(car.price || "");
    setEditDescription(car.description || "");
    setEditAvailability(car.availability !== undefined ? String(car.availability) : "true");
    setEditImage(car.image || "");
    setEditCategory(car.category || "Sedan");
    setEditLocation(car.location || "");
    setEditSeats(car.seats || "");
    setEditFuelType(car.fuelType || "");
  };

  const handleUpdateCar = async (e) => {
    e.preventDefault();
    if (!editingCar) return;

    try {
      setSaving(true);
      const { data: tokenData } = await authClient.token();
      const apiUrl = process.env.NEXT_PUBLIC_SERVER_URL;

      const payload = {
        price: editPrice,
        description: editDescription,
        availability: editAvailability === "true",
        image: editImage,
        category: editCategory,
        location: editLocation,
        seats: editSeats,
        fuelType: editFuelType,
      };

      const res = await fetch(`${apiUrl}/car/${editingCar._id || editingCar.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${tokenData?.token}`,
        },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        toast.success("Vehicle updated successfully!");
        setEditingCar(null);
        fetchMyCars();
      } else {
        toast.error("Failed to update vehicle.");
      }
    } catch (err) {
      console.error(err);
      toast.error("An error occurred during update.");
    } finally {
      setSaving(false);
    }
  };

  const handleDeleteCar = async () => {
    if (!deletingCarId) return;

    try {
      setDeleting(true);
      const { data: tokenData } = await authClient.token();
      const apiUrl = process.env.NEXT_PUBLIC_SERVER_URL;

      const res = await fetch(`${apiUrl}/car/${deletingCarId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${tokenData?.token}`,
        },
      });

      if (res.ok) {
        toast.success("Vehicle deleted successfully.");
        setDeletingCarId(null);
        fetchMyCars();
      } else {
        toast.error("Failed to delete vehicle.");
      }
    } catch (err) {
      console.error(err);
      toast.error("An error occurred during deletion.");
    } finally {
      setDeleting(false);
    }
  };

  if (checkingAuth || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black">
        <div className="w-12 h-12 border-4 border-white/10 border-t-orange-500 rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white pb-20 pt-32">
      <div className="max-w-[90%] mx-auto px-6">
        {/* page header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center border-l-4 border-orange-500 pl-4 mb-12 gap-4">
          <div>
            <h1 className="text-3xl md:text-5xl font-bold uppercase tracking-wider text-white">
              My Added Cars
            </h1>
            <p className="text-sm text-neutral-400 mt-1">
              Manage your listed vehicles, update specifications, and check availability status.
            </p>
          </div>
          <AnimatedButton
            onClick={() => router.push("/add-car")}
            className="h-auto py-3 px-6 text-sm rounded-none"
          >
            Add New Car
          </AnimatedButton>
        </div>

        {cars.length === 0 ? (
          <div className="bg-[#0c0c0c] border border-neutral-800 p-16 text-center shadow-2xl keep-dark-card">
            <span className="material-symbols-outlined text-6xl text-neutral-600 mb-4 block">
              garage
            </span>
            <h3 className="text-xl font-bold text-white uppercase tracking-wider mb-2">
              No Vehicles Listed Yet
            </h3>
            <p className="text-sm text-neutral-400 max-w-md mx-auto mb-6">
              You haven't listed any cars for rent yet. Put your vehicle up for rent and start earning today!
            </p>
            <AnimatedButton
              onClick={() => router.push("/add-car")}
              className="h-auto py-3 px-8 text-xs rounded-none"
            >
              Add Your First Car
            </AnimatedButton>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {cars.map((car) => (
              <div
                key={car._id || car.id}
                className="flex flex-col bg-[#0c0c0c] border border-neutral-800 p-4 relative group keep-dark-card"
              >
                {/* image */}
                <div className="relative h-48 w-full overflow-hidden mb-4">
                  <Image
                    src={car.image || "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=800&q=80"}
                    alt={car.name || "Car"}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500 grayscale group-hover:grayscale-0"
                  />
                  <div className="absolute top-3 right-3 bg-black/90 px-2 py-1 text-[9px] font-bold text-orange-500 uppercase tracking-widest border border-neutral-800">
                    {car.category || "Sedan"}
                  </div>
                </div>

                {/* details */}
                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="text-lg font-bold text-white uppercase tracking-wider group-hover:text-orange-500 transition-colors">
                        {car.name}
                      </h3>
                      <span className="text-orange-500 font-bold text-lg flex items-center gap-0.5">
                        <FaBangladeshiTakaSign className="text-xs" />
                        {car.price}
                        <span className="text-[9px] text-neutral-500 uppercase tracking-wider block font-normal">
                          /day
                        </span>
                      </span>
                    </div>

                    <p className="text-xs text-neutral-400 line-clamp-2 leading-relaxed mb-4">
                      {car.description || "No description provided."}
                    </p>

                    <div className="space-y-2 border-t border-neutral-900 pt-3 text-xs text-neutral-400 mb-6">
                      <div className="flex justify-between">
                        <span className="font-bold text-neutral-500 uppercase tracking-widest text-[9px]">Location</span>
                        <span className="flex items-center gap-1">
                          <FiMapPin className="text-orange-500 text-sm" />
                          {car.location || "N/A"}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="font-bold text-neutral-500 uppercase tracking-widest text-[9px]">Seats & Fuel</span>
                        <span>{car.seats || 5} Seats / {car.fuelType || "Petrol"}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="font-bold text-neutral-500 uppercase tracking-widest text-[9px]">Status</span>
                        <span className="flex items-center gap-1 font-semibold">
                          {car.availability !== false ? (
                            <>
                              <FiCheckCircle className="text-green-500" />
                              <span className="text-green-500 uppercase text-[9px] tracking-wider">Available</span>
                            </>
                          ) : (
                            <>
                              <FiXCircle className="text-red-500" />
                              <span className="text-red-500 uppercase text-[9px] tracking-wider">Unavailable</span>
                            </>
                          )}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* actions */}
                  <div className="flex gap-2 border-t border-neutral-900 pt-4">
                    <button
                      onClick={() => handleOpenEdit(car)}
                      className="flex-1 flex items-center justify-center gap-2 bg-neutral-900 border border-neutral-800 text-white py-2 text-xs font-bold uppercase tracking-wider hover:bg-neutral-800 hover:border-neutral-700 transition-colors"
                    >
                      <FaPen className="text-xs" /> Edit
                    </button>
                    <button
                      onClick={() => setDeletingCarId(car._id || car.id)}
                      className="flex-grow-0 flex items-center justify-center bg-red-500/10 border border-red-500/20 text-red-500 p-2 hover:bg-red-500 hover:text-white transition-all duration-200"
                    >
                      <FaTrashCan className="text-sm" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* edit vehicle modal */}
      {editingCar && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
          <div className="bg-[#0c0c0c] border border-neutral-800 w-full max-w-2xl overflow-hidden shadow-2xl relative keep-dark-card">
            <div className="h-1 bg-orange-500 w-full" />
            <div className="p-6 md:p-8">
              <h2 className="text-2xl font-bold uppercase tracking-wider text-white mb-6 border-l-4 border-orange-500 pl-3">
                Update Vehicle Details
              </h2>
              <form onSubmit={handleUpdateCar} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] font-bold uppercase tracking-widest text-neutral-500 mb-1">
                      Rate / Day (৳)
                    </label>
                    <input
                      type="number"
                      value={editPrice}
                      onChange={(e) => setEditPrice(e.target.value)}
                      className="w-full bg-white/5 border border-white/10 px-3 py-2 text-sm focus:outline-none focus:border-orange-500 transition-colors text-white"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold uppercase tracking-widest text-neutral-500 mb-1">
                      Location
                    </label>
                    <input
                      type="text"
                      value={editLocation}
                      onChange={(e) => setEditLocation(e.target.value)}
                      className="w-full bg-white/5 border border-white/10 px-3 py-2 text-sm focus:outline-none focus:border-orange-500 transition-colors text-white"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] font-bold uppercase tracking-widest text-neutral-500 mb-1">
                      Category
                    </label>
                    <select
                      value={editCategory}
                      onChange={(e) => setEditCategory(e.target.value)}
                      className="w-full bg-[#0c0c0c] border border-white/10 px-3 py-2 text-sm focus:outline-none focus:border-orange-500 transition-colors text-white"
                    >
                      <option value="Sedan">Sedan</option>
                      <option value="SUV">SUV</option>
                      <option value="Electric">Electric</option>
                      <option value="Luxury">Luxury</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold uppercase tracking-widest text-neutral-500 mb-1">
                      Availability
                    </label>
                    <select
                      value={editAvailability}
                      onChange={(e) => setEditAvailability(e.target.value)}
                      className="w-full bg-[#0c0c0c] border border-white/10 px-3 py-2 text-sm focus:outline-none focus:border-orange-500 transition-colors text-white"
                    >
                      <option value="true">Available</option>
                      <option value="false">Unavailable</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] font-bold uppercase tracking-widest text-neutral-500 mb-1">
                      Seats
                    </label>
                    <input
                      type="number"
                      value={editSeats}
                      onChange={(e) => setEditSeats(e.target.value)}
                      className="w-full bg-white/5 border border-white/10 px-3 py-2 text-sm focus:outline-none focus:border-orange-500 transition-colors text-white"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold uppercase tracking-widest text-neutral-500 mb-1">
                      Fuel Type
                    </label>
                    <input
                      type="text"
                      value={editFuelType}
                      onChange={(e) => setEditFuelType(e.target.value)}
                      className="w-full bg-white/5 border border-white/10 px-3 py-2 text-sm focus:outline-none focus:border-orange-500 transition-colors text-white"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-widest text-neutral-500 mb-1">
                    Image URL
                  </label>
                  <input
                    type="url"
                    value={editImage}
                    onChange={(e) => setEditImage(e.target.value)}
                    className="w-full bg-white/5 border border-white/10 px-3 py-2 text-sm focus:outline-none focus:border-orange-500 transition-colors text-white"
                    required
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-widest text-neutral-500 mb-1">
                    Description
                  </label>
                  <textarea
                    value={editDescription}
                    onChange={(e) => setEditDescription(e.target.value)}
                    rows={4}
                    className="w-full bg-white/5 border border-white/10 px-3 py-2 text-sm focus:outline-none focus:border-orange-500 transition-colors text-white resize-none"
                    required
                  />
                </div>

                <div className="flex justify-end gap-3 pt-4 border-t border-neutral-900">
                  <button
                    type="button"
                    onClick={() => setEditingCar(null)}
                    className="px-5 py-2.5 text-xs font-bold uppercase tracking-widest border border-neutral-800 text-neutral-300 hover:bg-white/5 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={saving}
                    className="px-6 py-2.5 text-xs font-bold uppercase tracking-widest bg-orange-500 text-black hover:opacity-95 disabled:opacity-50 transition-opacity"
                  >
                    {saving ? "Saving..." : "Save Changes"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* delete confirmation modal */}
      {deletingCarId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
          <div className="bg-[#0c0c0c] border border-neutral-800 w-full max-w-md overflow-hidden shadow-2xl relative keep-dark-card">
            <div className="h-1 bg-red-500 w-full" />
            <div className="p-6 md:p-8">
              <h2 className="text-lg font-bold uppercase tracking-wider text-white mb-3">
                Confirm Deletion
              </h2>
              <p className="text-sm text-neutral-400 leading-relaxed mb-6">
                Are you absolutely sure you want to delete this vehicle listing? This action is permanent and cannot be undone.
              </p>
              <div className="flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setDeletingCarId(null)}
                  className="px-5 py-2.5 text-xs font-bold uppercase tracking-widest border border-neutral-800 text-neutral-300 hover:bg-white/5 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleDeleteCar}
                  disabled={deleting}
                  className="px-6 py-2.5 text-xs font-bold uppercase tracking-widest bg-red-600 text-white hover:bg-red-500 disabled:opacity-50 transition-colors"
                >
                  {deleting ? "Deleting..." : "Delete Listing"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
