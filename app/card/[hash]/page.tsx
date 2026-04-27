import type { Metadata } from "next";
import { personas } from "@/lib/data";
import { decodeCardData } from "@/lib/card-encoding";
import GreetingCardClient from "./greeting-card-client";

type Props = {
  params: Promise<{ hash: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { hash } = await params;
  const data = decodeCardData(hash);

  if (!data || !personas[data.personaId]) {
    return {
      title: "Milky Mist — Mother's Day 2025",
    };
  }

  const persona = personas[data.personaId];

  return {
    title: `Happy Mother's Day, ${data.momName}! — Milky Mist`,
    description: `${data.momName} is "${persona.name}" — ${persona.tagline}`,
    openGraph: {
      title: `Happy Mother's Day, ${data.momName}!`,
      description: `${data.momName} is "${persona.name}" — ${persona.tagline}`,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: `Happy Mother's Day, ${data.momName}!`,
      description: `${data.momName} is "${persona.name}" — ${persona.tagline}`,
    },
  };
}

export default async function GreetingCardPage({ params }: Props) {
  const { hash } = await params;
  const data = decodeCardData(hash);

  if (!data || !personas[data.personaId]) {
    return (
      <div className="min-h-screen flex items-center justify-center px-6">
        <div className="text-center space-y-4">
          <h1 className="font-display text-2xl text-text-dark">Card not found</h1>
          <p className="text-text-mid">This greeting card link may be invalid.</p>
          <a
            href="/"
            className="inline-block px-6 py-3 bg-primary text-white rounded-full font-medium text-sm hover:bg-primary-dark transition-colors"
          >
            Create your own card
          </a>
        </div>
      </div>
    );
  }

  const persona = personas[data.personaId];

  return <GreetingCardClient persona={persona} momName={data.momName} />;
}
