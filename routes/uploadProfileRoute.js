const router = require('express').Router();
const uploadController = require('../controllers/uploadController');
const uploads = require('../config/multer');
// const {ensureAuthenticated} = require('../controllers/auth/ensureAuth');

router
  .route('/')
  .post(
    // ensureAuthenticated,
    uploads.single('profilePicture'),
    uploadController.uploadProfilePicture
  );

module.exports = router;
