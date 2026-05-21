import Link from "next/link";
import { HiArrowNarrowLeft, HiCheck } from "react-icons/hi";
import { FaGasPump, FaChair, FaMapMarkerAlt } from "react-icons/fa";
import BookingCard from "@/components/BookingCard";
import CarDetailActions from "@/components/CarDetailActions";
import { headers } from "next/headers";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function CarDetail({ params }) {
  const { id } = await params;

  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) redirect("/signin");

  const currentUser = session?.user;

  const { token } = await auth.api.getToken({
    headers: await headers(),
  });

  const apiUrl = process.env.NEXT_PUBLIC_SERVER_URL;
  const res = await fetch(`${apiUrl}/cars/${id}`, {
    cache: "no-store",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  const car = await res.json();

  if (!res.ok || !car || car.error) {
    throw new Error(car?.error || "Car not found");
  }

  return (
    <div className="min-h-screen bg-black text-white pt-34 pb-20 font-sans">
      <div className="max-w-[90%] mx-auto px-4 lg:px-6">
        <div className="flex flex-col sm:flex-row justify-between items-center mb-8 gap-4">
          <Link
            href="/explore-cars"
            className="flex items-center gap-2 text-neutral-400 hover:text-orange-500 transition-colors font-medium text-sm"
          >
            <HiArrowNarrowLeft className="text-xl" />
            Back to Collection
          </Link>
          {currentUser && <CarDetailActions car={car} />}
        </div>
        <div className="max-w-7xl mx-auto mb-12">
          <div className="relative w-full aspect-[21/9] overflow-hidden border border-neutral-900 shadow-2xl">
            <img
              src={car.image}
              alt={car.name}
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
          <div className="lg:col-span-2">
            <div className="mb-10">
              <div className="flex items-center gap-2 text-orange-500 mb-4 font-normal text-lg">
                <FaMapMarkerAlt className="text-base" />
                {car.location} Terminal
              </div>
              <h1 className="text-5xl lg:text-6xl font-bold text-white mb-6 tracking-tight uppercase">
                {car.name}
              </h1>
              <div className="flex flex-wrap items-center gap-6 text-neutral-400">
                <div className="flex items-center gap-2 font-medium">
                  <FaGasPump className="text-orange-500 text-base" />
                  <span className="text-neutral-200 font-bold">
                    {car.fuelType}
                  </span>
                </div>
                <div className="flex items-center gap-2 font-medium">
                  <FaChair className="text-base text-orange-500" />
                  <span>{car.seats} Seats</span>
                </div>
                <div className="flex items-center gap-2 font-medium">
                  <span className="bg-orange-500 text-black text-[9px] font-black uppercase tracking-widest px-3 py-1">
                    {car.category}
                  </span>
                </div>
              </div>
            </div>

            <div className="mb-12 border-t border-neutral-900 pt-10">
              <h3 className="text-3xl font-bold text-white mb-4 uppercase tracking-wider">
                Overview
              </h3>
              <p className="text-lg text-neutral-400 leading-relaxed max-w-7xl font-normal">
                {car.description ||
                  "Every component of our elite fleet enlists rigorous craftsmanship and high-performance calibrations. Designed to maintain raw power profiles, active chassis feedback systems, and premium levels of interior driver comfort."}
              </p>
            </div>
            <div>
              <h3 className="text-3xl font-bold text-white mb-4 uppercase tracking-wider">
                Highlights
              </h3>
              <p className="text-base text-neutral-400 leading-relaxed max-w-7xl mb-10 font-normal">
                Discover the joy of driving the high-end {car.name} with luxury
                services tailored to command respect on every highway and
                avenue.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-8">
                {[
                  "Meticulous high-end multi-point inspection",
                  "Full comprehensive coverage & elite protection shield",
                  "Bespoke delivery direct to your hangar, port, or lobby",
                  "24/7 VIP concierge road assistance and booking support",
                  "Flawless showroom detailing with signature cabin scents",
                ].map((highlight, idx) => (
                  <div key={idx} className="flex items-start gap-3 group">
                    <div className="mt-1 bg-orange-500/10 p-1 group-hover:bg-orange-500/20 transition-colors">
                      <HiCheck className="text-orange-500 text-lg" />
                    </div>
                    <span className="text-neutral-400 text-base font-normal">
                      {highlight}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <BookingCard car={car} currentUser={currentUser} />
        </div>
      </div>
    </div>
  );
}
