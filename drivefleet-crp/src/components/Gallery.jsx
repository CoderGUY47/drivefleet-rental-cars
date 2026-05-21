"use client";

import { useState } from "react";
import Image from "next/image";

const galleryItems = [
  {
    id: 1,
    src: "/assets/futuristic-supercar.png",
    title: "Concept Crimson",
    tag: "Hypercar",
    desc: "Futuristic red neon LED headlamp signature",
    className: "col-span-3 row-span-4 col-start-1 row-start-1",
  },
  {
    id: 2,
    src: "/assets/supercar-horizontal-sunset.png",
    title: "Sunset Ridge",
    tag: "Hybrid GT",
    desc: "Metallic golden-orange custom finish",
    className: "col-span-4 row-span-4 col-start-4 row-start-1",
  },
  {
    id: 7, // matches original div7
    src: "/assets/supercar-vertical-blossom.png",
    title: "Emerald Blossom",
    tag: "Electric GT",
    desc: "Deep green metallic parked under sakura petals",
    className: "col-span-3 row-span-3 col-start-5 row-start-5",
  },
  {
    id: 8, // matches original div8
    src: "/assets/supercar-vertical-rain.png",
    title: "Obsidian Rain",
    tag: "Carbon Racer",
    desc: "Low-angle halo ring lights in heavy rain",
    className: "col-span-4 row-span-3 col-start-1 row-start-5",
  },
  {
    id: 9, // matches original div9 
    src: "/assets/toyota-panoramic-cyberpunk.png",
    title: "Toyota Horizon GR",
    tag: "Concept EV",
    desc: "Sleek white GR concept speeding down a glowing neon highway",
    className: "col-span-7 row-span-3 col-start-1 row-start-[8]",
  },
];

export default function Gallery() {
  const [activeImage, setActiveImage] = useState(null);

  return (
    <section className="py-24 bg-black border-t border-neutral-900 relative overflow-hidden">
      {/* background gradient glow effect */}
      <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-orange-500/5 blur-[150px] pointer-events-none" />

      <div className="w-full md:max-w-[90%] mx-auto px-3 sm:px-6 relative z-10">
        {/* section header with category text info */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <div className="text-left">
            <span className="text-[10px] font-bold tracking-widest uppercase block mb-3 text-orange-500">
              Visual Showcase
            </span>
            <h2 className="text-3xl md:text-5xl font-bold text-white uppercase tracking-wider">
              Hypercar Gallery
            </h2>
            <div className="w-16 h-1 bg-orange-500 mt-6" />
          </div>
          <p className="text-white/70 max-w-xl text-sm leading-relaxed text-left md:text-right">
            Explore our curated selection of next-generation high-performance hypercars. Click on any frame to view the visual details in high definition.
          </p>
        </div>

        {/* gallery grid container with given custom layout */}
        <div className="grid grid-cols-7 grid-rows-[repeat(10,1fr)] gap-2 sm:gap-4 h-[550px] sm:h-[750px] md:h-[950px] lg:h-[1150px] w-full">
          {galleryItems.map((item) => (
            <div
              key={item.id}
              className={`${item.className} relative group overflow-hidden border border-neutral-800 cursor-pointer transition-all duration-500 hover:border-orange-500/60`}
              onClick={() => setActiveImage(item)}
            >
              {/* background dark overlay */}
              <div className="absolute inset-0 bg-black/40 z-10 group-hover:bg-black/20 transition-colors duration-500" />

              {/* dynamic image container */}
              <Image
                src={item.src}
                alt={item.title}
                fill
                priority
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                sizes="(max-width: 768px) 100vw, 50vw"
              />

              {/* ambient top orange bar visible on hover */}
              <div className="absolute top-0 left-0 w-full h-[3px] bg-transparent group-hover:bg-orange-500 transition-colors duration-500 z-20" />

              {/* info layout card */}
              <div className="absolute bottom-0 left-0 w-full p-4 sm:p-6 z-20 translate-y-2 group-hover:translate-y-0 transition-transform duration-500 flex flex-col justify-end bg-gradient-to-t from-black via-black/60 to-transparent">
                <span className="text-[9px] sm:text-[10px] font-bold uppercase tracking-widest text-orange-500 mb-1 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-75">
                  {item.tag}
                </span>
                <h3 className="text-sm sm:text-lg lg:text-xl font-bold text-white uppercase tracking-wider">
                  {item.title}
                </h3>
                <p className="text-[10px] sm:text-xs text-neutral-400 mt-1 opacity-0 group-hover:opacity-100 transition-all duration-500 delay-100 line-clamp-1">
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* interactive full screen lightbox modal */}
      {activeImage && (
        <div
          className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-4 backdrop-blur-md transition-opacity duration-300"
          onClick={() => setActiveImage(null)}
        >
          {/* close button */}
          <button
            className="absolute top-6 right-6 text-white hover:text-orange-500 transition-colors z-50 flex items-center justify-center w-12 h-12 border border-neutral-800 bg-neutral-950/80 rounded-none"
            onClick={() => setActiveImage(null)}
          >
            <span className="material-symbols-outlined text-2xl">close</span>
          </button>

          {/* light box content panel */}
          <div
            className="relative w-full max-w-5xl aspect-video max-h-[85vh] flex flex-col border border-neutral-800 bg-[#0c0c0c] rounded-none overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative flex-grow w-full bg-black">
              <Image
                src={activeImage.src}
                alt={activeImage.title}
                fill
                className="object-contain"
                sizes="(max-width: 1200px) 100vw, 1200px"
              />
            </div>
            
            {/* description bar */}
            <div className="p-6 border-t border-neutral-900 bg-[#080808] flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <div>
                <span className="text-xs font-bold uppercase tracking-widest text-orange-500">
                  {activeImage.tag}
                </span>
                <h4 className="text-xl font-bold text-white uppercase tracking-wide mt-1">
                  {activeImage.title}
                </h4>
                <p className="text-xs text-neutral-400 mt-1">
                  {activeImage.desc}
                </p>
              </div>
              <button
                className="px-6 py-3 bg-orange-500 text-black text-xs font-bold uppercase tracking-widest hover:bg-orange-600 transition-colors"
                onClick={() => setActiveImage(null)}
              >
                Close View
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
