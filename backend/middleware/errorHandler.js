const multer = require('multer');

const errorHandler = (err, req, res, next) => {
  // Multer-specific errors
  if (err instanceof multer.MulterError) {
    if (err.code === 'LIMIT_FILE_SIZE') {
      return res.status(400).json({ message: 'File too large. Max size is 5MB.' });
    }

    return res.status(400).json({ message: err.message });
  }

  // Custom file type error (thrown manually in multer fileFilter)
  if (err.message === 'Only .jpg, .png, .webp files are allowed') {
    return res.status(400).json({ message: err.message });
  }

  // Fallback server error
  return res.status(500).json({
    message: 'Server Error',
    error: err.message
  });
};

module.exports = errorHandler;
