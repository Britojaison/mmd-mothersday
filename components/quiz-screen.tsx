"use client";

import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { questions, type Dimension } from "@/lib/data";
import { Button } from "@/components/ui/button";
import { FloralTopRight, FloralBottomLeft } from "@/components/florals";

interface QuizScreenProps {
  initialAnswers: (Dimension | null)[];
  onComplete: (answers: Dimension[]) => void;
  onBack: () => void;
}

export default function QuizScreen({ initialAnswers, onComplete, onBack }: QuizScreenProps) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<(Dimension | null)[]>([...initialAnswers]);
  const [selected, setSelected] = useState<Dimension | null>(initialAnswers[0] ?? null);
  const [direction, setDirection] = useState(1);

  const question = questions[currentQuestion];
  const isLastQuestion = currentQuestion === questions.length - 1;

  const handleSelect = useCallback((dimension: Dimension) => {
    setSelected(dimension);
    const newAnswers = [...answers];
    newAnswers[currentQuestion] = dimension;
    setAnswers(newAnswers);
  }, [answers, currentQuestion]);

  const handleNext = useCallback(() => {
    if (!selected) return;
    if (isLastQuestion) {
      const finalAnswers = [...answers];
      finalAnswers[currentQuestion] = selected;
      onComplete(finalAnswers.filter((a): a is Dimension => a !== null));
    } else {
      setDirection(1);
      const nextQ = currentQuestion + 1;
      setCurrentQuestion(nextQ);
      setSelected(answers[nextQ] ?? null);
    }
  }, [selected, isLastQuestion, answers, currentQuestion, onComplete]);

  const handlePrev = useCallback(() => {
    if (currentQuestion === 0) { onBack(); return; }
    setDirection(-1);
    const prevQ = currentQuestion - 1;
    setCurrentQuestion(prevQ);
    setSelected(answers[prevQ] ?? null);
  }, [currentQuestion, answers, onBack]);

  const slideVariants = {
    enter: (dir: number) => ({ x: dir > 0 ? 50 : -50, opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (dir: number) => ({ x: dir > 0 ? -50 : 50, opacity: 0 }),
  };

  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="relative min-h-screen flex flex-col px-6 py-8 overflow-hidden bg-gradient-animated noise-overlay"
    >
      <FloralTopRight className="absolute -top-8 -right-12 w-44 sm:w-56 opacity-40 pointer-events-none" />
      <FloralBottomLeft className="absolute -bottom-8 -left-12 w-44 sm:w-56 opacity-40 pointer-events-none" />

      <div className="relative z-10 flex flex-col flex-1 max-w-2xl mx-auto w-full">
        {/* Header */}
        <div className="mb-6">
          <div className="flex justify-center mb-5">
            <Image src="/images/logo.png" alt="Milky Mist" width={90} height={36} className="object-contain" />
          </div>

          {/* Step dots */}
          <div className="flex items-center justify-center gap-2 mb-3">
            {questions.map((_, i) => (
              <div
                key={i}
                className={`
                  step-dot w-2.5 h-2.5 rounded-full border border-mm-border
                  ${i === currentQuestion ? "active" : i < currentQuestion ? "completed" : "bg-off-white"}
                `}
              />
            ))}
          </div>
          <p className="text-xs text-text-muted text-center">
            {currentQuestion + 1} of {questions.length}
          </p>
        </div>

        {/* Question area — glassmorphism card */}
        <div className="flex-1 flex flex-col justify-center">
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={currentQuestion}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="glass rounded-3xl border border-mm-border/50 p-6 sm:p-8 shadow-lg space-y-6"
            >
              <div className="text-center space-y-2">
                <h2 className="font-display text-xl sm:text-2xl md:text-3xl font-medium text-text-dark leading-snug">
                  {question.question}
                </h2>
                <p className="text-sm text-text-muted font-light">{question.subText}</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3" role="radiogroup" aria-label={question.question}>
                {question.options.map((option, i) => {
                  const isSelected = selected === option.scores;
                  return (
                    <motion.button
                      key={option.label}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.25, delay: i * 0.05 }}
                      onClick={() => handleSelect(option.scores)}
                      role="radio"
                      aria-checked={isSelected}
                      className={`
                        group relative text-left p-4 sm:p-5 rounded-2xl border-2 transition-all duration-200 cursor-pointer
                        ${isSelected
                          ? "border-navy bg-light-gray shadow-md scale-[1.02]"
                          : "border-transparent bg-white/80 hover:bg-white hover:shadow-sm hover:-translate-y-0.5"
                        }
                        focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-navy
                      `}
                    >
                      <div className="flex items-start gap-3">
                        <div
                          className={`
                            mt-0.5 w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-all duration-200
                            ${isSelected ? "border-navy bg-navy scale-110" : "border-mm-border"}
                          `}
                        >
                          {isSelected && (
                            <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                            </svg>
                          )}
                        </div>
                        <div>
                          <p className="font-medium text-sm sm:text-base text-text-dark">{option.label}</p>
                          <p className="text-xs sm:text-sm text-text-muted font-light mt-0.5">{option.subDescription}</p>
                        </div>
                      </div>
                    </motion.button>
                  );
                })}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Navigation */}
        <div className="flex justify-between items-center pt-6 mt-auto">
          <Button variant="ghost" onClick={handlePrev} className="text-text-mid hover:text-text-dark">
            <svg className="w-4 h-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
            Back
          </Button>

          <Button
            onClick={handleNext}
            disabled={!selected}
            className={`
              rounded-full px-8 h-11 font-semibold text-sm tracking-wide transition-all duration-300
              ${selected
                ? "btn-shimmer text-white shadow-md hover:shadow-lg hover:scale-[1.02]"
                : "bg-mm-border/40 text-text-muted"
              }
            `}
          >
            {isLastQuestion ? "See result" : "Next"}
            <svg className="w-4 h-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d={isLastQuestion ? "M5 3l14 9-14 9V3z" : "M9 5l7 7-7 7"} />
            </svg>
          </Button>
        </div>
      </div>
    </motion.section>
  );
}
