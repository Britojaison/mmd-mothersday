"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { Input } from "@/components/ui/input";

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
      className="h-dvh flex flex-col items-center justify-center px-5 py-5 sm:py-6 overflow-hidden bg-page"
    >
      <div className="w-full max-w-lg mx-auto flex flex-col items-center gap-4 sm:gap-5">
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.1 }}>
          <Image src="/images/logo.png" alt="Milky Mist" width={100} height={40} className="object-contain sm:w-[130px]" priority />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="relative glass-strong rounded-2xl sm:rounded-3xl px-5 sm:px-10 py-6 sm:py-10 text-center shadow-xl w-full"
        >
          <p className="text-[11px] sm:text-xs font-medium tracking-[0.2em] uppercase text-text-muted mb-2 sm:mb-3">
            Mother&apos;s Day 2025
          </p>

          <h1 className="font-display text-2xl sm:text-4xl md:text-5xl font-medium text-text-dark leading-[1.2] mb-2 sm:mb-4">
            What kind of <span className="italic text-navy">supermom</span> is yours?
          </h1>

          <p className="text-sm sm:text-base text-text-mid font-light max-w-sm mx-auto leading-relaxed mb-4 sm:mb-6">
            Discover her Milky Mist personality — a celebration of every kind of mother.
          </p>

          <div className="flex flex-wrap justify-center gap-1.5 sm:gap-2 mb-4 sm:mb-6">
            {products.map((product, i) => (
              <motion.span key={product} initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2, delay: 0.4 + i * 0.04 }}
                className="px-3 sm:px-4 py-1 sm:py-1.5 rounded-full border border-white/50 text-xs sm:text-sm font-medium text-text-mid bg-white/40">
                {product}
              </motion.span>
            ))}
          </div>

          <form onSubmit={handleSubmit} className="w-full max-w-xs mx-auto space-y-2.5">
            <Input id="mom-name" type="text" value={name} onChange={(e) => setName(e.target.value)}
              placeholder="What do you call her?" maxLength={30} aria-label="Mom's name"
              className="h-11 sm:h-12 text-center text-base sm:text-lg font-display text-text-dark bg-white/80 border-white/60 rounded-full shadow-sm
                         placeholder:text-text-muted/40 placeholder:font-body placeholder:text-sm
                         focus-visible:border-navy focus-visible:ring-navy/20" />
            <button type="submit" disabled={!name.trim()}
              className={`w-full h-11 sm:h-12 rounded-full text-sm sm:text-base font-semibold tracking-wide uppercase transition-all duration-300 flex items-center justify-center gap-1.5 cursor-pointer
                ${name.trim() ? "btn-shimmer text-white shadow-md active:scale-[0.98]" : "bg-white/30 text-text-muted"}`}>
              Find out now
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </button>
          </form>
        </motion.div>
      </div>
    </motion.section>
  );
}
