// index.js
const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const cors = require('cors');

const app = express();

// CORS Configuration
const corsOptions = {
    origin: process.env.ALLOWED_ORIGINS ? process.env.ALLOWED_ORIGINS.split(',') : ['http://localhost:5173', 'http://localhost:3000', 'https://prabhu.lk'],
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
    maxAge: 86400
};

// Apply CORS middleware
app.use(cors(corsOptions));

// Additional security headers middleware
app.use((req, res, next) => {
    res.setHeader('X-Frame-Options', 'DENY');
    res.setHeader('X-XSS-Protection', '1; mode=block');
    res.setHeader('X-Content-Type-Options', 'nosniff');
    res.setHeader('Strict-Transport-Security', 'max-age=31536000; includeSubDomains');
    next();
});

// Set and create uploads directory if it doesn't exist
const UPLOADS_DIR = path.join(__dirname, "uploads");
if (!fs.existsSync(UPLOADS_DIR)) {
    fs.mkdirSync(UPLOADS_DIR, { recursive: true });
}

// Configure multer for file uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, UPLOADS_DIR);
    },
    filename: (req, file, cb) => {
        const fileExtension = path.extname(file.originalname).toLowerCase();
        const uniqueName = `${Date.now()}-${Math.random().toString(36).substring(2, 15)}${fileExtension}`;
        cb(null, uniqueName);
    }
});

const fileFilter = (req, file, cb) => {
    const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];

    if (!allowedTypes.includes(file.mimetype)) {
        const error = new Error('Invalid file type. Only JPEG, PNG, GIF, and WebP images are allowed.');
        error.code = 'INVALID_FILE_TYPE';
        return cb(error, false);
    }

    cb(null, true);
};

const upload = multer({
    storage,
    limits: {
        fileSize: 5 * 1024 * 1024,
        files: 1
    },
    fileFilter
});

app.use("/uploads", cors(corsOptions), express.static(UPLOADS_DIR));
app.options('/upload', cors(corsOptions));

app.post("/upload", cors(corsOptions), (req, res) => {
    upload.single('image')(req, res, (err) => {
        if (err) {
            if (err.code === 'LIMIT_FILE_SIZE') {
                return res.status(400).json({
                    error: 'File size too large. Maximum size is 5MB.'
                });
            }
            if (err.code === 'INVALID_FILE_TYPE') {
                return res.status(400).json({
                    error: err.message
                });
            }
            return res.status(400).json({
                error: 'Error uploading file: ' + err.message
            });
        }

        if (!req.file) {
            return res.status(400).json({
                error: 'No file uploaded'
            });
        }

        // const baseUrl = process.env.BASE_URL || `${req.protocol}://${req.get('host')}`;
        const fileUrl = `/uploads/${req.file.filename}`;

        return res.status(200).json({
            message: 'File uploaded successfully',
            fileUrl,
            fileName: req.file.filename,
            size: req.file.size
        });
    });
});

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({
        error: 'Something went wrong!'
    });
});

// Export the app for use with node handler
module.exports = app;

// Only listen if this file is run directly
if (require.main === module) {
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, '0.0.0.0', () => {
        console.log(`Server is running on http://localhost:${PORT}`);
    });
}