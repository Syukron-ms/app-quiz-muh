const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const bodyParser = require("body-parser");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(bodyParser.json());

// 🔹 Koneksi ke MongoDB Atlas
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ Connected to MongoDB Atlas"))
  .catch(err => console.error("❌ MongoDB connection error:", err));

// 🔹 Schema untuk hasil quiz
const resultSchema = new mongoose.Schema({
  name: String,
  origin: String,
  phone: String,
  score: Number,
  level: Number,
  timestamp: { type: Date, default: Date.now }
});

const Result = mongoose.model("Result", resultSchema);

// 🔹 Ambil semua hasil
app.get("/api/results", async (req, res) => {
  try {
    const results = await Result.find().sort({ timestamp: -1 });
    res.json(results);
  } catch (e) {
    res.status(500).json({ error: "Failed to read data" });
  }
});

// 🔹 Simpan hasil baru
app.post("/api/results", async (req, res) => {
  try {
    const entry = new Result(req.body);
    await entry.save();
    res.json({ ok: true, message: "Data saved successfully!" });
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: "Failed to save data" });
  }
});

// 🔹 Hapus semua hasil (dengan password admin)
app.delete("/api/results", async (req, res) => {
  try {
    const { password } = req.body;
    if (password !== (process.env.ADMIN_PASS || "12345"))
      return res.status(403).json({ error: "Invalid password" });

    await Result.deleteMany({});
    res.json({ ok: true, message: "All data deleted" });
  } catch (e) {
    res.status(500).json({ error: "Failed to delete" });
  }
});

// 🔹 Serve frontend (Vite build)
const dist = path.join(__dirname, "dist");
if (require("fs").existsSync(dist)) {
  app.use(express.static(dist));

  // ✅ Perbaikan di sini (dulu: "*" -> sekarang: "/*")
  app.get("/*", (req, res) => {
    res.sendFile(path.join(dist, "index.html"));
  });
}

const PORT = process.env.PORT || 4000;
app.listen(PORT, "0.0.0.0", () => {
  console.log(`✅ Server running at: http://localhost:${PORT}`);
  console.log(`🌐 Accessible in LAN at: http://YOUR-IP:${PORT}`);
});
