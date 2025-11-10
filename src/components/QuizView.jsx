import React, { useState } from "react";

export default function QuizView({ questions, onFinish, onCorrect, onWrong }) {
  const [index, setIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [picked, setPicked] = useState(null);

  const current = questions[index];

  const pickAnswer = (i) => {
    if (picked !== null) return;
    setPicked(i);

    const isCorrect = i === current.answer;

    if (isCorrect) {
      setScore((s) => s + 1);
      onCorrect && onCorrect();

      setTimeout(() => {
        if (index + 1 === questions.length) {
          onFinish(score + 1);
        } else {
          setIndex((idx) => idx + 1);
          setPicked(null);
        }
      }, 600);
    } else {
      onWrong && onWrong();

      // kirim event gagal agar App menampilkan popup kalah
      setTimeout(() => {
        window.dispatchEvent(new CustomEvent("quiz_failed"));
      }, 500);
    }
  };

  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-4">
        <div className="text-slate-200 text-sm">
          Soal {index + 1} / {questions.length}
        </div>
        <div className="text-slate-400 text-sm">Skor {score}</div>
      </div>

      <div className="bg-[#061a2a] p-4 rounded-xl neon-border mb-4">
        <h3 className="text-lg text-white font-semibold neon-text">
          {current.question}
        </h3>
      </div>

      <div className="space-y-3">
        {current.options.map((opt, idx) => {
          const isPicked = picked === idx;
          const correct = current.answer === idx;
          const base =
            "w-full text-left p-3 rounded-lg font-medium transition-shadow flex justify-between items-center";
          const normal = "bg-slate-800 text-white hover:scale-102";
          const pickedCorrect =
            "bg-emerald-600 text-white shadow-[0_8px_30px_rgba(16,185,129,0.12)]";
          const pickedWrong =
            "bg-rose-600 text-white shadow-[0_8px_30px_rgba(239,68,68,0.12)]";

          let cls = `${base} ${normal}`;
          if (picked !== null) {
            if (isPicked && correct) cls = `${base} ${pickedCorrect}`;
            else if (isPicked && !correct) cls = `${base} ${pickedWrong}`;
            else cls = `${base} bg-slate-700 text-slate-300 opacity-90`;
          } else {
            cls = `${base} ${normal} hover:scale-105`;
          }

          return (
            <button
              key={idx}
              className={cls}
              onClick={() => pickAnswer(idx)}
              disabled={picked !== null}
            >
              <span>
                {String.fromCharCode(65 + idx)}. {opt}
              </span>
              <span className="text-xs text-slate-300">
                {isPicked ? (correct ? "Benar" : "Salah") : ""}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
