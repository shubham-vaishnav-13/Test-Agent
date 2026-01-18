const express = require('express');
const router = express.Router();
const { register, login, getMe } = require('../controllers/authController');
const { protect } = require('../middleware/auth');
const { logout, refreshToken, updateUser, forgotPassword, resetPassword } = require('../controllers/authController');

router.post('/register', register);
router.post('/login', login);


router.post('/forgot-password', forgotPassword);
router.post('/reset-password/:resetToken', resetPassword);
module.exports = router;
