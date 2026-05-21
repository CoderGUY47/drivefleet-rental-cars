import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import Link from "next/link";
import Image from "next/image";
import MyBookingCard from "@/components/MyBookingCard";

export default async function MyBookingsPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  const { token } = await auth.api.getToken({
    headers: await headers(),
  });

  const user = session?.user;

  if (!user) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center px-6">
          <span className="text-xs font-bold uppercase tracking-widest text-orange-500 block mb-3">
            Sign In First
          </span>
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-4 uppercase tracking-wider">
            Sign In to See Your Bookings
          </h1>
          <p className="text-sm text-neutral-400 mb-8">
            Please sign in to see and manage your bookings.
          </p>
          <Link
            href="/signin"
            className="inline-block px-8 py-3 text-xs font-bold uppercase tracking-widest text-black bg-orange-500 hover:opacity-95 transition-opacity"
          >
            Sign In
          </Link>
        </div>
      </div>
    );
  }

  const apiUrl = process.env.NEXT_PUBLIC_SERVER_URL;
  let bookings = [];

  try {
    const res = await fetch(`${apiUrl}/booking/${user.id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      cache: "no-store",
    });

    if (res.ok) {
      const data = await res.json();
      bookings = data.map((b) => ({ ...b, id: b._id }));
    }
  } catch (err) {
    console.error("Failed to fetch bookings:", err);
  }

  const totalCost = bookings.reduce(
    (sum, b) => sum + Number(b.totalCost || 0),
    0,
  );
  const totalDays = bookings.reduce(
    (sum, b) => sum + Number(b.totalDays || 0),
    0,
  );

  return (
    <div className="min-h-screen bg-black pb-20 light-white-bg">
      {/* premium background hero banner layout */}
      <div className="relative h-80 bg-black flex items-center justify-center overflow-hidden keep-dark">
        <Image
          src="/assets/vecteezy_two-classic-cars-on-black-background_31192356.jpg"
          alt="My Bookings hero"
          fill
          className="object-cover object-center opacity-65"
          priority
        />
        <div className="absolute inset-0 bg-linear-to-t from-black via-transparent to-black/80" />

        <div className="relative z-10 text-center px-4 pt-10">
          <h1 className="text-3xl md:text-5xl font-bold text-white uppercase border-l-4 border-orange-500 tracking-wider drop-shadow-md">
            My Bookings
          </h1>
        </div>
      </div>

      <div className="max-w-[90%] mx-auto px-6 py-12 relative -mt-10 z-20">
        {bookings.length > 0 ? (
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 items-start">
            {/* active user reservations display list */}
            <div className="lg:col-span-3 space-y-5">
              {bookings.map((booking) => (
                <MyBookingCard key={booking.id} booking={booking} />
              ))}
            </div>

            {/* overall bookings numerical summary panel */}
            <div className="bg-[#0c0c0c] border border-neutral-800 shadow-2xl relative rounded-none keep-dark-card">
              <div className="h-1 w-full bg-orange-500" />
              <div className="p-6 space-y-6">
                <h3 className="text-base font-bold text-white uppercase tracking-wide pb-3 border-b border-neutral-800">
                  Booking Summary
                </h3>

                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-neutral-400 font-medium">
                      Cars Booked
                    </span>
                    <span className="font-bold text-white">
                      {bookings.length}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-neutral-400 font-medium">
                      Total Days
                    </span>
                    <span className="font-bold text-white">
                      {totalDays} days
                    </span>
                  </div>
                  <div className="flex justify-between text-sm pt-3 border-t border-neutral-800">
                    <span className="font-bold text-neutral-300 uppercase tracking-wide">
                      Total Cost
                    </span>
                    <span className="text-lg font-bold text-orange-500">
                      ৳{totalCost}
                    </span>
                  </div>
                </div>

                <Link
                  href="/explore-cars"
                  className="w-full text-center block py-3 text-sm font-bold uppercase tracking-widest text-black bg-orange-500 transition-opacity hover:opacity-95"
                >
                  Book Another Car
                </Link>
              </div>
            </div>
          </div>
        ) : (
          <div className="space-y-16">
            {/* empty state empty booking state section */}
            <div className="w-[80%] mx-auto bg-[#0c0c0c] shadow-2xl relative overflow-hidden rounded-none border border-neutral-800 keep-dark-card">
              <div className="h-1 w-full bg-orange-500" />
              <div className="grid grid-cols-1 md:grid-cols-2">
                <div className="relative h-48 md:h-auto min-h-[240px] bg-black">
                  <Image
                    src="/assets/vecteezy_night-car-racing-illustration_24399512.jpg"
                    alt="No reservations"
                    fill
                    className="object-cover object-center opacity-75"
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent to-[#0c0c0c]" />
                </div>
                <div className="p-8 md:p-10 flex flex-col justify-center items-start text-left space-y-4">
                  <span className="text-xs font-bold uppercase tracking-widest text-orange-500">
                    Want to Book a Car?
                  </span>
                  <h3 className="text-2xl font-bold text-white">
                    No Bookings Yet
                  </h3>
                  <p className="text-sm text-neutral-400 leading-relaxed">
                    You haven't booked any cars yet. Browse our cars and find
                    one you like.
                  </p>
                  <Link
                    href="/explore-cars"
                    className="inline-block px-6 py-3 text-xs font-bold uppercase tracking-widest text-black bg-orange-500 hover:opacity-95 transition-opacity"
                  >
                    Browse Cars
                  </Link>
                </div>
              </div>
            </div>

            {/* recommended car collections section */}
            <div className="w-[80%] mx-auto space-y-6">
              <div className="flex items-center justify-between border-b border-neutral-800 pb-3">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-widest text-orange-500">
                    Popular Picks
                  </span>
                  <h3 className="text-xl font-bold text-white uppercase tracking-wider mt-1">
                    Cars You Might Like
                  </h3>
                </div>
                <Link
                  href="/explore-cars"
                  className="text-xs text-orange-500 font-bold uppercase tracking-widest hover:text-orange-400 transition-colors flex items-center gap-1"
                >
                  View All{" "}
                  <span className="material-symbols-outlined text-xs">
                    arrow_forward
                  </span>
                </Link>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* first recommended car catalog selection */}
                <div className="bg-[#0c0c0c] border border-neutral-800 overflow-hidden rounded-none group hover:border-neutral-700 transition-all duration-300 keep-dark-card">
                  <div className="h-40 bg-neutral-950 overflow-hidden relative">
                    <Image
                      src="/assets/vecteezy_sport-car-model-photo_26175422.jpg"
                      alt="Porsche 911"
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500 opacity-90"
                    />
                    <div className="absolute top-3 right-3 bg-orange-500 text-black text-[9px] font-bold uppercase tracking-widest px-2 py-0.5">
                      Luxury
                    </div>
                  </div>
                  <div className="p-4 space-y-3">
                    <h4 className="font-bold text-white tracking-wide">
                      Porsche 911 GT3
                    </h4>
                    <div className="flex items-center justify-between text-xs text-neutral-400">
                      <span>4 Seats • Hybrid</span>
                      <span className="text-orange-500 font-bold">
                        ৳380 / day
                      </span>
                    </div>
                  </div>
                </div>

                {/* second recommended car catalog selection */}
                <div className="bg-[#0c0c0c] border border-neutral-800 overflow-hidden rounded-none group hover:border-neutral-700 transition-all duration-300 keep-dark-card">
                  <div className="h-40 bg-neutral-950 overflow-hidden relative">
                    <Image
                      src="/assets/steven-binotto-o6yH_yAc2Ws-unsplash.jpg"
                      alt="Tesla Model S"
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500 opacity-90"
                    />
                    <div className="absolute top-3 right-3 bg-orange-500 text-black text-[9px] font-bold uppercase tracking-widest px-2 py-0.5">
                      Electric
                    </div>
                  </div>
                  <div className="p-4 space-y-3">
                    <h4 className="font-bold text-white tracking-wide">
                      Tesla Model S Plaid
                    </h4>
                    <div className="flex items-center justify-between text-xs text-neutral-400">
                      <span>5 Seats • Electric</span>
                      <span className="text-orange-500 font-bold">
                        ৳240 / day
                      </span>
                    </div>
                  </div>
                </div>

                {/* third recommended car catalog selection */}
                <div className="bg-[#0c0c0c] border border-neutral-800 overflow-hidden rounded-none group hover:border-neutral-700 transition-all duration-300 keep-dark-card">
                  <div className="h-40 bg-neutral-950 overflow-hidden relative">
                    <Image
                      src="/assets/vecteezy_night-car-racing-illustration_24399512.jpg"
                      alt="Aston Martin DBS"
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500 opacity-90"
                    />
                    <div className="absolute top-3 right-3 bg-orange-500 text-black text-[9px] font-bold uppercase tracking-widest px-2 py-0.5">
                      Supercar
                    </div>
                  </div>
                  <div className="p-4 space-y-3">
                    <h4 className="font-bold text-white tracking-wide">
                      Aston Martin Superleggera
                    </h4>
                    <div className="flex items-center justify-between text-xs text-neutral-400">
                      <span>4 Seats • Petrol</span>
                      <span className="text-orange-500 font-bold">
                        ৳420 / day
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
