"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import type { Persona } from "@/lib/data";
import { generateCardPNG } from "@/lib/canvas-card";
import Toast from "@/components/toast";

interface GreetingCardClientProps {
  persona: Persona;
  momName: string;
}

export default function GreetingCardClient({ persona, momName }: GreetingCardClientProps) {
  const [toast, setToast] = useState<string | null>(null);
  const [downloading, setDownloading] = useState(false);

  const handleDownload = async () => {
    if (downloading) return;
    setDownloading(true);
    try {
      const dataUrl = await generateCardPNG(persona, momName);
      const link = document.createElement("a");
      link.download = `MilkyMist_MothersDay_${momName.replace(/\s+/g, "_")}.png`;
      link.href = dataUrl;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      setToast("Card saved!");
    } catch (err) {
      console.error("Download failed:", err);
      setToast("Download failed. Please try again.");
    } finally { setDownloading(false); }
  };

  return (
    <motion.section initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}
      className="relative min-h-screen flex flex-col items-center px-4 sm:px-6 py-10 sm:py-16 overflow-hidden bg-page">
      <div className="relative z-10 w-full max-w-lg mx-auto flex flex-col items-center gap-8">
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5, delay: 0.2 }} className="w-full">
          <div className="glass-strong rounded-3xl overflow-hidden shadow-xl">
            <div className="h-1.5 bg-gradient-to-r from-navy/40 via-navy to-navy/40" />
            <div className="px-8 sm:px-10 pt-10 pb-8">
              <div className="flex justify-center mb-8">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/images/logo.png?v=2" alt="Milky Mist" width={110} height={44} className="object-contain" />
              </div>
              <div className="text-center mb-8">
                <p className="text-xs font-medium tracking-[0.2em] uppercase text-text-muted mb-3">Happy Mother&apos;s Day</p>
                <h1 className="font-display text-4xl sm:text-5xl italic text-navy mb-2 leading-tight">{momName}</h1>
                <div className="w-16 h-px bg-navy/20 mx-auto mt-4" />
              </div>
              <div className="text-center mb-8">
                <p className="text-xs font-medium tracking-[0.12em] uppercase text-text-muted mb-2">You are</p>
                <h2 className="font-display text-2xl sm:text-3xl font-medium text-text-dark mb-3">{persona.name}</h2>
                <p className="text-base text-text-mid font-light leading-relaxed max-w-sm mx-auto">{persona.tagline}</p>
              </div>
              <div className="flex items-center gap-4 my-6">
                <div className="flex-1 h-px bg-white/40" />
                <div className="w-1.5 h-1.5 rounded-full bg-navy/40" />
                <div className="flex-1 h-px bg-white/40" />
              </div>
              <div className="mb-8">
                <p className="text-xs font-medium tracking-[0.12em] uppercase text-text-muted mb-4 text-center">Your Milky Mist Staples</p>
                <div className="flex flex-wrap justify-center gap-2">
                  {persona.products.map((product) => (
                    <span key={product.name} className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full border border-white/50 bg-white/40 text-sm">
                      <span className="font-medium text-text-dark">{product.name}</span>
                      <span className="text-text-muted font-light">&middot;</span>
                      <span className="text-text-muted font-light">{product.reason}</span>
                    </span>
                  ))}
                </div>
              </div>
              <div className="bg-white/30 rounded-2xl p-6 mb-8 border border-white/40">
                <p className="text-xs font-medium tracking-[0.12em] uppercase text-text-muted mb-2 text-center">A Recipe Just for You</p>
                <h3 className="font-display text-xl font-medium text-text-dark mb-2 text-center">{persona.recipe}</h3>
                <p className="text-sm text-text-mid font-light leading-relaxed text-center mb-4">{persona.recipeDescription}</p>
                <div className="flex flex-wrap justify-center gap-2">
                  {persona.recipeTags.map((tag) => (
                    <span key={tag} className="px-3 py-1 rounded-full bg-white/50 text-xs font-medium text-navy border border-navy/10">{tag}</span>
                  ))}
                </div>
              </div>
              <div className="text-center py-4">
                <div className="w-10 h-px bg-navy/20 mx-auto mb-6" />
                <p className="font-display text-xl sm:text-2xl italic text-text-dark leading-relaxed mb-2">&ldquo;{persona.sweetMessage}&rdquo;</p>
                <p className="text-sm text-text-muted font-light mt-4">With love, from your family</p>
              </div>
            </div>
            <div className="h-1.5 bg-gradient-to-r from-navy/40 via-navy to-navy/40" />
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.5 }} className="flex flex-col gap-3 w-full">
          <button onClick={handleDownload} disabled={downloading}
            className="w-full flex items-center justify-center gap-2 h-12 rounded-full bg-navy text-white text-sm font-semibold tracking-wide hover:bg-navy-light active:scale-[0.98] transition-all duration-200 cursor-pointer disabled:opacity-50 shadow-md">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>
            {downloading ? "Generating..." : "Save this card"}
          </button>
          <a href="/" className="w-full flex items-center justify-center gap-2 h-12 rounded-full glass text-text-dark text-sm font-semibold hover:bg-white/70 active:scale-[0.98] transition-all duration-200 shadow-sm">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" /></svg>
            Create your own
          </a>
        </motion.div>
        <p className="text-xs text-text-muted mt-2">Milky Mist — Mother&apos;s Day 2025</p>
      </div>
      {toast && <Toast message={toast} onDismiss={() => setToast(null)} />}
    </motion.section>
  );
}
