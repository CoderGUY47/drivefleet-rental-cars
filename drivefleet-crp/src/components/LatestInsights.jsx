"use client";

import { toast } from "react-toastify";

export default function LatestInsights() {
  const handleViewAll = () => {
    toast.info("Blog section coming soon!");
  };

  const posts = [
    {
      id: 1,
      tag: "Luxury Travel",
      title: "Top 10 Scenic Routes for Luxury Coupes",
      excerpt:
        "Discover the most breathtaking alpine and coastal routes configured for driving premium performance vehicles.",
      date: "OCT 12, 2026",
      readTime: "5 Min Read",
      img: "/assets/steven-binotto-o6yH_yAc2Ws-unsplash.jpg",
    },
    {
      id: 2,
      tag: "Maintenance",
      title: "The Rigorous Standards of Our Inspection",
      excerpt:
        "An exclusive breakdown of our proprietary multi-point diagnostics dashboard and execution standard.",
      date: "SEP 28, 2026",
      readTime: "8 Min Read",
      img: "https://lh3.googleusercontent.com/aida-public/AB6AXuCXJFO5eKuHiWxrt1bdoPcE2__mcfCm7kORt70COyye43f8TTOq_x6-bI-uwzmj8NG9MZ5zB6xPtfDALJ0D_LIW5rvay8ZFI-ITjEadmoOhu2-0aWTIJVUt_dbcs_lT-DXQvl5yFGh-M83sloMjadAuZRAgiDU480auTHYUy4VRFqOJuh3GYiwHZxrbhG1pbMti7MdI0gVds_Qq3pxhaFGvbdp2rqJWuY5DxGB9IEObfAFwhhSM41zfww8T-egLORj7Tz_N2lvs02Xo",
    },
    {
      id: 3,
      tag: "Corporate",
      title: "Optimizing Corporate Mobility in 2026",
      excerpt:
        "How high-end subscription assets boost executive performance metrics and streamline travel logistics.",
      date: "SEP 15, 2026",
      readTime: "6 Min Read",
      img: "/assets/chris-liverani-HUJDz6CJEaM-unsplash.jpg",
    },
  ];

  return (
    <section className="py-24 bg-black border-t border-neutral-900 relative">
      <div className="max-w-[90%] mx-auto px-6 relative z-10">
        {/* section header row and triggers */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <div className="text-left">
            <h2 className="text-3xl md:text-5xl font-bold text-white uppercase tracking-wider">
              Get Every 
              <span className="text-orange-500 mt-2"> Update</span>
            </h2>
          </div>

          <button
            onClick={handleViewAll}
            className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-white hover:text-orange-500 transition-colors group pb-2"
          >
            View All Articles
            <span className="material-symbols-outlined text-base group-hover:translate-x-1 transition-transform">
              arrow_forward
            </span>
          </button>
        </div>

        {/* 3-column insights list grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {posts.map((post) => (
            <article
              key={post.id}
              className="bg-[#0c0c0c] border border-neutral-800 group overflow-hidden hover:border-orange-500/50 transition-colors duration-300 relative flex flex-col"
            >
              {/* post image zoom container */}
              <div className="relative h-56 overflow-hidden w-full">
                <img
                  src={post.img}
                  alt={post.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 grayscale group-hover:grayscale-0"
                />
                <div className="absolute inset-0 bg-black/40 group-hover:bg-transparent transition-colors duration-500" />
              </div>

              {/* post textual contents container */}
              <div className="p-8 flex flex-col flex-grow">
                <div className="flex justify-between items-center mb-4">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-orange-500">
                    {post.tag}
                  </span>
                </div>

                <h3 className="text-xl font-bold text-white mb-4 leading-snug group-hover:text-orange-500 transition-colors duration-300 uppercase tracking-wide">
                  {post.title}
                </h3>

                <p className="text-sm text-neutral-400 leading-relaxed mb-8 flex-grow">
                  {post.excerpt}
                </p>

                <div className="flex items-center justify-between text-[10px] text-neutral-500 font-bold uppercase tracking-widest border-t border-neutral-800 pt-6 mt-auto">
                  <span>{post.date}</span>
                  <span className="flex items-center gap-1.5">
                    <span className="material-symbols-outlined text-sm text-orange-500">
                      schedule
                    </span>
                    {post.readTime}
                  </span>
                </div>
              </div>

              {/* animated top accent border line */}
              <div className="absolute top-0 left-0 w-full h-1 bg-neutral-800 group-hover:bg-orange-500 transition-colors duration-500 z-10" />
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
