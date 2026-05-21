// Multi-category filtering logic for active vehicles
"use client";

import Link from "next/link";

export default function FleetCategories() {
  const categories = [
    {
      name: "Sedan",
      image: "/assets/screen-19.png",
      desc: "Classic comfort & style",
      brands: "BMW, Mercedes, Audi",
    },
    {
      name: "SUV",
      image: "/assets/screen-5.png",
      desc: "Space & power combined",
      brands: "Range Rover, Porsche, Lexus",
    },
    {
      name: "Luxury",
      image: "/assets/screen-4.png",
      desc: "Premium experience",
      brands: "Rolls Royce, Bentley, Aston Martin",
    },
    {
      name: "Electric",
      image: "/assets/screen-18.png",
      desc: "Eco-friendly & fast",
      brands: "Tesla, Porsche Taycan, Lucid",
    },
  ];

  return (
    <section className="py-24 bg-black relative border-t border-neutral-900">
      <div className="max-w-[90%] mx-auto px-6">
        {/* section header and categories text info */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <div className="text-left">
            <span className="text-[10px] font-bold tracking-widest uppercase block mb-3 text-orange-500">
              OUR VEHICLES BRANDS & TYPE
            </span>
            <h2 className="text-3xl md:text-5xl font-bold text-white uppercase tracking-wider">
              Find Your Best Vehicles
            </h2>
            <div className="w-16 h-1 bg-orange-500 mt-6" />
          </div>
        </div>

        {/* category cards selection layout list */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((cat) => (
            <Link
              key={cat.name}
              href={`/explore-cars?category=${cat.name}`}
              className="group relative h-[150px] overflow-hidden rounded-none border border-neutral-800 block bg-[#0c0c0c]"
            >
              {/* background image decoration */}
              <div className="absolute inset-0 w-full h-full">
                <img
                  src={cat.image}
                  alt={cat.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 grayscale group-hover:grayscale-0"
                />
              </div>

              {/* gradient overlay overlays shading */}
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent opacity-90 group-hover:opacity-70 transition-opacity duration-500" />
              <div className="absolute inset-0 bg-orange-500/0 group-hover:bg-orange-500/10 transition-colors duration-500 mix-blend-overlay" />

              {/* hover descriptive cards contents */}
              <div className="absolute inset-0 p-8 flex flex-col justify-end">
                <div className="translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                  <h3 className="text-2xl font-bold text-white uppercase tracking-widest mb-1 shadow-black drop-shadow-md">
                    {cat.name}
                  </h3>
                  <p className="text-orange-500 text-[10px] font-bold uppercase tracking-widest mb-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                    {cat.brands}
                  </p>
                  <p className="text-neutral-300 text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-150 shadow-black drop-shadow-md">
                    {cat.desc}
                  </p>
                </div>

                {/* animated accent lines decoration */}
                <div className="absolute bottom-0 left-0 w-full h-1 bg-orange-500 scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
