const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const File = require('../models/File');
const { protect } = require('../middleware/auth');

// Configure multer for file upload
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, '../uploads/')) // Use absolute path
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname)
    }
});

const upload = multer({ 
    storage: storage,
    limits: {
        fileSize: 5 * 1024 * 1024 // 5MB limit
    }
});

// Upload a file
router.post('/upload', protect, upload.single('file'), async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ message: 'No file uploaded' });
        }

        const newFile = {
            filename: req.file.filename,
            originalname: req.file.originalname,
            mimetype: req.file.mimetype,
            size: req.file.size,
            path: req.file.path,
            userId: req.user.id
        };

        const file = await File.create(newFile);
        
        res.status(201).json({ 
            message: 'File uploaded successfully',
            file: {
                id: file._id,
                filename: file.originalname,
                size: file.size
            }
        });
    } catch (error) {
        console.error('File upload error:', error);
        res.status(500).json({ message: 'Error uploading file' });
    }
});

// Get all files for a user
router.get('/files', protect, async (req, res) => {
    try {
        const files = await File.find({ userId: req.user.id });
        res.json(files);
    } catch (error) {
        console.error('Error fetching files:', error);
        res.status(500).json({ message: 'Error fetching files' });
    }
});

// Delete a file
router.delete('/files/:id', protect, async (req, res) => {
    try {
        const file = await File.findOne({ _id: req.params.id, userId: req.user.id });
        if (!file) {
            return res.status(404).json({ message: 'File not found' });
        }

        await File.deleteOne({ _id: req.params.id });
        res.json({ message: 'File deleted successfully' });
    } catch (error) {
        console.error('Error deleting file:', error);
        res.status(500).json({ message: 'Error deleting file' });
    }
});

module.exports = router;
