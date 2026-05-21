"use client";

import { Button } from "@heroui/react";

export default function AnimatedButton({
  children,
  icon,
  className = "",
  ...props
}) {
  return (
    <Button
      className={`group relative inline-flex items-center justify-center gap-3 px-8 py-4 bg-gray-900 text-white font-bold uppercase tracking-widest text-sm overflow-hidden transition-all ${className}`}
      {...props}
    >
      <div className="absolute inset-0 w-0 bg-orange-500 transition-all duration-300 ease-out group-hover:w-full"></div>
      <span className="relative z-10">{children}</span>
      {icon && (
        <span className="relative z-10 text-lg group-hover:-rotate-12 transition-transform duration-300 flex items-center justify-center">
          {icon}
        </span>
      )}
    </Button>
  );
}
