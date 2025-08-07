// routes/lesson.js
const express = require("express");
const multer = require("multer");
const pdfParse = require("pdf-parse");
const textract = require("textract");
const fs = require("fs");
const path = require("path");
const { createCanvas } = require("canvas");
const Tesseract = require("tesseract.js");
const sharp = require("sharp");
const pdfjsLib = require("pdfjs-dist/legacy/build/pdf.js");

const router = express.Router();

// Polyfill DOMMatrix for Node.js (needed by pdfjs)
if (typeof global.DOMMatrix === "undefined") {
  global.DOMMatrix = class DOMMatrix {
    constructor() {
      this.a = 1; this.b = 0;
      this.c = 0; this.d = 1;
      this.e = 0; this.f = 0;
    }
  };
}

// Multer upload folder
const upload = multer({ dest: "uploads/" });

// Upload and extract lesson file
router.post("/upload", upload.single("lessonFile"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    const filePath = req.file.path;
    const ext = path.extname(req.file.originalname).toLowerCase();
    let rawText = "";

    if (ext === ".pdf") {
      const buffer = fs.readFileSync(filePath);
      const parsed = await pdfParse(buffer);

      if (parsed.text.trim()) {
        rawText = parsed.text;
      } else {
        console.log("📷 Switching to OCR mode (image-based PDF)");
        rawText = await extractPdfWithOcr(filePath);
      }
    } else if (ext === ".docx" || ext === ".doc") {
      rawText = await new Promise((resolve, reject) => {
        textract.fromFileWithPath(filePath, (err, text) => {
          if (err) reject(err);
          else resolve(text);
        });
      });
    } else {
      return res.status(400).json({ message: "Unsupported file type" });
    }

    fs.unlinkSync(filePath); // cleanup uploaded file
    console.log("✅ OCR rawText:\n" + JSON.stringify(rawText));
    res.json({ rawText });

  } catch (error) {
    console.error("❌ Error extracting lesson file:", error);
    res.status(500).json({ message: "File processing failed", error: error.message });
  }
});

/**
 * Enhance OCR result with cleaning logic
 */
function cleanOcrText(text) {
  return text
    .replace(/\n{2,}/g, "\n")                     // Collapse multiple newlines
    .replace(/[^\x00-\x7F]+/g, " ")               // Remove non-ASCII
    .replace(/([a-z])([A-Z])/g, "$1 $2")          // Add space between camelCase
    .replace(/([a-z])(\d)/gi, "$1 $2")            // Add space between text & numbers
    .replace(/([a-z]{2,})([A-Z]{2,})/g, "$1 $2")  // Add space before ALLCAPS
    .replace(/[,;:]+/g, ", ")                     // Normalize punctuation
    .replace(/\s{2,}/g, " ")                      // Collapse extra spaces
    .replace(/j{3,}/gi, "")                       // Remove OCR noise like jjjj
    .trim();
}

/**
 * Extracts text from image-based PDFs using OCR
 */
async function extractPdfWithOcr(filePath) {
  const data = new Uint8Array(fs.readFileSync(filePath));
  const pdfDoc = await pdfjsLib.getDocument({ data }).promise;
  let fullText = "";

  for (let pageNum = 1; pageNum <= pdfDoc.numPages; pageNum++) {
    const page = await pdfDoc.getPage(pageNum);
    const viewport = page.getViewport({ scale: 5.0 });
    const canvas = createCanvas(viewport.width, viewport.height);
    const ctx = canvas.getContext("2d");

    await page.render({ canvasContext: ctx, viewport }).promise;

    const rawImageBuffer = canvas.toBuffer("image/png");
    const processedBuffer = await sharp(rawImageBuffer)
      .grayscale()
      .threshold(150)
      .toBuffer();

    const { data: { text } } = await Tesseract.recognize(processedBuffer, "eng+fil", {
      logger: (m) => console.log(m.status, m.progress),
    });

    const cleanText = cleanOcrText(text);
    fullText += `\n--- Page ${pageNum} ---\n` + cleanText + "\n";
  }

  return fullText;
}

module.exports = router;
