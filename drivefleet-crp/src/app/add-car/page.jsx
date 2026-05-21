"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { TextField, Label, Input, Form } from "@heroui/react";
import { authClient } from "@/lib/auth-client";
import { toast } from "react-toastify";
import Loading from "@/app/loading";

export default function AddCar() {
  const router = useRouter();
  const { data: session, isPending: checkingAuth } = authClient.useSession();
  const currentUser = session?.user;

  const [name, setName] = useState("");
  const [category, setCategory] = useState("Luxury");
  const [price, setPrice] = useState("");
  const [seats, setSeats] = useState("5");
  const [fuelType, setFuelType] = useState("Petrol");
  const [location, setLocation] = useState("");
  const [image, setImage] = useState("");
  const [description, setDescription] = useState("");
  const [availability, setAvailability] = useState("Available");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const carData = Object.fromEntries(formData.entries());
    carData.ownerEmail = currentUser?.email || "";
    carData.bookingCount = 0;
    console.log(carData);

    setIsSubmitting(true);
    try {
      const { data: tokenData } = await authClient.token();
      const apiUrl = process.env.NEXT_PUBLIC_SERVER_URL;

      const res = await fetch(`${apiUrl}/car`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${tokenData?.token}`,
        },
        body: JSON.stringify(carData),
      });

      const data = await res.json();
      console.log(data);

      if (res.ok) {
        toast.success("Vehicle added successfully!");
        router.push("/explore-cars");
      } else {
        toast.error(data.message || "Failed to add vehicle");
      }
    } catch (err) {
      console.error(err);
      toast.error("An error occurred while adding the vehicle.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const inputCls =
    "w-full border border-white/10 bg-white/5 px-4 py-3 text-sm text-white focus:outline-none focus:border-orange-500 transition-colors rounded-none placeholder-gray-500";
  const labelCls =
    "block text-xs font-bold uppercase tracking-wider text-gray-400 mb-1.5";

  if (checkingAuth) {
    return <Loading />;
  }

  if (!currentUser) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black p-6 keep-dark light-white-bg">
        <div className="max-w-md w-full bg-[#0c0c0c] shadow-2xl text-center p-10 relative border border-neutral-800 rounded-none">
          <div className="absolute top-0 left-0 w-full h-1 bg-orange-500" />
          <span className="material-symbols-outlined text-6xl text-orange-500/80 mb-4 block">
            lock
          </span>
          <h2 className="text-2xl font-bold text-white mb-2">
            Sign In First
          </h2>
          <p className="text-sm text-neutral-400 mb-6">
            You need to sign in before you can add a car.
          </p>
          <Link
            href="/signin"
            className="inline-block px-8 py-3 font-bold text-sm uppercase tracking-widest text-black bg-orange-500 transition-opacity hover:opacity-95 rounded-none"
          >
            Sign In
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black pb-20 keep-dark light-white-bg">
      {/* premium hero banner with background car image */}
      <div className="relative h-80 bg-black flex items-center justify-center overflow-hidden">
        <Image
          src="/assets/steven-binotto-o6yH_yAc2Ws-unsplash.jpg"
          alt="Add a car"
          fill
          className="object-cover object-center opacity-50"
          priority
        />
        <div className="absolute inset-0 bg-linear-to-t from-black via-transparent to-black/70" />
        <div className="relative z-10 text-center px-4 pt-10">
          <h1 className="text-3xl md:text-5xl font-bold text-white border-l-4 border-orange-500 pl-4 uppercase tracking-wider drop-shadow-md">
            Add New Vehicle
          </h1>
        </div>
      </div>

      <div className="max-w-[90%] mx-auto px-6 relative -mt-16 z-20 pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* left sidebar containing guide tips and advice */}
          <div className="lg:col-span-4 space-y-6 lg:sticky lg:top-24">
            <div className="bg-black border border-neutral-800 rounded-none overflow-hidden shadow-2xl">
              <div className="h-48 relative bg-neutral-900">
                <Image
                  src="/assets/vecteezy_sport-car-model-photo_26175422.jpg"
                  alt="Tips card"
                  fill
                  className="object-cover opacity-80"
                />
                <div className="absolute inset-0 bg-linear-to-t from-black via-transparent to-transparent" />
              </div>
              <div className="p-6 space-y-4">
                <span className="text-[10px] font-bold uppercase tracking-widest text-orange-500">
                  DriveFleet
                </span>
                <h3 className="text-lg font-bold text-white uppercase tracking-wider">
                  Tips for Adding a Car
                </h3>
                <p className="text-xs text-neutral-400 leading-relaxed">
                  Make sure the details you enter are correct. A good photo and
                  the right price help people book your car faster.
                </p>
                <div className="space-y-3 pt-4 border-t border-neutral-900 text-xs text-neutral-400">
                  <div className="flex items-center gap-3">
                    <span className="material-symbols-outlined text-orange-500 text-sm">
                      photo_camera
                    </span>
                    <span>Use a clear, good-quality image link</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="material-symbols-outlined text-orange-500 text-sm">
                      payments
                    </span>
                    <span>Set a fair price per day</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="material-symbols-outlined text-orange-500 text-sm">
                      assignment_turned_in
                    </span>
                    <span>Pick the right car type</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* right side form container card to add a new car */}
          <div className="lg:col-span-8 bg-[#0c0c0c] shadow-2xl relative rounded-none border border-neutral-800">
            <div className="h-1 w-full bg-orange-500" />
            <div className="p-8 md:p-10">
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* car name input field */}
                <TextField name="name" isRequired className="w-full">
                  <Label className="block text-xs font-bold uppercase tracking-wider text-gray-400 mb-1.5">
                    Car Name
                  </Label>
                  <Input
                    name="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter car name (Toyota Vios/Audi A4/etc..)"
                    suppressHydrationWarning
                    className="w-full border border-white/10 bg-white/5 px-4 py-3 text-sm text-white focus:outline-none focus:border-orange-500 transition-colors rounded-none placeholder-gray-500"
                  />
                </TextField>

                {/* vehicle class category selection option */}
                <div>
                  <label className={labelCls}>Car Type</label>
                  <select
                    name="category"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className={inputCls}
                  >
                    <option
                      value="Electric"
                      className="bg-[#0c0c0c] text-white"
                    >
                      Electric
                    </option>
                    <option value="SUV" className="bg-[#0c0c0c] text-white">
                      SUV
                    </option>
                    <option value="Luxury" className="bg-[#0c0c0c] text-white">
                      Luxury
                    </option>
                    <option value="Sedan" className="bg-[#0c0c0c] text-white">
                      Sedan
                    </option>
                  </select>
                </div>

                {/* seat count and fuel class input fields */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <TextField name="seats" isRequired className="w-full">
                      <Label className="block text-xs font-bold uppercase tracking-wider text-gray-400 mb-1.5">
                        Number of Seats
                      </Label>
                      <Input
                        name="seats"
                        type="number"
                        value={seats}
                        onChange={(e) => setSeats(e.target.value)}
                        placeholder="5"
                        suppressHydrationWarning
                        className="w-full border border-white/10 bg-white/5 px-4 py-3 text-sm text-white focus:outline-none focus:border-orange-500 transition-colors rounded-none placeholder-gray-500"
                      />
                    </TextField>
                  </div>
                  <div>
                    <TextField name="fuelType" isRequired className="w-full">
                      <Label className="block text-xs font-bold uppercase tracking-wider text-gray-400 mb-1.5">
                        Fuel Type
                      </Label>
                      <Input
                        name="fuelType"
                        value={fuelType}
                        onChange={(e) => setFuelType(e.target.value)}
                        placeholder="Petrol / Electric"
                        suppressHydrationWarning
                        className="w-full border border-white/10 bg-white/5 px-4 py-3 text-sm text-white focus:outline-none focus:border-orange-500 transition-colors rounded-none placeholder-gray-500"
                      />
                    </TextField>
                  </div>
                </div>

                {/* pricing rate and location input fields */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <TextField name="price" isRequired className="w-full">
                      <Label className="block text-xs font-bold uppercase tracking-wider text-gray-400 mb-1.5">
                        Rate / Day (৳)
                      </Label>
                      <Input
                        name="price"
                        type="number"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        placeholder="250"
                        suppressHydrationWarning
                        className="w-full border border-white/10 bg-white/5 px-4 py-3 text-sm text-white focus:outline-none focus:border-orange-500 transition-colors rounded-none placeholder-gray-500"
                      />
                    </TextField>
                  </div>
                  <div>
                    <TextField name="location" isRequired className="w-full">
                      <Label className="block text-xs font-bold uppercase tracking-wider text-gray-400 mb-1.5">
                        Location
                      </Label>
                      <Input
                        name="location"
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                        placeholder="Put your location (Gulshan, Dhanmondi, etc...)"
                        suppressHydrationWarning
                        className="w-full border border-white/10 bg-white/5 px-4 py-3 text-sm text-white focus:outline-none focus:border-orange-500 transition-colors rounded-none placeholder-gray-500"
                      />
                    </TextField>
                  </div>
                </div>

                {/* digital image url input field */}
                <TextField name="image" className="w-full">
                  <Label className="block text-xs font-bold uppercase tracking-wider text-gray-400 mb-1.5">
                    Car Image URL (optional)
                  </Label>
                  <Input
                    name="image"
                    type="url"
                    value={image}
                    onChange={(e) => setImage(e.target.value)}
                    placeholder="Paste your image URL here"
                    suppressHydrationWarning
                    className="w-full border border-white/10 bg-white/5 px-4 py-3 text-sm text-white focus:outline-none focus:border-orange-500 transition-colors rounded-none placeholder-gray-500"
                  />
                </TextField>

                {/* descriptive outline of the vehicle specs */}
                <div>
                  <label className={labelCls}>Description</label>
                  <textarea
                    name="description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Type your car description here in short (max 200 words)"
                    rows={4}
                    className={`${inputCls} resize-none`}
                  />
                </div>

                {/* availability status dropdown picker */}
                <div>
                  <label className={labelCls}>Availability Status</label>
                  <select
                    name="status"
                    value={availability}
                    onChange={(e) => setAvailability(e.target.value)}
                    className={inputCls}
                  >
                    <option value="Available" className="bg-[#0c0c0c] text-white">
                      Available
                    </option>
                    <option value="Not Available" className="bg-[#0c0c0c] text-white">
                      Not Available
                    </option>
                  </select>
                </div>

                {/* submission and cancel action buttons */}
                <div className="flex justify-end gap-3 pt-4 border-t border-neutral-800">
                  <Link
                    href="/explore-cars"
                    className="px-6 py-3 text-sm font-bold uppercase tracking-widest border border-neutral-800 text-gray-300 hover:border-neutral-700 hover:bg-white/5 transition-colors"
                  >
                    Cancel
                  </Link>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="px-8 py-3 text-sm uppercase tracking-widest text-[#0c0c0c] bg-orange-500 transition-opacity hover:opacity-95 disabled:opacity-50 flex items-center gap-2 font-bold"
                  >
                    {isSubmitting ? (
                      <>
                        <span className="material-symbols-outlined text-base animate-spin">
                          sync
                        </span>
                        Adding...
                      </>
                    ) : (
                      "Add Car"
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
