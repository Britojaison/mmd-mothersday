"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { Input } from "@/components/ui/input";
import { FloralTopRight, FloralBottomLeft } from "@/components/florals";

const products = ["Paneer", "Ghee", "Milk", "Curd", "Yogurt"];

interface HeroScreenProps {
  onStart: (momName: string) => void;
}

export default function HeroScreen({ onStart }: HeroScreenProps) {
  const [name, setName] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim()) onStart(name.trim());
  };

  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="relative h-dvh flex flex-col items-center justify-center px-5 py-6 overflow-hidden bg-gradient-animated noise-overlay"
    >
      {/* Florals — smaller on mobile */}
      <FloralTopRight className="absolute -top-4 -right-6 w-36 sm:w-64 md:w-80 opacity-70 pointer-events-none" />
      <FloralBottomLeft className="absolute -bottom-4 -left-6 w-36 sm:w-64 md:w-80 opacity-70 pointer-events-none" />

      {/* Floating dots — hidden on small screens */}
      <div className="absolute top-20 left-[15%] w-2.5 h-2.5 rounded-full bg-navy/20 animate-float hidden sm:block" />
      <div className="absolute top-40 right-[20%] w-2 h-2 rounded-full bg-mm-border/40 animate-float-slow hidden sm:block" />

      <div className="relative z-10 w-full max-w-lg mx-auto flex flex-col items-center gap-4 sm:gap-6">
        {/* Logo */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <Image src="/images/logo.png" alt="Milky Mist" width={100} height={40} className="object-contain sm:w-[130px]" priority />
        </motion.div>

        {/* Glass card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="relative glass rounded-3xl sm:rounded-[2.5rem] border border-mm-border/60 px-6 sm:px-10 py-7 sm:py-12 text-center shadow-lg w-full"
        >
          {/* Top ornament */}
          <div className="absolute -top-2.5 left-1/2 -translate-x-1/2 flex items-center gap-2">
            <div className="w-6 h-px bg-mm-border" />
            <div className="w-1.5 h-1.5 rounded-full bg-navy/40" />
            <div className="w-6 h-px bg-mm-border" />
          </div>

          <p className="text-[10px] font-medium tracking-[0.2em] uppercase text-text-muted mb-3 sm:mb-4">
            Mother&apos;s Day 2025
          </p>

          <h1 className="font-display text-2xl sm:text-4xl md:text-5xl font-medium text-text-dark leading-[1.2] mb-3 sm:mb-4">
            What kind of{" "}
            <span className="italic text-navy">supermom</span>{" "}
            is yours?
          </h1>

          <p className="text-sm sm:text-base text-text-mid font-light max-w-sm mx-auto leading-relaxed mb-5 sm:mb-7">
            Discover her Milky Mist personality — a celebration of every kind of mother.
          </p>

          {/* Product chips */}
          <div className="flex flex-wrap justify-center gap-1.5 sm:gap-2 mb-5 sm:mb-7">
            {products.map((product, i) => (
              <motion.span
                key={product}
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.25, delay: 0.4 + i * 0.05 }}
                className="px-3 sm:px-4 py-1 sm:py-1.5 rounded-full border border-mm-border/70 text-[11px] sm:text-xs font-medium text-text-mid bg-off-white/80"
              >
                {product}
              </motion.span>
            ))}
          </div>

          {/* Name input + CTA */}
          <form onSubmit={handleSubmit} className="w-full max-w-xs mx-auto space-y-2.5">
            <Input
              id="mom-name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="What do you call her?"
              maxLength={30}
              aria-label="Mom's name"
              className="h-11 sm:h-12 text-center text-sm sm:text-base font-display text-text-dark
                         bg-white/90 border-mm-border rounded-full shadow-sm
                         placeholder:text-text-muted/40 placeholder:font-body placeholder:text-xs sm:placeholder:text-sm
                         focus-visible:border-navy focus-visible:ring-navy/20"
            />

            <button
              type="submit"
              disabled={!name.trim()}
              className={`
                w-full h-11 sm:h-12 rounded-full text-sm font-semibold tracking-wide uppercase transition-all duration-300 flex items-center justify-center gap-1.5 cursor-pointer
                ${name.trim()
                  ? "btn-shimmer text-white shadow-md hover:shadow-lg active:scale-[0.98]"
                  : "bg-mm-border/40 text-text-muted"
                }
              `}
            >
              Find out now
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </button>
          </form>

          {/* Bottom ornament */}
          <div className="absolute -bottom-2.5 left-1/2 -translate-x-1/2 flex items-center gap-2">
            <div className="w-6 h-px bg-mm-border" />
            <div className="w-1.5 h-1.5 rounded-full bg-navy/40" />
            <div className="w-6 h-px bg-mm-border" />
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
}
