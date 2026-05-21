"use client";

import { useRef, useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";

const testimonials = [
  {
    id: 1,
    quote:
      "This was our first time renting from DriveFleet and we were very pleased with the whole experience. Your price was lower than other companies. Our rental experience was good from start to finish.",
    name: "James Wilson",
    role: "CEO, TechNova Solutions",
    avatar:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDVtr_BUglWEBCzaFaEyRA-4hqElpANlGpFbPO1fBm_WfkVgzxnqslDlRDvZlmmZqpJMbZO4JXQBzlaMhw4cYIPgVYmlDazj15tZypcDnRssX2Ag3IkiBoUMVcP2lVRPcVfNk3rQtJbZC_eRlHhePMHkxxP1UIUWm7CUJenT1krZdDI18RlALJhVu2cYHkro1yE4FepnWKQmBkxSO9w12DgjSRDS9Ucwiik1ddcWFRaeOvgIlUmFcXznvMFMj5NT6y_q4iPVlVPw-0o",
  },
  {
    id: 2,
    quote:
      "DriveFleet offers a truly premium rental experience. The Tesla Model S was outstanding, and their 24/7 support went above and beyond to assist during my event.",
    name: "Sarah Jenkins",
    role: "Global Events Coordinator",
    avatar:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBAo40_9wSJ6wu2TejVEaRIKmjITbHI7-S64bRe_eOthiOwV3AGzeHvwQ4Y8sHB9eK3z3tMZSnyuKBwiIwFEzmMNu4xCbLrALF8Vzc0aN7dbdVt5OvlemUZECsGXoElW3v6THsyGgLbZxZZxz3x5iDOZ2ISksWuTqarUvdYHieZQpH9zAtaSRmbn4LRgCu75QHQMqD4ZwB4Tp8xfGp52lt1bFOkDl8WBY72g042UUgj0bPxMkmKJHfFsy1w0Gw-QgmIrdVVkU3r7Or7",
  },
  {
    id: 3,
    quote:
      "High-performance engines, immaculate vehicles, and reliable customer support. I use DriveFleet exclusively for all corporate summits and executive travel.",
    name: "Michael Chang",
    role: "Investment Board Director",
    avatar:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDWYH99z7f0dAJJDIUp-yq7di46rPf7Dg6kdu9FUfUoiP54Zhy49YfitmR7b8eFdmlXhwfHpNJuldJqnlknsEat89gwJpoDyx-nFLosfnFV2BnJN_Zz27vXY4v_aCoVoBhoDHMYiNTnEZi9BCtdfaPtSuuGIaXmCBr4Lw-wjLEC6iiy6A6MkRLAskHzm0lwOKiZ7-Gtlakp_Kybjri1IPYiizLdJC_tPb6pY9_CBlL_WIyuexAHVPz3JK5Rg93AzmJa6jsESfr9i1JW",
  },
  {
    id: 4,
    quote:
      "The seamless process from booking to vehicle return was flawless. The car was delivered directly to our hotel. Highly recommend for any luxury travel needs.",
    name: "Elena Rodriguez",
    role: "Luxury Travel Blogger",
    avatar: "https://randomuser.me/api/portraits/women/68.jpg",
  },
  {
    id: 5,
    quote:
      "Exceptional service! The vehicle selection is unparalleled, and the VIP treatment makes you feel like their only client. I will definitely be renting again.",
    name: "Marcus Thorne",
    role: "Real Estate Developer",
    avatar: "https://randomuser.me/api/portraits/men/32.jpg",
  },
];

export default function ClientExperiences() {
  const prevRef = useRef(null);
  const nextRef = useRef(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <section className="py-24 bg-black border-t border-neutral-900 relative overflow-hidden">
      {/* background glow effect */}
      <div className="absolute top-1/2 right-0 -translate-y-1/2 w-[600px] h-[600px] bg-orange-500/5 blur-[150px] pointer-events-none" />

      <div className="max-w-[90%] mx-auto px-6 relative z-10">
        {/* section header and controls */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <div className="text-left">
            <h2 className="text-3xl md:text-4xl font-bold text-white uppercase tracking-wider">
              Customer Experiences
            </h2>
          </div>

          {/* navigation arrows */}
          <div className="flex gap-4">
            <button
              ref={prevRef}
              className="w-12 h-12 flex items-center justify-center border border-neutral-800 bg-black hover:bg-orange-500 hover:border-orange-500 hover:text-black transition-colors text-white z-10"
            >
              <span className="material-symbols-outlined">arrow_back</span>
            </button>
            <button
              ref={nextRef}
              className="w-12 h-12 flex items-center justify-center border border-neutral-800 bg-black hover:bg-orange-500 hover:border-orange-500 hover:text-black transition-colors text-white z-10"
            >
              <span className="material-symbols-outlined">arrow_forward</span>
            </button>
          </div>
        </div>

        {/* swiper container for slides */}
        {mounted && (
          <Swiper
            modules={[Autoplay, Navigation]}
            spaceBetween={24}
            slidesPerView={1}
            loop={true}
            autoplay={{
              delay: 3500,
              disableOnInteraction: false,
              pauseOnMouseEnter: true,
            }}
            navigation={{
              prevEl: prevRef.current,
              nextEl: nextRef.current,
            }}
            onBeforeInit={(swiper) => {
              swiper.params.navigation.prevEl = prevRef.current;
              swiper.params.navigation.nextEl = nextRef.current;
            }}
            breakpoints={{
              640: { slidesPerView: 1 },
              768: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
            }}
            className="w-full pb-4"
          >
            {testimonials.map((t) => (
              <SwiperSlide key={t.id} className="h-auto">
                <div className="h-full bg-[#0c0c0c] border border-neutral-800 p-8 flex flex-col justify-between group hover:border-orange-500/50 transition-colors duration-300 relative keep-dark-card">
                  {/* top accent line on hover */}
                  <div className="absolute top-0 left-0 w-full h-1 bg-neutral-800 group-hover:bg-orange-500 transition-colors duration-500" />

                  <div>
                    {/* customer rating stars */}
                    <div className="flex gap-1 mb-6 text-orange-500">
                      {[...Array(5)].map((_, i) => (
                        <span
                          key={i}
                          className="material-symbols-outlined text-sm"
                          style={{ fontVariationSettings: "'FILL' 1" }}
                        >
                          star
                        </span>
                      ))}
                    </div>

                    {/* testimonial quote text */}
                    <p className="text-neutral-400 text-sm leading-relaxed mb-8">
                      &ldquo;{t.quote}&rdquo;
                    </p>
                  </div>

                  {/* client avatar and name */}
                  <div className="flex items-center gap-4 mt-auto">
                    <img
                      src={t.avatar}
                      alt={t.name}
                      className="w-12 h-12 object-cover rounded-none grayscale group-hover:grayscale-0 transition-all duration-300"
                    />
                    <div>
                      <h4 className="text-white font-bold text-sm uppercase tracking-wide">
                        {t.name}
                      </h4>
                      <p className="text-orange-500 text-[10px] font-bold uppercase tracking-widest">
                        {t.role}
                      </p>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        )}
      </div>
    </section>
  );
}
