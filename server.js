const express = require("express");
const multer = require("multer");
const path = require("path");
const fs = require("fs");

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(express.static("."));

// Months list
const MONTHS = [
  "januari",
  "februari",
  "maret",
  "april",
  "mei",
  "juni",
  "juli",
  "agustus",
  "september",
  "oktober",
  "november",
  "desember",
];

// Ensure image directories exist
MONTHS.forEach((month) => {
  const dir = path.join(__dirname, "images", month);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
});

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const month = req.body.month || "januari";
    const dir = path.join(__dirname, "images", month);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    cb(null, dir);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  },
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB limit
  fileFilter: (req, file, cb) => {
    const allowedTypes = /jpeg|jpg|png|gif|webp/;
    const extname = allowedTypes.test(
      path.extname(file.originalname).toLowerCase()
    );
    const mimetype = allowedTypes.test(file.mimetype);

    if (extname && mimetype) {
      return cb(null, true);
    }
    cb(new Error("Only image files are allowed!"));
  },
});

// API: Get all images
app.get("/api/images", (req, res) => {
  const result = {};

  MONTHS.forEach((month) => {
    const dir = path.join(__dirname, "images", month);
    if (fs.existsSync(dir)) {
      const files = fs
        .readdirSync(dir)
        .filter((file) => /\.(jpg|jpeg|png|gif|webp)$/i.test(file))
        .map((file) => `images/${month}/${file}`);
      result[month] = files;
    } else {
      result[month] = [];
    }
  });

  res.json(result);
});

// API: Get images for specific month
app.get("/api/images/:month", (req, res) => {
  const month = req.params.month.toLowerCase();

  if (!MONTHS.includes(month)) {
    return res.status(400).json({ error: "Invalid month" });
  }

  const dir = path.join(__dirname, "images", month);

  if (!fs.existsSync(dir)) {
    return res.json([]);
  }

  const files = fs
    .readdirSync(dir)
    .filter((file) => /\.(jpg|jpeg|png|gif|webp)$/i.test(file))
    .map((file) => `images/${month}/${file}`);

  res.json(files);
});

// API: Get music list
app.get("/api/music", (req, res) => {
  const musicDir = path.join(__dirname, "music");
  if (!fs.existsSync(musicDir)) {
    return res.json([]);
  }

  const files = fs
    .readdirSync(musicDir)
    .filter((file) => /\.(mp3|wav|ogg)$/i.test(file))
    .map((file) => ({
      name: file,
      path: `music/${file}`,
    }));

  res.json(files);
});

// API: Upload images
app.post("/api/upload", upload.array("images", 20), (req, res) => {
  if (!req.files || req.files.length === 0) {
    return res.status(400).json({ error: "No files uploaded" });
  }

  const uploadedFiles = req.files.map((file) => ({
    filename: file.filename,
    path: `images/${req.body.month}/${file.filename}`,
    size: file.size,
  }));

  res.json({
    success: true,
    message: `${req.files.length} files uploaded successfully`,
    files: uploadedFiles,
  });
});

// Configure multer for music uploads
const musicStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    const dir = path.join(__dirname, "music");
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    cb(null, dir);
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const uploadMusic = multer({
  storage: musicStorage,
  fileFilter: (req, file, cb) => {
    if (/\.(mp3|wav|ogg)$/i.test(file.originalname)) {
      return cb(null, true);
    }
    cb(new Error("Only audio files are allowed!"));
  },
});

// API: Upload music
app.post("/api/upload-music", uploadMusic.single("music"), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: "No file uploaded" });
  }
  res.json({
    success: true,
    message: "Music uploaded successfully",
    file: {
      name: req.file.originalname,
      path: `music/${req.file.filename}`,
    },
  });
});

// API: Delete image
app.post("/api/delete", (req, res) => {
  const { path: filePath } = req.body;

  if (!filePath) {
    return res.status(400).json({ error: "No file path provided" });
  }

  const fullPath = path.join(__dirname, filePath);

  // Security check - make sure path is within images directory
  if (!fullPath.startsWith(path.join(__dirname, "images"))) {
    return res.status(403).json({ error: "Access denied" });
  }

  if (!fs.existsSync(fullPath)) {
    return res.status(404).json({ error: "File not found" });
  }

  try {
    fs.unlinkSync(fullPath);
    res.json({ success: true, message: "File deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete file" });
  }
});

// API: Delete music
app.post("/api/delete-music", (req, res) => {
  const { path: filePath } = req.body;

  if (!filePath) {
    return res.status(400).json({ error: "No file path provided" });
  }

  const fullPath = path.join(__dirname, filePath);

  // Security check - make sure path is within music directory
  if (!fullPath.startsWith(path.join(__dirname, "music"))) {
    return res.status(403).json({ error: "Access denied" });
  }

  if (!fs.existsSync(fullPath)) {
    return res.status(404).json({ error: "File not found" });
  }

  try {
    fs.unlinkSync(fullPath);
    res.json({ success: true, message: "Music deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete music" });
  }
});

// API: Login (simple validation)
app.post("/api/login", (req, res) => {
  const { username, password } = req.body;

  // Hardcoded credentials
  const VALID_USERNAME = "Douzxy";
  const VALID_PASSWORD = "galerihistory123";

  if (username === VALID_USERNAME && password === VALID_PASSWORD) {
    res.json({ success: true, message: "Login successful" });
  } else {
    res.status(401).json({ error: "Invalid credentials" });
  }
});

// Serve index.html for root
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

// Serve login.html
app.get("/login", (req, res) => {
  res.sendFile(path.join(__dirname, "login.html"));
});

// Serve dashboard.html
app.get("/dashboard", (req, res) => {
  res.sendFile(path.join(__dirname, "dashboard.html"));
});

// Start server
app.listen(PORT, () => {
  console.log(`
╔════════════════════════════════════════════════════════════╗
║                                                            ║
║   🖼️  Gallery History Server                              ║
║                                                            ║
║   Server running at: http://localhost:${PORT}               ║
║                                                            ║
║   Routes:                                                  ║
║   • Gallery:    http://localhost:${PORT}/                   ║
║   • Login:      http://localhost:${PORT}/login              ║
║   • Dashboard:  http://localhost:${PORT}/dashboard          ║
║                                                            ║
║   Credentials:                                             ║
║   • Username: Douzxy                                       ║
║   • Password: galerihistory123                             ║
║                                                            ║
╚════════════════════════════════════════════════════════════╝
    `);
});
