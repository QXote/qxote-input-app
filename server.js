// server.js
import express from "express";
import multer from "multer";
import cors from "cors";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";
import { dirname } from "path";

// Fix voor __dirname in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
app.use(cors());

const uploadsDir = path.join(__dirname, "uploads");
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir);
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadsDir);
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    const filename = req.body.filename + ext;
    cb(null, filename);
  },
});

const upload = multer({ storage });

app.post("/upload", upload.single("image"), (req, res) => {
  res.send("Afbeelding succesvol geüpload!");
});

app.listen(3001, () => {
  console.log("✅ Server draait op http://localhost:3001");
});
