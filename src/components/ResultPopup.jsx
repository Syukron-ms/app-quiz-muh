import React, { useEffect } from "react";
import confetti from "canvas-confetti";

export default function ResultPopup({
  score,
  level,
  next,
  restart,
  failed = false,
  totalLevels = 3,
}) {
  // 🟥 Popup kalah
  if (failed) {
    useEffect(() => {
      const sound = new Audio("/sounds/wrong.mp3");
      sound.volume = 0.6;
      sound.play();
    }, []);

    return (
      <div className="fixed inset-0 flex items-center justify-center bg-black/60 backdrop-blur-sm z-50">
        <div className="w-80 bg-gradient-to-br from-[#2b0b0b] to-[#160b0b] p-6 rounded-2xl neon-border shadow-neon animate-popIn text-center">
          <div className="text-2xl font-extrabold text-rose-500 mb-2">
            😢 Yahh kamu salah!
          </div>
          <div className="text-slate-300 mb-4">
            Jawabanmu salah, kamu harus mulai lagi dari Level 1.
          </div>
          <button
            onClick={restart}
            className="w-full py-2 rounded-full bg-gradient-to-r from-rose-500 to-red-600 text-white font-bold shadow-lg hover:scale-105 transition-transform"
          >
            🔁 Mulai Lagi
          </button>
        </div>
      </div>
    );
  }

  // 🟢 Popup berhasil
  const passed = score >= 3;
  const isFinalLevel = level >= totalLevels;
  const title = passed
    ? isFinalLevel
      ? "🎉 Selamat!"
      : "Selamat!"
    : "Coba Lagi";
  const msg = passed
    ? isFinalLevel
      ? "Kamu telah menamatkan Quiz Muhammadiyah! 🥳"
      : "Nilai kamu bagus — lanjut ke level berikutnya."
    : "Belum mencapai skor minimal. Coba ulang level ini.";

  useEffect(() => {
    if (passed) {
      const duration = 2000;
      const end = Date.now() + duration;
      const frame = () => {
        confetti({
          particleCount: 5,
          spread: 80,
          origin: { y: 0.6 },
          colors: ["#00FFFF", "#FF00FF", "#FFD700"],
        });
        if (Date.now() < end) requestAnimationFrame(frame);
      };
      frame();
    }

    const sound = new Audio(
      passed ? "/sounds/success.mp3" : "/sounds/wrong.mp3"
    );
    sound.volume = 0.6;
    sound.play();
  }, [passed]);

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/60 backdrop-blur-sm z-50">
      <div className="w-80 bg-gradient-to-br from-[#071127] to-[#0e1220] p-6 rounded-2xl neon-border shadow-neon animate-popIn text-center">
        <div className="text-3xl font-extrabold neon-text mb-2">{title}</div>
        <div className="text-slate-300 mb-4">{msg}</div>

        <div className="flex flex-col gap-3">
          <div className="text-white font-semibold">Skor: {score} / 5</div>

          {passed ? (
            isFinalLevel ? (
              <button
                onClick={restart}
                className="py-2 rounded-full bg-gradient-to-r from-green-500 to-emerald-600 text-white font-bold shadow-lg hover:scale-105 transition-transform"
              >
                🎊 Selesai / Main Lagi
              </button>
            ) : (
              <button
                onClick={next}
                className="py-2 rounded-full bg-gradient-to-r from-neonBlue to-neonPink text-white font-bold shadow-glow-blue hover:scale-105 transition-transform"
              >
                Lanjut Level {level + 1}
              </button>
            )
          ) : (
            <button
              onClick={restart}
              className="py-2 rounded-full bg-rose-500 text-white font-bold hover:bg-rose-600 transition"
            >
              Ulangi Level
            </button>
          )}

          <button
            onClick={restart}
            className="py-2 rounded-full border border-slate-700 text-slate-200 hover:bg-slate-800 transition"
          >
            Kembali ke Menu
          </button>
        </div>
      </div>
    </div>
  );
}
