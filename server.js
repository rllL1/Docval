import express from 'express';
import multer from 'multer';
import cors from 'cors';
import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import pdfParse from 'pdf-parse';

dotenv.config();

const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Middleware
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type'],
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Multer storage configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadDir = path.join(__dirname, 'uploads');
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  },
});

const upload = multer({
  storage,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB limit
  fileFilter: (req, file, cb) => {
    const allowedMimes = ['application/pdf', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'application/msword'];
    if (allowedMimes.includes(file.mimetype) || file.originalname.endsWith('.pdf') || file.originalname.endsWith('.docx') || file.originalname.endsWith('.doc')) {
      cb(null, true);
    } else {
      cb(new Error('Only PDF and DOCX files are allowed'));
    }
  },
});

// Extract text from PDF
async function extractTextFromPDF(filePath) {
  try {
    const fileBuffer = fs.readFileSync(filePath);
    const data = await pdfParse(fileBuffer);
    return data.text || '';
  } catch (error) {
    console.error('Error parsing PDF:', error.message);
    return 'Error: Could not extract text from PDF';
  }
}

// Generate summary from text
function generateSummary(text) {
  if (!text || text.length === 0) {
    return ['No content to summarize'];
  }

  // Split text into sentences
  const sentences = text.match(/[^.!?]+[.!?]+/g) || [];
  
  // Extract key information (simple heuristic)
  const keyLines = sentences
    .slice(0, 5)
    .map(s => s.trim())
    .filter(s => s.length > 10);

  return keyLines.length > 0 ? keyLines : ['Document extracted successfully'];
}

// Routes

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'Server is running' });
});

// Process file and form data
app.post('/api/files/process', upload.single('file'), async (req, res) => {
  try {
    console.log('📥 Received file processing request');
    console.log('File:', req.file);
    console.log('Body:', req.body);

    if (!req.file) {
      console.error('❌ No file uploaded');
      return res.status(400).json({ success: false, error: 'No file uploaded' });
    }

    const {
      referenceNo,
      title,
      classification,
      typeOfDocuments,
      senderOffice,
      senderContact,
    } = req.body;

    // Validate required fields
    if (!referenceNo || !title) {
      return res.status(400).json({ success: false, error: 'Reference No. and Title are required' });
    }

    console.log('✅ Validation passed');
    console.log(`📄 Processing file: ${req.file.originalname}`);

    // Extract text from uploaded file
    let extractedText = '';
    if (req.file.mimetype === 'application/pdf' || req.file.originalname.endsWith('.pdf')) {
      console.log('🔍 Extracting text from PDF...');
      extractedText = await extractTextFromPDF(req.file.path);
    } else {
      extractedText = 'Document file received. Text extraction for DOCX coming soon.';
    }

    console.log(`✅ Extracted ${extractedText.length} characters`);

    // Generate summary
    const summaryLines = generateSummary(extractedText);
    console.log(`📝 Generated ${summaryLines.length} summary lines`);

    // Create summary data
    const summaryData = {
      documentName: req.file.originalname,
      fileName: req.file.filename,
      fileSize: (req.file.size / 1024 / 1024).toFixed(2),
      referenceNo,
      title,
      classification,
      typeOfDocuments,
      senderOffice,
      senderContact,
      extractedText: extractedText.substring(0, 500), // First 500 chars
      summaryLines,
      uploadedAt: new Date().toISOString(),
    };

    console.log('✅ Summary data created successfully');

    res.json({
      success: true,
      data: summaryData,
    });
  } catch (error) {
    console.error('❌ File processing error:', error);
    res.status(500).json({ 
      success: false, 
      error: 'File processing failed', 
      details: error.message 
    });
  }
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Server error:', err);
  res.status(500).json({
    success: false,
    error: 'Server error',
    details: err.message
  });
});

// Start server
const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
  console.log(`📍 Health check: GET http://localhost:${PORT}/api/health`);
  console.log(`📁 File uploads will be stored in: ${path.join(__dirname, 'uploads')}`);
});
