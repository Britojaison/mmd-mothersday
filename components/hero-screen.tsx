"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const products = ["Paneer", "Ghee", "Milk", "Curd", "Yogurt"];

interface HeroScreenProps {
  onStart: (momName: string) => void;
}

export default function HeroScreen({ onStart }: HeroScreenProps) {
  const [name, setName] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim()) {
      onStart(name.trim());
    }
  };

  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="min-h-screen flex flex-col items-center justify-center px-6 py-16 text-center"
    >
      <div className="max-w-2xl mx-auto flex flex-col items-center gap-8">
        {/* Brand Logo */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="flex flex-col items-center gap-3"
        >
          <Image
            src="/images/logo.png"
            alt="Milky Mist"
            width={140}
            height={56}
            className="object-contain"
            priority
          />
          <div className="w-12 h-px bg-border-brand" />
        </motion.div>

        {/* Headline */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="space-y-4"
        >
          <h1 className="font-display text-4xl sm:text-5xl md:text-6xl font-medium text-text-dark leading-tight">
            What kind of{" "}
            <span className="italic text-mm-primary">supermom</span>{" "}
            is yours?
          </h1>
          <p className="text-lg sm:text-xl text-text-mid font-light max-w-md mx-auto leading-relaxed">
            Discover her Milky Mist personality — a celebration of every kind of mother.
          </p>
        </motion.div>

        {/* Product Chips */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="flex flex-wrap justify-center gap-3"
        >
          {products.map((product, index) => (
            <motion.span
              key={product}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.5 + index * 0.05 }}
              className="px-5 py-2 rounded-full border border-border-brand text-sm font-medium text-text-mid bg-mm-card"
            >
              {product}
            </motion.span>
          ))}
        </motion.div>

        {/* Name Input + CTA */}
        <motion.form
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.7 }}
          onSubmit={handleSubmit}
          className="w-full max-w-sm space-y-4"
        >
          <div className="space-y-2">
            <Label htmlFor="mom-name" className="text-sm text-text-mid font-medium justify-center">
              What do you call her?
            </Label>
            <Input
              id="mom-name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Amma, Mom, Maa..."
              maxLength={30}
              className="h-14 text-center text-lg font-display text-text-dark
                         bg-mm-card border-border-brand rounded-2xl
                         placeholder:text-text-muted/50 placeholder:font-body placeholder:text-base placeholder:font-light
                         focus-visible:border-mm-primary focus-visible:ring-mm-primary/20"
            />
          </div>

          <Button
            type="submit"
            disabled={!name.trim()}
            className={`
              w-full h-14 rounded-full text-base font-medium transition-all duration-200
              ${name.trim()
                ? "bg-mm-primary text-white hover:bg-mm-primary-dark"
                : "bg-border-brand/50 text-text-muted"
              }
            `}
          >
            <span className="flex items-center gap-2">
              Find out now
              <svg
                className="w-4 h-4 transition-transform duration-200 group-hover/button:translate-x-0.5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </span>
          </Button>
        </motion.form>

        {/* Subtle footer */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.9 }}
          className="text-xs text-text-muted mt-4"
        >
          Mother&apos;s Day 2025
        </motion.p>
      </div>
    </motion.section>
  );
}
