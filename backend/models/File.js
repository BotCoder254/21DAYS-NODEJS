const mongoose = require('mongoose');

// Define the File Schema
const fileSchema = new mongoose.Schema({
  // Name of the file
  filename: {
    type: String,
    required: true
  },
  // Original name of the file when uploaded
  originalname: {
    type: String,
    required: true
  },
  // MIME type of the file
  mimetype: {
    type: String,
    required: true
  },
  // Size of the file in bytes
  size: {
    type: Number,
    required: true
  },
  // URL or path where the file is stored
  path: {
    type: String,
    required: true
  },
  // Reference to the user who uploaded the file
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
}, {
  // Add timestamps for when the file was created/updated
  timestamps: true
});

module.exports = mongoose.model('File', fileSchema);
