"use client";

import { forwardRef } from "react";
import type { Persona } from "@/lib/data";
import { FloralSmallAccent, FloralDivider } from "@/components/florals";

interface ResultCardProps {
  persona: Persona;
  momName?: string;
}

const ResultCard = forwardRef<HTMLDivElement, ResultCardProps>(({ persona, momName }, ref) => {
  const displayName = momName || "Mom";

  return (
    <div
      ref={ref}
      className="relative rounded-3xl overflow-hidden shadow-xl border border-mm-border/40"
      aria-label={`Result card: ${displayName} is ${persona.name}. ${persona.tagline}`}
    >
      {/* Corner florals */}
      <FloralSmallAccent className="absolute top-2 right-2 w-24 sm:w-28 opacity-50 pointer-events-none z-10" />
      <FloralSmallAccent className="absolute bottom-2 left-2 w-24 sm:w-28 opacity-40 pointer-events-none rotate-180 z-10" />

      {/* Gradient header section */}
      <div className="relative bg-gradient-to-b from-light-gray via-white to-white px-8 pt-10 pb-8 text-center">
        {/* Decorative top band */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-navy/40 via-navy to-navy/40" />

        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/images/logo.png" alt="Milky Mist" width={90} height={36} className="mx-auto mb-6 object-contain" />

        <p className="text-[10px] font-semibold tracking-[0.25em] uppercase text-navy/70 mb-2">
          Happy Mother&apos;s Day
        </p>
        <p className="font-display text-3xl sm:text-4xl italic text-navy mb-3 leading-tight">
          {displayName}
        </p>

        <FloralDivider className="w-52 mx-auto my-4" />

        <p className="text-[10px] font-semibold tracking-[0.2em] uppercase text-text-muted mb-2">You are</p>
        <h2 className="font-display text-2xl sm:text-3xl font-medium text-text-dark mb-3">{persona.name}</h2>
        <p className="text-sm text-text-mid font-light leading-relaxed max-w-sm mx-auto">{persona.tagline}</p>
      </div>

      {/* Products section */}
      <div className="px-8 py-6 bg-white border-t border-mm-border/30">
        <p className="text-[10px] font-semibold tracking-[0.2em] uppercase text-text-muted mb-4 text-center">
          Her Milky Mist Staples
        </p>
        <div className="flex flex-wrap justify-center gap-2">
          {persona.products.map((product) => (
            <span key={product.name} className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full border border-mm-border/60 bg-off-white/80 text-sm shadow-sm">
              <span className="font-semibold text-text-dark">{product.name}</span>
              <span className="text-text-muted/60">&middot;</span>
              <span className="text-text-muted font-light text-xs">{product.reason}</span>
            </span>
          ))}
        </div>
      </div>

      {/* Recipe section */}
      <div className="mx-6 my-4 rounded-2xl bg-gradient-to-br from-light-gray to-off-white/60 p-6 border border-mm-border/30">
        <p className="text-[10px] font-semibold tracking-[0.2em] uppercase text-text-muted mb-2 text-center">
          A Recipe for {displayName}
        </p>
        <h3 className="font-display text-lg sm:text-xl font-medium text-text-dark mb-2 text-center">{persona.recipe}</h3>
        <p className="text-sm text-text-mid font-light leading-relaxed mb-4 text-center">{persona.recipeDescription}</p>
        <div className="flex flex-wrap justify-center gap-2">
          {persona.recipeTags.map((tag) => (
            <span key={tag} className="px-3 py-1 rounded-full bg-white/80 text-[11px] font-semibold text-navy border border-navy/15 shadow-sm">
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* Sweet message section */}
      <div className="relative px-8 py-8 bg-gradient-to-t from-light-gray to-white text-center">
        <FloralDivider className="w-44 mx-auto mb-5 opacity-60" />
        <p className="font-display text-lg sm:text-xl italic text-text-dark leading-relaxed">
          &ldquo;{persona.sweetMessage}&rdquo;
        </p>
        {/* Bottom band */}
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-navy/40 via-navy to-navy/40" />
      </div>
    </div>
  );
});

ResultCard.displayName = "ResultCard";
export default ResultCard;
