import React, { useState } from "react";

export default function StartScreen({ start }) {
  const [name, setName] = useState(localStorage.getItem("quiz_user_name") || "");
  const [origin, setOrigin] = useState(localStorage.getItem("quiz_user_origin") || "");
  const [phone, setPhone] = useState(localStorage.getItem("quiz_user_phone") || "");

  const handleStart = () => {
    if (!name || !origin || !phone) {
      alert("Harap isi semua data terlebih dahulu!");
      return;
    }
    localStorage.setItem("quiz_user_name", name);
    localStorage.setItem("quiz_user_origin", origin);
    localStorage.setItem("quiz_user_phone", phone);
    start();
  };

  return (
    <div className="flex flex-col items-center gap-6 animate-popIn">
      {/* Logo Bulat */}
      <div className="w-36 h-36 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center shadow-glow-blue animate-float">
        <div className="text-white text-2xl font-bold neon-text">▶</div>
      </div>

      {/* Judul */}
      <div className="text-center animate-fade-in">
        <h1 className="text-base sm:text-lg md:text-xl font-semibold text-white neon-text leading-tight tracking-wide">
          Quiz Pimpinan Cabang Muhammadiyah Kotagede, Yogyakarta
        </h1>
        <p className="text-slate-400 mt-2">Isi data diri untuk memulai permainan</p>
      </div>

      {/* Input Form */}
      <div className="flex flex-col gap-3 w-64 text-white">
        <input
          className="p-2 rounded bg-slate-800 focus:outline-none focus:ring-2 focus:ring-purple-500"
          placeholder="Nama Lengkap"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          className="p-2 rounded bg-slate-800 focus:outline-none focus:ring-2 focus:ring-purple-500"
          placeholder="Asal"
          value={origin}
          onChange={(e) => setOrigin(e.target.value)}
        />
        <input
          className="p-2 rounded bg-slate-800 focus:outline-none focus:ring-2 focus:ring-purple-500"
          placeholder="No HP"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />
      </div>

      {/* Tombol Mulai */}
      <button
        onClick={handleStart}
        className="px-8 py-3 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 font-bold shadow-glow-blue hover:scale-105 transition-transform"
      >
        Mulai Game
      </button>
    </div>
  );
}
