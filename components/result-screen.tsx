"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import type { Persona } from "@/lib/data";
import { encodeCardData } from "@/lib/card-encoding";
import { generateCardPNG } from "@/lib/canvas-card";
import { shareOrCopy } from "@/lib/share";
import ResultCard from "@/components/result-card";
import Toast from "@/components/toast";

interface ResultScreenProps {
  persona: Persona;
  momName: string;
  onStartOver: () => void;
}

export default function ResultScreen({ persona, momName, onStartOver }: ResultScreenProps) {
  const [toast, setToast] = useState<string | null>(null);
  const [downloading, setDownloading] = useState(false);

  const cardHash = encodeCardData(persona.id, momName);
  const greetingUrl = `${typeof window !== "undefined" ? window.location.origin : ""}/card/${cardHash}`;

  const handleShare = async () => {
    const result = await shareOrCopy({
      title: `Happy Mother's Day, ${momName}!`,
      text: `Dear ${momName}, you are "${persona.name}" — a Milky Mist Mother's Day personality! "${persona.sweetMessage}" Open your card:`,
      url: greetingUrl,
    });
    if (result === "copied") setToast("Link copied to clipboard");
    else if (result === "failed") setToast("Could not share. Try copying the link manually.");
  };

  const handleDownload = async () => {
    if (downloading) return;
    setDownloading(true);
    try {
      const dataUrl = await generateCardPNG(persona, momName);
      const link = document.createElement("a");
      link.download = `MilkyMist_MomCard_${momName.replace(/\s+/g, "_")}.png`;
      link.href = dataUrl;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      setToast("Card downloaded!");
    } catch (err) {
      console.error("Download failed:", err);
      setToast("Download failed. Please try again.");
    } finally { setDownloading(false); }
  };

  return (
    <motion.section initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }}
      className="relative min-h-dvh flex flex-col items-center px-5 py-8 sm:py-12 overflow-hidden bg-page">
      <div className="relative z-10 w-full max-w-lg mx-auto flex flex-col items-center gap-5 sm:gap-6">
        <motion.div initial={{ opacity: 0, scale: 0.97 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.4, delay: 0.2 }} className="w-full">
          <ResultCard persona={persona} momName={momName} />
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.4 }} className="flex flex-col gap-3 w-full">
          <button onClick={handleShare}
            className="w-full flex items-center justify-center gap-2 h-12 rounded-full bg-navy text-white text-sm font-semibold tracking-wide hover:bg-navy-light active:scale-[0.98] transition-all duration-200 cursor-pointer shadow-md">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" /></svg>
            Send to {momName}
          </button>
          <button onClick={handleDownload} disabled={downloading}
            className="w-full flex items-center justify-center gap-2 h-12 rounded-full glass text-text-dark text-sm font-semibold hover:bg-white/70 active:scale-[0.98] transition-all duration-200 cursor-pointer disabled:opacity-50 shadow-sm">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>
            {downloading ? "Generating..." : "Download Card"}
          </button>
        </motion.div>

        <button onClick={onStartOver} className="text-sm text-text-muted hover:text-text-mid transition-colors cursor-pointer py-2 px-4">Start over</button>
        <p className="text-xs text-text-muted">Mother&apos;s Day 2025</p>
      </div>
      {toast && <Toast message={toast} onDismiss={() => setToast(null)} />}
    </motion.section>
  );
}
