import React from "react";

export default function LoadingScreen() {
  return (
    <div className="flex flex-col items-center gap-4">
      <div className="w-20 h-20 rounded-full border-4 border-t-transparent border-neonBlue animate-spin" />
      <div className="text-slate-200 text-lg neon-text font-semibold">Preparing quiz...</div>
      <div className="text-slate-400 text-sm">Memuat pertanyaan & konfigurasi</div>
    </div>
  );
}
