"use client";
import Image from "next/image";

const brands = [
  { name: "BMW",     logo: "/assets/bmw.png" },
  { name: "Toyota",  logo: "/assets/toyota.png" },
  { name: "Audi",    logo: "/assets/audi.png" },
  { name: "Hyundai", logo: "/assets/hyundai.png" },
  { name: "Ford",    logo: "/assets/ford.png" },
  { name: "Volvo",   logo: "/assets/volvo.png" },
  { name: "Mazda",   logo: "/assets/mazda.png" },
];

export default function BrandLogos() {
  return (
    <section className="py-6 bg-black/90 border-none relative overflow-hidden">
      <div className="max-w-[95%] mx-auto px-6">
        <div className="grid grid-cols-3 md:grid-cols-7 gap-4">
          {brands.map((brand) => (
            <div
              key={brand.name}
              className="group flex flex-col items-center justify-center bg-[#070707] border border-neutral-900 hover:border-orange-500/30 p-6 h-36 transition-all duration-300"
            >
              {/* brand logo thumbnail */}
              <Image
                width={100}
                height={100}
                src={brand.logo}
                alt={brand.name}
                className="h-14 w-auto object-contain grayscale opacity-50 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-300"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
