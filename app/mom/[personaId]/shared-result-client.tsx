"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import type { Persona } from "@/lib/data";
import { generateCardPNG } from "@/lib/canvas-card";
import { Button } from "@/components/ui/button";
import ResultCard from "@/components/result-card";
import Toast from "@/components/toast";

interface SharedResultClientProps {
  persona: Persona;
}

export default function SharedResultClient({ persona }: SharedResultClientProps) {
  const [toast, setToast] = useState<string | null>(null);
  const [downloading, setDownloading] = useState(false);

  const shareText = `My mom is "${persona.name}" — a Milky Mist Mother's Day personality! "${persona.sweetMessage}" Find yours at milkymist.in/mothersday`;
  const shareUrl = `https://milkymist.in/mom/${persona.id}`;

  const handleShare = async () => {
    if (typeof navigator !== "undefined" && navigator.share) {
      try {
        await navigator.share({ title: `My mom is ${persona.name}`, text: shareText, url: shareUrl });
      } catch { await copyToClipboard(); }
    } else { await copyToClipboard(); }
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(`${shareText}\n${shareUrl}`);
      setToast("Copied to clipboard");
    } catch { setToast("Could not copy to clipboard"); }
  };

  const handleDownload = async () => {
    if (downloading) return;
    setDownloading(true);
    try {
      const dataUrl = await generateCardPNG(persona, "Mom");
      const link = document.createElement("a");
      link.download = `MilkyMist_MomCard_${persona.name.replace(/\s+/g, "")}.png`;
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
    <motion.section initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }} className="min-h-screen flex flex-col items-center px-6 py-12">
      <div className="w-full max-w-lg mx-auto flex flex-col items-center gap-8">
        <div>
          <Image src="/images/logo.png" alt="Milky Mist" width={120} height={48} className="object-contain" />
        </div>
        <motion.div initial={{ opacity: 0, scale: 0.97 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.4, delay: 0.1 }} className="w-full">
          <ResultCard persona={persona} />
        </motion.div>
        <div className="flex flex-col sm:flex-row gap-3 w-full">
          <Button onClick={handleShare} className="flex-1 h-12 rounded-full bg-mm-primary text-white hover:bg-mm-primary-dark text-sm font-medium">
            <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
            </svg>
            Share with Mom
          </Button>
          <Button variant="outline" onClick={handleDownload} disabled={downloading} className="flex-1 h-12 rounded-full border-border-brand text-text-dark bg-mm-card hover:bg-tint text-sm font-medium">
            <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
            {downloading ? "Generating..." : "Download Card"}
          </Button>
        </div>
        <a href="/" className="text-sm font-medium text-mm-primary hover:text-mm-primary-dark transition-colors rounded-lg px-3 py-2">
          Discover your mom&apos;s personality
        </a>
        <p className="text-xs text-text-muted mt-4">Mother&apos;s Day 2025</p>
      </div>
      {toast && <Toast message={toast} onDismiss={() => setToast(null)} />}
    </motion.section>
  );
}
