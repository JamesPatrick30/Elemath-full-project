const express = require("express");
const multer = require("multer");
const pdfParse = require("pdf-parse");
const textract = require("textract");
const fs = require("fs");
const path = require("path");

const router = express.Router();

// Configure Multer upload folder
const upload = multer({ dest: "uploads/" });

// Upload and extract lesson file
router.post("/upload", upload.single("lessonFile"), async (req, res) => {
  try {
    const filePath = req.file.path;
    const ext = path.extname(req.file.originalname).toLowerCase();

    let rawText = "";

    if (ext === ".pdf") {
      const dataBuffer = fs.readFileSync(filePath);
      const pdfData = await pdfParse(dataBuffer);
      rawText = pdfData.text;
    } else if (ext === ".docx" || ext === ".doc") {
      rawText = await new Promise((resolve, reject) => {
        textract.fromFileWithPath(filePath, (error, text) => {
          if (error) reject(error);
          else resolve(text);
        });
      });
    } else {
      return res.status(400).json({ message: "Unsupported file type" });
    }

    // Cleanup temp file
    fs.unlinkSync(filePath);

    // Send raw text back
    res.json({ rawText });

  } catch (error) {
    console.error("❌ Error extracting lesson file:", error);
    res.status(500).json({ message: "File processing failed" });
  }
});

module.exports = router;
