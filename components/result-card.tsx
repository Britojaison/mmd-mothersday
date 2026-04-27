"use client";

import { forwardRef } from "react";
import type { Persona } from "@/lib/data";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

interface ResultCardProps {
  persona: Persona;
  momName?: string;
}

const ResultCard = forwardRef<HTMLDivElement, ResultCardProps>(({ persona, momName }, ref) => {
  const displayName = momName || "Mom";

  return (
    <Card
      ref={ref}
      className="rounded-3xl border-border-brand overflow-hidden shadow-sm p-0"
      aria-label={`Result card: ${displayName} is ${persona.name}. ${persona.tagline}`}
    >
      {/* Logo + Header */}
      <CardHeader className="px-8 pt-8 pb-6 text-center border-b border-border-brand/50">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/images/logo.png" alt="Milky Mist" width={100} height={40} className="mx-auto mb-5 object-contain" />
        <p className="text-xs font-medium tracking-[0.15em] uppercase text-text-muted mb-1">Happy Mother&apos;s Day</p>
        <p className="font-display text-2xl sm:text-3xl italic text-mm-primary mb-4">{displayName}</p>
        <div className="w-10 h-px bg-border-brand mx-auto mb-4" />
        <p className="text-xs font-medium tracking-[0.15em] uppercase text-text-muted mb-3">You are...</p>
        <h2 className="font-display text-3xl sm:text-4xl font-medium text-text-dark mb-3">{persona.name}</h2>
        <p className="text-base text-text-mid font-light leading-relaxed max-w-sm mx-auto">{persona.tagline}</p>
      </CardHeader>

      {/* Products */}
      <CardContent className="px-8 py-6 border-b border-border-brand/50">
        <p className="text-xs font-medium tracking-[0.12em] uppercase text-text-muted mb-4">Her Milky Mist Staples</p>
        <div className="flex flex-wrap gap-2">
          {persona.products.map((product) => (
            <span key={product.name} className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full border border-border-brand bg-warm text-sm">
              <span className="font-medium text-text-dark">{product.name}</span>
              <span className="text-text-muted font-light">&middot;</span>
              <span className="text-text-muted font-light">{product.reason}</span>
            </span>
          ))}
        </div>
      </CardContent>

      {/* Recipe */}
      <CardContent className="px-8 py-6 border-b border-border-brand/50">
        <p className="text-xs font-medium tracking-[0.12em] uppercase text-text-muted mb-2">A Recipe for {displayName}</p>
        <h3 className="font-display text-xl font-medium text-text-dark mb-2">{persona.recipe}</h3>
        <p className="text-sm text-text-mid font-light leading-relaxed mb-4">{persona.recipeDescription}</p>
        <div className="flex flex-wrap gap-2">
          {persona.recipeTags.map((tag) => (
            <span key={tag} className="px-3 py-1 rounded-full bg-tint text-xs font-medium text-mm-primary">{tag}</span>
          ))}
        </div>
      </CardContent>

      {/* Sweet Message */}
      <CardContent className="px-8 py-8 bg-tint text-center">
        <p className="font-display text-lg italic text-text-dark leading-relaxed">&ldquo;{persona.sweetMessage}&rdquo;</p>
      </CardContent>
    </Card>
  );
});

ResultCard.displayName = "ResultCard";
export default ResultCard;
