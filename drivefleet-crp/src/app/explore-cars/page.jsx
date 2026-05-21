"use client";

import React, { useEffect, useState } from "react";
import CarCard from "@/components/CarCard";
import { useRouter, useSearchParams } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import { toast } from "react-toastify";
import Loading from "@/app/loading";

export default function ExploreCarsPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  // get initial search params from url
  const initialSearch = searchParams.get("search") || "";
  const initialCategory = searchParams.get("category") || "";

  const { data: session, isPending: checkingAuth } = authClient.useSession();
  const currentUser = session?.user;

  const [search, setSearch] = useState(initialSearch);
  const [category, setCategory] = useState(initialCategory || "All");
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);

  // fetch cars from api
  const fetchCars = async (activeSearch, activeCategory) => {
    try {
      setLoading(true);
      const { data: tokenData } = await authClient.token();
      const token = tokenData?.token || "";
      const apiUrl = process.env.NEXT_PUBLIC_SERVER_URL;

      const queryParams = new URLSearchParams();
      // make search lowercase for matching
      if (activeSearch) {
        queryParams.append("search", activeSearch.toLowerCase());
      }
      if (activeCategory && activeCategory !== "All") {
        queryParams.append("category", activeCategory);
      }

      const res = await fetch(`${apiUrl}/cars?${queryParams.toString()}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        cache: "no-store",
      });

      if (res.ok) {
        const data = await res.json();
        setCars(data);
      } else {
        setCars([]);
      }
    } catch (err) {
      console.error(err);
      toast.error("Failed to load vehicles.");
    } finally {
      setLoading(false);
    }
  };

  // check if user is logged in
  useEffect(() => {
    if (!checkingAuth && !currentUser) {
      router.push("/signin");
    }
  }, [currentUser, checkingAuth, router]);

  // load cars on search or category changes
  useEffect(() => {
    if (!currentUser) return;

    // instant fetch for category changes
    if (search === initialSearch && category !== initialCategory) {
      fetchCars(search, category);
      return;
    }

    // debounced fetch for typing in the search box
    const delayDebounceFn = setTimeout(() => {
      fetchCars(search, category);
    }, 300);

    return () => clearTimeout(delayDebounceFn);
  }, [currentUser, search, category]);

  const handleApplyFilters = (e) => {
    if (e) e.preventDefault();
    // update url parameters without reloading page
    const params = new URLSearchParams();
    if (search) params.append("search", search.toLowerCase());
    if (category && category !== "All") params.append("category", category);
    
    router.push(`/explore-cars?${params.toString()}`, { scroll: false });
  };

  const handleReset = (e) => {
    if (e) e.preventDefault();
    setSearch("");
    setCategory("All");
    router.push("/explore-cars", { scroll: false });
  };

  const categories = ["All", "Sedan", "SUV", "Electric", "Luxury"];

  if (checkingAuth || (!currentUser && !checkingAuth)) {
    return <Loading />;
  }

  return (
    <div className="w-full bg-black min-h-screen text-white pb-20">
      {/* hero banner section */}
      <div className="relative h-96 flex items-center bg-black border-b border-neutral-900">
        <div className="absolute inset-0 overflow-hidden">
          <img
            src="https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1600&q=60"
            alt="Cars"
            className="w-full h-full object-cover opacity-20 filter grayscale"
          />
        </div>
        <div className="relative z-10 max-w-[90%] pt-28 mx-auto text-center px-6 w-full">
          <h1 className="text-4xl md:text-6xl font-bold uppercase tracking-widest text-white">
            Explore Our <span className="text-orange-500">Fleet</span>
          </h1>
          <p className="mt-4 text-xs md:text-sm uppercase tracking-widest text-neutral-400 max-w-xl mx-auto leading-relaxed">
            Discover a comprehensive selection of premium high-performance vehicles curated for the ultimate driving experience.
          </p>
        </div>
      </div>

      {/* main content area */}
      <div className="min-h-screen px-6 py-14 max-w-[90%] mx-auto">
        {/* search and filter panel */}
        <div className="bg-[#0c0c0c] border border-neutral-800 p-6 mb-12 rounded-none shadow-2xl">
          <form onSubmit={handleApplyFilters} className="flex flex-col lg:flex-row gap-6 items-end">
            {/* search input box */}
            <div className="flex-1 w-full">
              <label htmlFor="search" className="block text-[10px] font-bold uppercase tracking-widest text-neutral-500 mb-2">
                Search By Name
              </label>
              <input
                id="search"
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search your car for rent..."
                className="w-full bg-neutral-900 border border-neutral-800 px-4 py-3 text-sm focus:outline-none focus:border-orange-500 transition-colors text-white placeholder-neutral-600 rounded-none"
              />
            </div>

            {/* category dropdown */}
            <div className="w-full lg:w-72">
              <label htmlFor="category" className="block text-[10px] font-bold uppercase tracking-widest text-neutral-500 mb-2">
                Car Category / Type
              </label>
              <div className="relative">
                <select
                  id="category"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full bg-[#0c0c0c] border border-neutral-800 pl-4 pr-10 py-3 text-sm focus:outline-none focus:border-orange-500 transition-colors text-white rounded-none appearance-none cursor-pointer"
                >
                  {categories.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
                <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-neutral-400 flex items-center justify-center">
                  <svg
                    stroke="currentColor"
                    fill="none"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-4 w-4"
                    height="1em"
                    width="1em"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <polyline points="6 9 12 15 18 9"></polyline>
                  </svg>
                </div>
              </div>
            </div>

            {/* filter buttons */}
            <div className="flex gap-3 w-full lg:w-auto">
              <button
                type="submit"
                className="flex-1 lg:flex-none px-8 py-3.5 bg-orange-500 text-black text-xs font-bold uppercase tracking-widest hover:opacity-95 transition-opacity rounded-none"
              >
                Apply Filters
              </button>
              <button
                type="button"
                onClick={handleReset}
                className="flex-1 lg:flex-none px-6 py-3.5 border border-neutral-800 hover:bg-neutral-950 text-neutral-300 text-xs font-bold uppercase tracking-widest text-center transition-colors rounded-none"
              >
                Reset
              </button>
            </div>

          </form>
        </div>

        {/* loading spinner for filtering */}
        {loading ? (
          <Loading />
        ) : cars.length === 0 ? (
          <div className="bg-[#0c0c0c] border border-neutral-800 p-20 text-center shadow-xl">
            <span className="material-symbols-outlined text-6xl text-neutral-600 mb-4 block">
              search_off
            </span>
            <h3 className="text-xl font-bold uppercase tracking-wider text-white mb-2">
              No Vehicles Found
            </h3>
            <p className="text-sm text-neutral-400 max-w-md mx-auto">
              We couldn't find any vehicles matching your search criteria. Try modifying your search phrase or choosing a different category.
            </p>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="flex justify-between items-center pb-4 border-b border-neutral-900 mb-2">
              <p className="text-xs uppercase tracking-widest text-neutral-400 font-bold">
                Available Cars: <span className="text-orange-500 font-black">{cars.length}</span>
              </p>
            </div>
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {cars.map((car) => (
                <CarCard key={car._id || car.id} car={car} />
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
