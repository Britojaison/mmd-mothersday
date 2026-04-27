"use client";

import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { questions, type Dimension } from "@/lib/data";
import { Button } from "@/components/ui/button";
import { Progress, ProgressLabel, ProgressValue } from "@/components/ui/progress";

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
  const progress = ((currentQuestion + 1) / questions.length) * 100;
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
    if (currentQuestion === 0) {
      onBack();
      return;
    }
    setDirection(-1);
    const prevQ = currentQuestion - 1;
    setCurrentQuestion(prevQ);
    setSelected(answers[prevQ] ?? null);
  }, [currentQuestion, answers, onBack]);

  const slideVariants = {
    enter: (dir: number) => ({ x: dir > 0 ? 40 : -40, opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (dir: number) => ({ x: dir > 0 ? -40 : 40, opacity: 0 }),
  };

  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="min-h-screen flex flex-col px-6 py-8 max-w-2xl mx-auto"
    >
      {/* Header */}
      <div className="mb-8">
        <div className="flex justify-center mb-6">
          <Image src="/images/logo.png" alt="Milky Mist" width={100} height={40} className="object-contain" />
        </div>

        <Progress value={progress} className="gap-2" aria-label={`Question ${currentQuestion + 1} of ${questions.length}`}>
          <ProgressLabel className="text-sm text-text-mid font-medium">
            Question {currentQuestion + 1} of {questions.length}
          </ProgressLabel>
          <ProgressValue className="text-sm text-text-muted" />
        </Progress>
      </div>

      {/* Question */}
      <div className="flex-1 flex flex-col justify-center">
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={currentQuestion}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="space-y-8"
          >
            <div className="text-center space-y-2">
              <h2 className="font-display text-2xl sm:text-3xl font-medium text-text-dark leading-snug">
                {question.question}
              </h2>
              <p className="text-base text-text-muted font-light">{question.subText}</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3" role="radiogroup" aria-label={question.question}>
              {question.options.map((option) => {
                const isSelected = selected === option.scores;
                return (
                  <button
                    key={option.label}
                    onClick={() => handleSelect(option.scores)}
                    role="radio"
                    aria-checked={isSelected}
                    className={`
                      group relative text-left p-5 rounded-2xl border transition-all duration-150 cursor-pointer
                      ${isSelected
                        ? "border-mm-primary bg-tint shadow-sm"
                        : "border-border-brand bg-mm-card hover:border-mm-primary/40 hover:-translate-y-0.5 hover:shadow-sm"
                      }
                      focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-mm-primary
                    `}
                  >
                    <div className="flex items-start gap-3">
                      <div
                        className={`
                          mt-0.5 w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-colors duration-150
                          ${isSelected ? "border-mm-primary bg-mm-primary" : "border-border-brand"}
                        `}
                      >
                        {isSelected && (
                          <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                          </svg>
                        )}
                      </div>
                      <div>
                        <p className="font-medium text-base text-text-dark">{option.label}</p>
                        <p className="text-sm text-text-muted font-light mt-0.5">{option.subDescription}</p>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Navigation */}
      <div className="flex justify-between items-center pt-8 mt-auto">
        <Button variant="ghost" onClick={handlePrev} className="text-text-mid hover:text-text-dark">
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
          Back
        </Button>

        <Button
          onClick={handleNext}
          disabled={!selected}
          className={`
            rounded-full px-6 h-10 font-medium text-sm transition-all duration-200
            ${selected
              ? "bg-mm-primary text-white hover:bg-mm-primary-dark"
              : "bg-border-brand/50 text-text-muted"
            }
          `}
        >
          {isLastQuestion ? "See result" : "Next"}
          {!isLastQuestion && (
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          )}
          {isLastQuestion && (
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 3l14 9-14 9V3z" />
            </svg>
          )}
        </Button>
      </div>
    </motion.section>
  );
}
