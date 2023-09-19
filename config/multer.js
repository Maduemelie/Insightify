const multer = require('multer');
const path = require('path');

// Define the multer storage configuration
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    // Define the destination directory for uploaded files
    cb(null, path.join(__dirname, '../uploads'));
  },
filename: function (req, file, cb) {
  // Generate a unique filename using a timestamp
  const timestamp = Date.now();
  const fileExtension = path.extname(file.originalname);
  const allowedFileTypes = ['.jpg', '.jpeg', '.png', '.gif'];
  
  if (!allowedFileTypes.includes(fileExtension)) {
    return cb(new Error('Only image files are allowed'));
  }
  
  const uniqueFilename = `${timestamp}${fileExtension}`;
  cb(null, uniqueFilename);
},
});

const upload = multer({ storage: storage });

module.exports = upload; // Export the configured multer instance
