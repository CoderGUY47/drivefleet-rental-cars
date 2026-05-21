import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import Link from "next/link";
import {
  HiShieldCheck,
  HiBadgeCheck,
  HiMail,
  HiIdentification,
} from "react-icons/hi";
import SignOutButton from "@/components/SignOutButton";
import { EditProfile } from "@/components/EditProfile";

export const dynamic = "force-dynamic"; /* dynamic data fetching */

export default async function ProfilePage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  const user = session?.user;

  /* show access-restricted screen if unauthenticated */
  if (!user) {
    return (
      <div className="min-h-screen bg-black flex flex-col items-center justify-center px-6 py-20 text-center relative overflow-hidden">
        <div className="absolute inset-0 -z-10 overflow-hidden">
          <img 
            src="/assets/vecteezy_two-classic-cars-on-black-background_31192356.jpg" 
            alt="Classic Cars Background" 
            className="w-full h-full object-cover object-center opacity-40"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/90 to-black/80 -z-10" />
        <div className="max-w-md w-full bg-[#0c0c0c]/90 border border-neutral-800 shadow-[0_8px_40px_rgba(0,0,0,0.5)] p-10 backdrop-blur-md">
          <div className="w-16 h-16 bg-orange-500/10 border border-orange-500/20 flex items-center justify-center mx-auto mb-6 text-orange-500 text-3xl">
            <HiShieldCheck />
          </div>
          <h1 className="text-3xl font-black text-white uppercase tracking-wider mb-3">
            Access Restricted
          </h1>
          <p className="text-neutral-400 text-base mb-8">
            Please sign in to view and manage your profile details.
          </p>
          <Link
            href="/signin"
            className="block w-full bg-orange-500 hover:bg-orange-600 text-white text-sm font-bold uppercase tracking-widest py-3.5 transition-colors text-center"
          >
            Sign In
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-50 pb-20 px-6 relative text-white">
      {/* background car image */}
      <div className="fixed inset-0 -z-10 overflow-hidden">
        <img 
          src="/assets/vecteezy_two-classic-cars-on-black-background_31192356.jpg" 
          alt="Premium Classic Cars Background" 
          className="w-full h-full object-cover object-center animate-fade-in"
        />
      </div>
      {/* dark overlay for rich legibility */}
      <div className="fixed inset-0 bg-black/70 -z-10" />

      <div className="max-w-6xl mx-auto space-y-10">
        <div>
          <h1 className="text-4xl md:text-5xl font-black text-white tracking-tight uppercase tracking-wider">
            Profile
          </h1>
          <p className="text-neutral-300 mt-2 text-base">
            View and manage your personal account information.
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start text-white">
          {/* left section details */}
          <div className="lg:col-span-2 bg-[#0c0c0c]/85 border border-neutral-800 shadow-[0_8px_40px_rgba(0,0,0,0.5)] backdrop-blur-md">
            <div className="h-1 w-full bg-orange-500" />
            <div className="p-8 sm:p-12 flex flex-col md:flex-row items-center gap-8 md:gap-12">
              {/* avatar & interactive actions */}
              <div className="flex flex-col items-center gap-3 flex-shrink-0">
                <div className="relative">
                  {user.image ? (
                    <img
                      src={user.image}
                      alt={user.name}
                      className="w-32 h-32 rounded-full object-cover border-4 border-orange-500"
                    />
                  ) : (
                    <div className="w-32 h-32 rounded-full bg-orange-500 flex items-center justify-center text-white text-4xl font-black">
                      {user.name?.charAt(0)?.toUpperCase() || "U"}
                    </div>
                  )}
                  <span className="absolute -bottom-2 -right-2 text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 border-2 border-[#0c0c0c] bg-orange-500 text-white">
                    {user.role || "Member"}
                  </span>
                  <EditProfile user={user} />
                </div>
              </div>

              {/* user details */}
              <div className="flex-1 space-y-5 text-center md:text-left">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-[0.15em] text-neutral-400 block mb-1">
                    Full Name
                  </span>
                  <div className="flex items-center justify-center md:justify-start gap-2 mt-1">
                    <h2 className="text-3xl font-black text-white tracking-tight">
                      {user.name}
                    </h2>
                    <HiBadgeCheck className="text-orange-500 text-2xl flex-shrink-0" />
                  </div>
                </div>
                <div>
                  <span className="text-sm font-semibold uppercase tracking-wide text-neutral-400 block mb-1">
                    Email Address
                  </span>
                  <p className="text-neutral-200 font-medium flex items-center justify-center md:justify-start gap-2 mt-1">
                    <HiMail className="text-neutral-400 text-lg flex-shrink-0" />
                    {user.email}
                  </p>
                </div>
              </div>
            </div>

            <div className="border-t border-neutral-800/80 px-8 sm:px-12 py-6 flex flex-wrap gap-3 justify-center md:justify-end bg-black/40">
              <Link
                href="/my-bookings"
                className="px-6 py-3 text-sm font-bold uppercase tracking-widest border border-neutral-700 text-white hover:bg-neutral-800 transition-colors"
              >
                View Bookings
              </Link>
              <Link
                href="/"
                className="px-6 py-3 text-sm font-bold uppercase tracking-widest bg-orange-500 hover:bg-orange-600 text-white transition-colors"
              >
                Go to Home
              </Link>
            </div>
          </div>

          <div className="lg:col-span-1 bg-[#0c0c0c]/85 border border-neutral-800 shadow-[0_8px_40px_rgba(0,0,0,0.5)] backdrop-blur-md">
            <div className="h-1 w-full bg-neutral-700" />
            <div className="p-6">
              <h2 className="text-base font-bold uppercase tracking-widest text-white mb-4">
                Quick Links
              </h2>
              <div className="flex flex-col gap-4">
                <Link
                  href="/explore-cars"
                  className="flex items-center gap-3 p-4 border border-neutral-800 bg-neutral-900/40 hover:border-orange-500/50 hover:bg-orange-500/5 transition-all duration-300 group"
                >
                  <span className="material-symbols-outlined text-2xl text-neutral-400 group-hover:text-orange-500">
                    directions_car
                  </span>
                  <div>
                    <p className="text-sm font-bold text-white uppercase tracking-wide">
                      Browse Cars
                    </p>
                    <p className="text-xs text-neutral-400">
                      Explore available cars
                    </p>
                  </div>
                </Link>
                <Link
                  href="/my-bookings"
                  className="flex items-center gap-3 p-4 border border-neutral-800 bg-neutral-900/40 hover:border-orange-500/50 hover:bg-orange-500/5 transition-all duration-300 group"
                >
                  <span className="material-symbols-outlined text-2xl text-neutral-400 group-hover:text-orange-500">
                    calendar_today
                  </span>
                  <div>
                    <p className="text-sm font-bold text-white uppercase tracking-wide">
                      My Bookings
                    </p>
                    <p className="text-xs text-neutral-400">View reservations</p>
                  </div>
                </Link>
                <Link
                  href="/#contact"
                  className="flex items-center gap-3 p-4 border border-neutral-800 bg-neutral-900/40 hover:border-orange-500/50 hover:bg-orange-500/5 transition-all duration-300 group"
                >
                  <span className="material-symbols-outlined text-2xl text-neutral-400 group-hover:text-orange-500">
                    support_agent
                  </span>
                  <div>
                    <p className="text-sm font-bold text-white uppercase tracking-wide">Support</p>
                    <p className="text-xs text-neutral-400">Contact our team</p>
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
