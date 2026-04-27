import type { Metadata } from "next";
import { personas } from "@/lib/data";
import SharedResultClient from "./shared-result-client";

type Props = {
  params: Promise<{ personaId: string }>;
};

export async function generateStaticParams() {
  return Object.keys(personas).map((id) => ({ personaId: id }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { personaId } = await params;
  const persona = personas[personaId];

  if (!persona) {
    return {
      title: "Milky Mist — Mother's Day 2025",
    };
  }

  return {
    title: `My mom is ${persona.name} — Milky Mist Mother's Day`,
    description: persona.tagline,
    openGraph: {
      title: `My mom is ${persona.name} — Milky Mist Mother's Day`,
      description: persona.tagline,
      url: `https://milkymist.in/mom/${persona.id}`,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: `My mom is ${persona.name} — Milky Mist Mother's Day`,
      description: persona.tagline,
    },
  };
}

export default async function SharedResultPage({ params }: Props) {
  const { personaId } = await params;
  const persona = personas[personaId];

  if (!persona) {
    return (
      <div className="min-h-screen flex items-center justify-center px-6">
        <div className="text-center space-y-4">
          <h1 className="font-display text-2xl text-text-dark">Result not found</h1>
          <p className="text-text-mid">This personality link may be invalid.</p>
          <a
            href="/"
            className="inline-block px-6 py-3 bg-primary text-white rounded-full font-medium text-sm hover:bg-primary-dark transition-colors"
          >
            Take the quiz
          </a>
        </div>
      </div>
    );
  }

  return <SharedResultClient persona={persona} />;
}
