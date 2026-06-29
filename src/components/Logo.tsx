import React, { useState } from "react";
import { motion } from "motion/react";

export default function Logo({ size = "md", animate = true }: { size?: "sm" | "md" | "lg"; animate?: boolean }) {
  const [isHovered, setIsHovered] = useState(false);

  const sizeClasses = {
    sm: {
      svg: "w-8 h-8",
      text: "text-base",
      sub: "text-[7.5px] tracking-[0.22em]",
      dot: "w-2.5 h-2.5 -top-0.5 -right-0.5",
      sSize: "w-5 h-5"
    },
    md: {
      svg: "w-10 h-10",
      text: "text-lg sm:text-xl",
      sub: "text-[8.5px] tracking-[0.28em]",
      dot: "w-3 h-3 -top-0.5 -right-0.5",
      sSize: "w-6 h-6"
    },
    lg: {
      svg: "w-14 h-14",
      text: "text-2xl sm:text-3xl",
      sub: "text-[10px] tracking-[0.32em]",
      dot: "w-4 h-4 -top-1 -right-1",
      sSize: "w-8 h-8"
    }
  };

  const current = sizeClasses[size];

  return (
    <div 
      className="flex items-center gap-3 select-none group focus:outline-none cursor-pointer" 
      id="skillissue-premium-logo"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* 
        NEW FINAL LOGO DESIGN:
        - A dark, luxurious rounded squircle/card with deep charcoal/black background and subtle borders.
        - Inside: A beautiful, stylized solid red "S" curve.
        - Overlapping top-right: A vibrant, solid red circular badge/dot.
      */}
      <div className={`relative ${current.svg} shrink-0 flex items-center justify-center`}>
        {/* Deep, premium back-glow of the red brand identity */}
        <div 
          className={`absolute inset-0 blur-xl rounded-full transition-all duration-500 scale-110 ${
            isHovered ? "bg-red-500/25" : "bg-red-500/10"
          }`} 
        />

        {/* Squircle Tile Container */}
        <motion.div 
          animate={animate && isHovered ? { scale: 1.05 } : { scale: 1 }}
          transition={{ type: "spring", stiffness: 400, damping: 15 }}
          className={`absolute inset-0 rounded-xl sm:rounded-2xl border flex items-center justify-center transition-all duration-300 ${
            isHovered 
              ? "border-red-500/40 shadow-[0_8px_25px_rgba(239,68,68,0.25)] bg-[#050508]" 
              : "border-white/10 shadow-[0_4px_15px_rgba(0,0,0,0.6)] bg-[#0c0c10]"
          }`}
        >
          {/* Stylized Red S Letter Vector */}
          <div className={`${current.sSize} flex items-center justify-center`}>
            <svg 
              className="w-full h-full overflow-visible" 
              viewBox="0 0 24 24" 
              fill="none" 
              xmlns="http://www.w3.org/2000/svg"
            >
              <motion.path
                d="M17 7C17 4.8 15.2 3 13 3C10.8 3 9 4.8 9 7C9 9.5 12.5 10 14 11C15.5 12 17 12.5 17 15C17 17.2 15.2 19 13 19C10.8 19 9 17.2 9 15"
                stroke="#FF2B40"
                strokeWidth="4"
                strokeLinecap="round"
                strokeLinejoin="round"
                animate={animate && isHovered ? {
                  stroke: "#FF1E27",
                  scale: 1.02
                } : {
                  stroke: "#FF2B40",
                  scale: 1
                }}
                transition={{ type: "spring", stiffness: 300, damping: 18 }}
              />
            </svg>
          </div>
        </motion.div>

        {/* Overlapping top-right red badge dot */}
        <motion.span 
          className={`absolute ${current.dot} rounded-full bg-[#FF1E27] border-2 border-[#050508] z-25 shadow-[0_2px_10px_rgba(255,30,39,0.5)]`}
          animate={animate && isHovered ? {
            scale: 1.2,
            backgroundColor: "#FF1E27"
          } : {
            scale: 1,
            backgroundColor: "#FF2B40"
          }}
          transition={{
            type: "spring",
            stiffness: 450,
            damping: 12
          }}
        />
      </div>

      {/* Brand Text styling */}
      <div className="flex flex-col">
        <span className={`font-sans font-medium tracking-tight text-white leading-none ${current.text} flex items-center`}>
          <span className="text-white font-extrabold transition-colors duration-300">Skilllssue</span>
          <span className="font-light text-zinc-500">.ai</span>
        </span>
        <span className={`font-mono font-bold mt-1 ${current.sub} text-zinc-500 tracking-widest`}>
          <span className="text-red-500/80">TURN ISSUES INTO OFFERS</span>
        </span>
      </div>
    </div>
  );
}
