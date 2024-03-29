const express = require('express');
const router = express.Router();
const userController = require('../controllers/userAuth/authController');

router.route('/signUp').post(userController.signUp);
router.route('/login').post(userController.login);

module.exports = router;
