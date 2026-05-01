"use client";

import { forwardRef } from "react";
import type { Persona } from "@/lib/data";

interface ResultCardProps {
  persona: Persona;
  momName?: string;
}

const ResultCard = forwardRef<HTMLDivElement, ResultCardProps>(({ persona, momName }, ref) => {
  const displayName = momName || "Mom";

  return (
    <div ref={ref}
      className="relative rounded-3xl overflow-hidden shadow-xl glass-strong"
      aria-label={`Result card: ${displayName} is ${persona.name}. ${persona.tagline}`}>

      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-navy/30 via-navy to-navy/30" />

      {/* Header */}
      <div className="px-6 sm:px-8 pt-8 sm:pt-10 pb-6 sm:pb-8 text-center">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/images/logo.png?v=2" alt="Milky Mist" width={90} height={36} className="mx-auto mb-5 sm:mb-6 object-contain" />
        <p className="text-xs font-semibold tracking-[0.25em] uppercase text-navy/70 mb-2">Happy Mother&apos;s Day</p>
        <p className="font-display text-3xl sm:text-4xl italic text-navy mb-3 leading-tight">{displayName}</p>
        <div className="w-16 h-px bg-navy/20 mx-auto my-3 sm:my-4" />
        <p className="text-xs font-semibold tracking-[0.2em] uppercase text-text-muted mb-2">You are</p>
        <h2 className="font-display text-2xl sm:text-3xl font-medium text-text-dark mb-2 sm:mb-3">{persona.name}</h2>
        <p className="text-sm sm:text-base text-text-mid font-light leading-relaxed max-w-sm mx-auto">{persona.tagline}</p>
      </div>

      {/* Products */}
      <div className="px-6 sm:px-8 py-5 sm:py-6 border-t border-white/40">
        <p className="text-xs font-semibold tracking-[0.2em] uppercase text-text-muted mb-3 sm:mb-4 text-center">Her Milky Mist Staples</p>
        <div className="flex flex-wrap justify-center gap-2">
          {persona.products.map((product) => (
            <span key={product.name} className="inline-flex items-center gap-1.5 px-3.5 sm:px-4 py-1.5 sm:py-2 rounded-full border border-white/50 bg-white/40 text-sm shadow-sm">
              <span className="font-semibold text-text-dark">{product.name}</span>
              <span className="text-text-muted/60">&middot;</span>
              <span className="text-text-muted font-light text-xs sm:text-sm">{product.reason}</span>
            </span>
          ))}
        </div>
      </div>

      {/* Recipe */}
      <div className="mx-5 sm:mx-6 my-3 sm:my-4 rounded-2xl bg-white/30 p-5 sm:p-6 border border-white/40">
        <p className="text-xs font-semibold tracking-[0.2em] uppercase text-text-muted mb-2 text-center">A Recipe for {displayName}</p>
        <h3 className="font-display text-lg sm:text-xl font-medium text-text-dark mb-2 text-center">{persona.recipe}</h3>
        <p className="text-sm sm:text-base text-text-mid font-light leading-relaxed mb-3 sm:mb-4 text-center">{persona.recipeDescription}</p>
        <div className="flex flex-wrap justify-center gap-2">
          {persona.recipeTags.map((tag) => (
            <span key={tag} className="px-3 py-1 rounded-full bg-white/50 text-xs sm:text-sm font-semibold text-navy border border-navy/10 shadow-sm">{tag}</span>
          ))}
        </div>
      </div>

      {/* Sweet message */}
      <div className="relative px-6 sm:px-8 py-6 sm:py-8 text-center">
        <div className="w-12 h-px bg-navy/20 mx-auto mb-4 sm:mb-5" />
        <p className="font-display text-lg sm:text-xl italic text-text-dark leading-relaxed">&ldquo;{persona.sweetMessage}&rdquo;</p>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-navy/30 via-navy to-navy/30" />
    </div>
  );
});

ResultCard.displayName = "ResultCard";
export default ResultCard;
