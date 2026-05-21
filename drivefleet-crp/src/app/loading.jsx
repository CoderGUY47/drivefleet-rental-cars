"use client";

import React from "react";

export default function Loading() {
  return (
    <div className="fixed inset-0 z-[99999] flex flex-col items-center justify-center bg-black text-white font-sans overflow-hidden">
      {/* Self-contained CSS animations */}
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes car-rumble {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-2px); }
        }
        @keyframes wheel-spin {
          from { transform: rotate(360deg); }
          to { transform: rotate(0deg); }
        }
        @keyframes smoke-puff-right-1 {
          0% {
            transform: translate(0, 0) scale(0.3);
            opacity: 0.9;
            filter: blur(4px);
          }
          50% {
            opacity: 0.7;
            filter: blur(8px);
          }
          100% {
            transform: translate(90px, -15px) scale(3.5);
            opacity: 0;
            filter: blur(18px);
          }
        }
        @keyframes smoke-puff-right-2 {
          0% {
            transform: translate(0, 0) scale(0.2);
            opacity: 0.95;
            filter: blur(3px);
          }
          50% {
            opacity: 0.8;
            filter: blur(6px);
          }
          100% {
            transform: translate(120px, -8px) scale(4.0);
            opacity: 0;
            filter: blur(24px);
          }
        }
        @keyframes smoke-puff-right-3 {
          0% {
            transform: translate(0, 0) scale(0.4);
            opacity: 0.8;
            filter: blur(5px);
          }
          50% {
            opacity: 0.6;
            filter: blur(10px);
          }
          100% {
            transform: translate(100px, -25px) scale(3.2);
            opacity: 0;
            filter: blur(16px);
          }
        }
        @keyframes speed-line {
          0% {
            transform: translateX(-180px);
            opacity: 0;
          }
          50% {
            opacity: 0.4;
          }
          100% {
            transform: translateX(240px);
            opacity: 0;
          }
        }
        @keyframes pulse-glow {
          0%, 100% { opacity: 0.6; text-shadow: 0 0 10px rgba(249, 115, 22, 0.2); }
          50% { opacity: 1; text-shadow: 0 0 20px rgba(249, 115, 22, 0.6); }
        }
        
        .animate-car {
          animation: car-rumble 0.07s infinite linear;
        }
        .animate-wheel {
          animation: wheel-spin 0.2s infinite linear;
        }
        .animate-smoke-1 {
          animation: smoke-puff-right-1 0.7s infinite cubic-bezier(0.16, 1, 0.3, 1);
        }
        .animate-smoke-2 {
          animation: smoke-puff-right-2 0.9s infinite cubic-bezier(0.16, 1, 0.3, 1) 0.15s;
        }
        .animate-smoke-3 {
          animation: smoke-puff-right-3 0.8s infinite cubic-bezier(0.16, 1, 0.3, 1) 0.3s;
        }
        .animate-line-1 {
          animation: speed-line 1.0s infinite linear;
        }
        .animate-line-2 {
          animation: speed-line 1.3s infinite linear 0.3s;
        }
        .animate-line-3 {
          animation: speed-line 0.9s infinite linear 0.6s;
        }
        .animate-pulse-glow {
          animation: pulse-glow 1.2s infinite ease-in-out;
        }
      ` }} />

      {/* Main loading container */}
      <div className="relative flex flex-col items-center justify-center p-8 max-w-md w-full">
        {/* Glowing aura backdrop */}
        <div className="absolute w-72 h-72 bg-orange-500/10 rounded-full blur-3xl -z-10" />

        {/* Speed lines in the background streaming to the right */}
        <div className="absolute inset-0 w-full h-48 overflow-hidden pointer-events-none -z-10 opacity-20">
          <div className="absolute top-12 left-0 w-20 h-[2px] bg-gradient-to-r from-transparent to-orange-500 animate-line-1" />
          <div className="absolute top-28 left-0 w-28 h-[2px] bg-gradient-to-r from-transparent to-orange-500 animate-line-2" />
          <div className="absolute top-36 left-0 w-16 h-[2px] bg-gradient-to-r from-transparent to-orange-500 animate-line-3" />
        </div>

        {/* Dynamic Car Vector Animation */}
        <div className="relative w-80 h-36 flex items-center justify-center mb-8">
          {/* Main Car Frame */}
          <div className="relative w-56 h-16 animate-car">
            {/* SVG sleek high-performance sports car outline - FACING LEFT */}
            <svg
              viewBox="0 0 220 80"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="w-full h-full text-orange-500"
            >
              {/* Car Body (facing Left) */}
              <path
                d="M210 55 C210 55 208 42 198 40 L165 35 L130 12 C125 8 105 8 85 15 L40 32 L15 38 C5 40 2 52 5 58 L8 62 C10 65 20 66 25 66 H200 C206 66 210 60 210 55 Z"
                fill="#1d1d1d"
                stroke="currentColor"
                strokeWidth="3.5"
                strokeLinejoin="round"
              />
              {/* Cabin/Windows */}
              <path
                d="M127 16 C125 12 108 12 90 18 L52 33 L75 35 L127 35 Z"
                fill="#000"
                stroke="currentColor"
                strokeWidth="2"
              />
              {/* Rear spoiler */}
              <path
                d="M205 38 L208 26 L214 30 L212 38"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              {/* Front headlight stripe */}
              <path
                d="M16 43 L7 46"
                stroke="#ffd60a"
                strokeWidth="3.5"
                strokeLinecap="round"
              />
              {/* Rear light stripe */}
              <path
                d="M206 48 H195"
                stroke="#ff3b30"
                strokeWidth="3.5"
                strokeLinecap="round"
              />
              {/* Exhaust Pipe */}
              <rect x="205" y="58" width="10" height="4" fill="currentColor" opacity="0.8" />
            </svg>

            {/* Front wheel on the Left (spinning) */}
            <div className="absolute left-[38px] bottom-[-16px] w-12 h-12 bg-black border-[3.5px] border-orange-500 rounded-full flex items-center justify-center shadow-lg animate-wheel">
              <div className="w-[32px] h-[32px] bg-neutral-900 rounded-full flex items-center justify-center">
                <div className="w-full h-full relative">
                  <div className="absolute top-1/2 left-0 right-0 h-[2.5px] bg-orange-500 -translate-y-1/2" />
                  <div className="absolute left-1/2 top-0 bottom-0 w-[2.5px] bg-orange-500 -translate-x-1/2" />
                  <div className="absolute inset-[6px] bg-black rounded-full" />
                </div>
              </div>
            </div>

            {/* Rear wheel on the Right (spinning & generating smoke) */}
            <div className="absolute right-[38px] bottom-[-16px] w-12 h-12 bg-black border-[3.5px] border-orange-500 rounded-full flex items-center justify-center shadow-lg animate-wheel">
              <div className="w-[32px] h-[32px] bg-neutral-900 rounded-full flex items-center justify-center">
                <div className="w-full h-full relative">
                  <div className="absolute top-1/2 left-0 right-0 h-[2.5px] bg-orange-500 -translate-y-1/2" />
                  <div className="absolute left-1/2 top-0 bottom-0 w-[2.5px] bg-orange-500 -translate-x-1/2" />
                  <div className="absolute inset-[6px] bg-black rounded-full" />
                </div>
              </div>
            </div>

            {/* Exhaust Cloud Smoke Effect on the Right (Back of the car) */}
            <div className="absolute right-[-20px] bottom-[5px] pointer-events-none z-10">
              <div className="absolute w-8 h-8 bg-neutral-400/50 rounded-full animate-smoke-1" />
              <div className="absolute w-6 h-6 bg-white/40 rounded-full animate-smoke-2" />
              <div className="absolute w-9 h-9 bg-neutral-500/35 rounded-full animate-smoke-3" />
            </div>
          </div>
        </div>

        {/* Loader messages */}
        <h2 className="text-xl font-bold uppercase tracking-[0.3em] text-orange-500 animate-pulse-glow text-center mb-2">
          Broom Broom .....
        </h2>
        <p className="text-base uppercase tracking-widest text-white text-center">
          Preparing Your Fleet Experience
        </p>
      </div>
    </div>
  );
}
