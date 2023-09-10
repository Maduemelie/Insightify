const User = require('../models/userModel');
const fs = require('fs');
// const passport = require('passport');

// ...

// TODO: Add passport authentication middleware to be sure the user is logged in
const uploadProfilePicture = async (req, res) => {
  console.log(req.file);

  // Parse userData from the request body
  const userData = JSON.parse(req.body.userData);
// console.log(userData);
  const userId = userData._id; 

  try {
    const user = await User.findById(userId);
    if (!user) {
      throw new Error('User not found');
    }

    user.profilePicture.data = fs.readFileSync('uploads/' + req.file.filename);
    user.profilePicture.contentType = req.file.mimetype;
    await user.save();

    res.status(200).json({ message: 'Image uploaded successfully', user });
  } catch (error) {
    console.error('Error uploading image:', error);
    res.status(500).json({ error: 'Internal server error' });
  }

  }
//   )(req, res);
// };

module.exports = {
  uploadProfilePicture,
};