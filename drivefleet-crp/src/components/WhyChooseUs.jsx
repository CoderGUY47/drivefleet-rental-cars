"use client";
import { Button } from "@heroui/react";
import Image from "next/image";

export default function WhyChooseUs() {
  const advantages = [
    {
      id: 1,
      image: "/assets/vecteezy_sport-car-model-photo_26175422.jpg",
      title: "24/7 Concierge Support",
      subtext: "Elite assistance, anywhere, anytime.",
    },
    {
      id: 2,
      image: "/assets/steven-binotto-o6yH_yAc2Ws-unsplash.jpg",
      title: "Instant Global Reservation",
      subtext: "Seamless booking for immediate access.",
    },
    {
      id: 3,
      image: "/assets/vecteezy_night-car-racing-illustration_24399512.jpg",
      title: "Exclusive Pickup Locations",
      subtext: "250+ VIP hubs worldwide.",
    },
  ];

  return (
    <section className="py-24 border-t border-neutral-900 relative overflow-hidden">
      {/* full-width background image decoration */}
      <div className="absolute inset-0 bg-[url('/assets/vecteezy_two-classic-cars-on-black-background_31192356.jpg')] bg-cover bg-center opacity-20" />
      <div className="absolute inset-0 bg-gradient-to-r from-black via-black/95 to-black/80" />

      {/* subtle background glow highlights */}
      <div className="absolute top-1/2 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-orange-500/10 blur-[150px] pointer-events-none" />

      <div className="max-w-[90%] mx-auto px-6 relative z-10">
        <div className="flex flex-col lg:flex-row gap-16 items-center">
          {/* left column header and hero visual */}
          <div className="w-full lg:w-1/2 space-y-10">
            <div className="flex flex-col items-start text-left">
              <h2 className="text-3xl md:text-4xl font-bold text-white uppercase tracking-wide leading-tight">
                DriveFleet{" "}
                <span className="text-orange-500 block mt-2">Advantages</span>
              </h2>
              <div className="w-20 h-1.5 bg-orange-500 mt-4" />
              <p className="mt-4 text-white text-base leading-relaxed max-w-2xl">
                Experience the pinnacle of automotive luxury and performance.
                Our exclusive fleet and elite VIP concierge services are
                designed to provide an unforgettable driving experience,
                tailored to your exact specifications.
              </p>
            </div>

            {/* high-quality featured vehicle display */}
            <div className="relative h-64 md:h-80 w-full overflow-hidden border border-neutral-800 shadow-2xl group">
              <Image
                src="/assets/vecteezy_sport-car-model-photo_26175422.jpg"
                alt="Luxury Fleet"
                height={200}
                width={1000}
                className="h-64 md:h-80 object-cover transition-transform duration-1000 group-hover:scale-105 opacity-55"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />
              <div className="absolute bottom-6 left-6">
                <Button className="px-3 py-3 bg-orange-50 text-black text-sm rounded-none font-bold uppercase tracking-widest pointer-events-auto">
                  Premium Selection
                </Button>
              </div>
            </div>
          </div>

          {/* right column stacked benefit details cards */}
          <div className="w-full lg:w-1/2 flex flex-col gap-6">
            {advantages.map((adv) => (
              <div
                key={adv.id}
                className="bg-black/80 backdrop-blur-sm flex flex-col sm:flex-row items-stretch border border-neutral-800 shadow-2xl group hover:border-orange-500/40 transition-colors duration-500 rounded-none relative overflow-hidden h-auto sm:h-43.5"
              >
                {/* left animated highlight indicator line */}
                <div className="absolute top-0 left-0 w-1 h-full bg-neutral-800 group-hover:bg-orange-500 transition-colors duration-500 z-10" />

                {/* illustrative thumbnail graphics section */}
                <div className="w-full sm:w-48 h-40 sm:h-full relative overflow-hidden bg-black shrink-0">
                  <Image
                    src={adv.image}
                    alt={adv.title}
                    width={200}
                    height={100}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-75 group-hover:opacity-100"
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-black/90 hidden sm:block" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent sm:hidden" />
                </div>

                {/* content labels text description block */}
                <div className="p-6 sm:p-8 flex flex-col justify-center flex-grow">
                  <h3 className="text-lg font-bold text-white uppercase tracking-wide mb-2">
                    {adv.title}
                  </h3>
                  <p className="text-xs font-medium text-neutral-400 leading-relaxed max-w-sm">
                    {adv.subtext}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
