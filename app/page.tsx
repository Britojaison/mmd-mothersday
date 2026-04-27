"use client";

import { useState } from "react";
import { type Dimension, computePersona, type Persona } from "@/lib/data";
import HeroScreen from "@/components/hero-screen";
import QuizScreen from "@/components/quiz-screen";
import ResultScreen from "@/components/result-screen";

type Screen = "hero" | "quiz" | "result";

export default function Home() {
  const [screen, setScreen] = useState<Screen>("hero");
  const [answers, setAnswers] = useState<(Dimension | null)[]>([null, null, null, null, null]);
  const [result, setResult] = useState<Persona | null>(null);
  const [momName, setMomName] = useState("");

  const handleStartQuiz = (name: string) => {
    setMomName(name);
    setScreen("quiz");
  };

  const handleQuizComplete = (finalAnswers: Dimension[]) => {
    const persona = computePersona(finalAnswers);
    setResult(persona);
    setAnswers(finalAnswers);
    setScreen("result");
  };

  const handleStartOver = () => {
    setAnswers([null, null, null, null, null]);
    setResult(null);
    setMomName("");
    setScreen("hero");
  };

  return (
    <main className="min-h-screen">
      {screen === "hero" && <HeroScreen onStart={handleStartQuiz} />}
      {screen === "quiz" && (
        <QuizScreen
          initialAnswers={answers}
          onComplete={handleQuizComplete}
          onBack={() => setScreen("hero")}
        />
      )}
      {screen === "result" && result && (
        <ResultScreen persona={result} momName={momName} onStartOver={handleStartOver} />
      )}
    </main>
  );
}
