require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const app = express();

app.use(cors({
  origin: ["http://localhost:5173", "http://localhost:5174", "http://localhost:5175"],
  credentials: true
}));


app.use(express.json());
app.get("/", (req, res) => {
  res.json({ ok: true, message: "Jobify API is running ✅" });
});

app.get("/api/health", (req, res) => {
  res.json({ ok: true, message: "Health check ✅" });
});


const PORT = process.env.PORT || 5000;

// Mongo ulanish
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB connected");

    const server = app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });

    server.on("error", (err) => {
      if (err.code === "EADDRINUSE") {
        console.log(`Port ${PORT} band. Boshqa port ishlatyapman...`);
        app.listen(5001, () => {
          console.log("Server running on port 5001");
        });
      }
    });

  })
  .catch((err) => {
    console.error("Mongo error:", err.message);
  });
