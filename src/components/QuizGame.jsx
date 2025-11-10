import React, { useState, useEffect } from "react";
import questions from "../data/questions.js";

export default function QuizGame({ onFinish, onWrong, onCorrect, level }) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [shuffledQuestions, setShuffledQuestions] = useState([]);
  const [score, setScore] = useState(0);

  // acak pertanyaan setiap mulai level baru
  useEffect(() => {
    const shuffled = [...questions[`level${level}`]].sort(() => Math.random() - 0.5);
    setShuffledQuestions(shuffled);
    setCurrentQuestionIndex(0);
    setScore(0);
  }, [level]);

  const handleAnswer = (index) => {
    const current = shuffledQuestions[currentQuestionIndex];

    if (index === current.answer) {
      onCorrect?.();
      setScore(score + 1);

      if (currentQuestionIndex + 1 < shuffledQuestions.length) {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
      } else {
        // ✅ Jika semua benar, kirim skor ke App
        onFinish(score + 1);
      }
    } else {
      // ❌ Jika ada jawaban salah, langsung reset ke level 1
      onWrong?.();
      alert("Jawaban salah! Kembali ke level 1.");
      onFinish(0); // skor nol menandakan gagal
    }
  };

  if (shuffledQuestions.length === 0) return null;
  const q = shuffledQuestions[currentQuestionIndex];

  return (
    <div className="w-full text-center text-white">
      <h2 className="text-lg font-bold mb-4">
        Level {level} — Pertanyaan {currentQuestionIndex + 1} / {shuffledQuestions.length}
      </h2>
      <p className="mb-6 text-base">{q.question}</p>

      <div className="grid grid-cols-1 gap-3">
        {q.options.map((opt, i) => (
          <button
            key={i}
            onClick={() => handleAnswer(i)}
            className="px-4 py-2 rounded-lg bg-slate-800 hover:bg-indigo-600 transition"
          >
            {opt}
          </button>
        ))}
      </div>
    </div>
  );
}
