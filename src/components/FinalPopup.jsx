import React, { useEffect } from "react";
import confetti from "canvas-confetti";

export default function FinalPopup({ restart }) {
  // Efek confetti + suara kemenangan
  useEffect(() => {
    // Confetti animasi
    confetti({
      particleCount: 200,
      spread: 120,
      origin: { y: 0.6 },
    });

    // Mainkan suara kemenangan
    const sound = new Audio("/sounds/victory.mp3");
    sound.volume = 0.6;
    sound.play();
  }, []);

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/70 z-50">
      <div className="w-96 bg-gradient-to-br from-[#16213E] to-[#0F3460] p-6 rounded-2xl shadow-2xl text-center animate-popIn border border-cyan-400/40">
        <h1 className="text-4xl font-extrabold text-yellow-400 mb-3 animate-bounce">
          🎉 Selamat!
        </h1>
        <p className="text-white text-lg mb-5">
          Kamu telah menamatkan{" "}
          <span className="text-blue-300 font-semibold">
            Quiz Muhammadiyah
          </span>{" "}
          dengan hasil yang luar biasa!
        </p>
        <button
          onClick={restart}
          className="px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-700 text-white font-bold rounded-full hover:scale-105 transition-transform"
        >
          Kembali ke Menu
        </button>
      </div>
    </div>
  );
}
