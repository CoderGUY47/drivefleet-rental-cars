"use client";

import Image from "next/image";

const steps = [
  {
    number: "01",
    title: "Browse & Book Online",
    description:
      "Explore our curated premium fleet, select your vehicle, and complete your secure booking in minutes.",
    image: "/assets/browse-and-book.png",
  },
  {
    number: "02",
    title: "Choose Your Vehicle",
    description:
      "Pick from our exclusive lineup of luxury sedans, high-performance SUVs, and electric supercars.",
    image: "/assets/choose-vehicle.png",
  },
  {
    number: "03",
    title: "Enjoy Your Drive",
    description:
      "Your vehicle is delivered to your chosen location — pristine, fuelled, and ready for the road.",
    image: "/assets/enjoy-drive.png",
  },
];

export default function RentalProcess() {
  return (
    <section className="py-24 bg-black border-t border-neutral-900 relative overflow-hidden">
      <Image
        src="https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&w=1600&q=20"
        alt="Background premium car layout"
        fill
        sizes="100vw"
        priority
        className="object-cover opacity-40 pointer-events-none"
      />
      <div className="max-w-[90%] mx-auto px-6 relative z-10">
        {/* section title and intro description */}
        <div className="text-center mb-16">
          <span className="text-xs font-bold uppercase tracking-widest text-orange-500 block mb-3">
            Our Process
          </span>
          <h2 className="text-4xl md:text-5xl font-extrabold uppercase text-white tracking-tight">
            Car Rental <span className="text-orange-500 italic">Process</span>
          </h2>
          <p className="mt-4 text-base text-white/70 max-w-xl mx-auto">
            From selection to the open road — our seamless 3-step process gets you behind the wheel of your dream car effortlessly.
          </p>
        </div>

        {/* step list grid layout */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <div key={index} className="group relative">
              {/* circular badge displaying the step number */}
              <div className="absolute -top-5 -left-3 z-20 w-12 h-12 bg-orange-500 text-black flex items-center justify-center font-black text-lg shadow-xl">
                {step.number}
              </div>

              {/* step process option container card */}
              <div className="relative overflow-hidden border border-neutral-800 group-hover:border-orange-500/40 transition-all duration-500 shadow-2xl">
                {/* thumbnail image illustration of the process step */}
                <div className="relative h-64 overflow-hidden">
                  <img
                    src={step.image}
                    alt={step.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />

                  {/* overlay header for the step title */}
                  <div className="absolute bottom-0 left-0 right-0 p-5">
                    <h3 className="text-lg font-bold text-white uppercase tracking-wide">
                      {step.title}
                    </h3>
                  </div>
                </div>

                {/* details and guide instructions for the step */}
                <div className="bg-[#0c0c0c] p-5 border-t border-neutral-800 group-hover:border-orange-500/20 transition-colors">
                  <p className="text-sm text-gray-400 leading-relaxed">
                    {step.description}
                  </p>
                </div>

                {/* bottom hover state visual highlighting bar */}
                <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-orange-500 group-hover:w-full transition-all duration-500" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
