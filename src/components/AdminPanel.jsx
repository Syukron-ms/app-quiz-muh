import React from "react";
import * as XLSX from "xlsx";
import jsPDF from "jspdf";
import "jspdf-autotable";

export default function AdminPanel({ open = false, onClose = () => {}, password = import.meta.env.VITE_ADMIN_PASSWORD || "admin123" }) {
  const [subs, setSubs] = React.useState([]);
  const [filter, setFilter] = React.useState("");
  const [authorized, setAuthorized] = React.useState(false);

  // ambil data saat panel dibuka
  React.useEffect(() => {
    if (!open) return;
    fetch("/api/results")
      .then((r) => r.json())
      .then((data) => setSubs(Array.isArray(data) ? data : []))
      .catch(() => {
        try {
          const local = JSON.parse(localStorage.getItem("quiz_submissions") || "[]");
          setSubs(local);
        } catch {
          setSubs([]);
        }
      });
  }, [open]);

  const filteredSubs = subs.filter(
    (s) =>
      s.name?.toLowerCase().includes(filter.toLowerCase()) ||
      s.origin?.toLowerCase().includes(filter.toLowerCase())
  );

  // export ke CSV
  const exportCSV = () => {
    const header = ["Nama", "Asal", "NoHP", "Score", "Level", "Timestamp"];
    const rows = subs.map((s) => [s.name, s.origin, s.phone, s.score, s.level, s.timestamp]);
    const csv = [header, ...rows]
      .map((r) => r.map((c) => `"${String(c || "").replace(/"/g, '""')}"`).join(","))
      .join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = "quiz_results.csv";
    a.click();
    URL.revokeObjectURL(a.href);
  };

  // export ke Excel
  const exportExcel = () => {
    const ws = XLSX.utils.json_to_sheet(subs);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Results");
    XLSX.writeFile(wb, "quiz_results.xlsx");
  };

  // export ke PDF
  const exportPDF = () => {
    const doc = new jsPDF();
    doc.text("Hasil Quiz Muhammadiyah", 14, 15);
    doc.autoTable({
      head: [["Nama", "Asal", "No HP", "Score", "Level", "Waktu"]],
      body: subs.map((s) => [s.name, s.origin, s.phone, s.score, s.level, new Date(s.timestamp).toLocaleString()]),
      startY: 20,
    });
    doc.save("quiz_results.pdf");
  };

  // hapus semua (dengan sandi)
  const clearAll = () => {
    const input = prompt("Masukkan sandi untuk menghapus semua data:");
    if (input !== password) {
      alert("Sandi salah!");
      return;
    }
    if (!confirm("Yakin ingin menghapus semua data peserta?")) return;
    fetch("/api/results", { method: "DELETE" }).catch(() => {});
    localStorage.removeItem("quiz_submissions");
    setSubs([]);
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center">
      <div className="absolute inset-0 bg-black/70" onClick={onClose} />
      <div className="relative max-w-5xl w-full bg-slate-900 rounded-2xl p-6 shadow-2xl text-white">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold">Panel Admin – Hasil Quiz</h2>
          <div className="flex gap-2">
            <button onClick={exportCSV} className="px-3 py-1 rounded bg-slate-800 border border-slate-700 text-sm">
              CSV
            </button>
            <button onClick={exportExcel} className="px-3 py-1 rounded bg-green-700/80 text-sm">
              Excel
            </button>
            <button onClick={exportPDF} className="px-3 py-1 rounded bg-blue-700/80 text-sm">
              PDF
            </button>
            <button onClick={clearAll} className="px-3 py-1 rounded bg-red-700/80 text-sm">
              Hapus Semua
            </button>
            <button onClick={onClose} className="px-3 py-1 rounded bg-slate-700 text-sm">
              Tutup
            </button>
          </div>
        </div>

        <div className="mb-3">
          <input
            type="text"
            placeholder="Cari nama atau asal..."
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="w-full p-2 rounded bg-slate-800 border border-slate-700 text-sm text-slate-200"
          />
        </div>

        <div className="max-h-[65vh] overflow-auto rounded-lg border border-slate-800">
          {filteredSubs.length === 0 ? (
            <div className="p-4 text-slate-400 text-center">Belum ada data peserta.</div>
          ) : (
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-slate-800/70 text-slate-300">
                  <th className="p-2 text-left">Nama</th>
                  <th className="p-2 text-left">Asal</th>
                  <th className="p-2 text-left">No HP</th>
                  <th className="p-2 text-left">Score</th>
                  <th className="p-2 text-left">Level</th>
                  <th className="p-2 text-left">Waktu</th>
                </tr>
              </thead>
              <tbody>
                {filteredSubs.map((s, i) => (
                  <tr key={i} className="border-t border-slate-800 hover:bg-slate-800/40">
                    <td className="p-2">{s.name}</td>
                    <td className="p-2">{s.origin}</td>
                    <td className="p-2">{s.phone}</td>
                    <td className="p-2">{s.score}</td>
                    <td className="p-2">{s.level}</td>
                    <td className="p-2">{new Date(s.timestamp).toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
}
