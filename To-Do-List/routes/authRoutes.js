const express = require('express');
const router = express.Router();
const { register, login, getMe } = require('../controllers/authController');
const { protect } = require('../middleware/auth');
const { logout, refreshToken, updateUser, forgotPassword, resetPassword } = require('../controllers/authController');

API_KEy = hf_UjtREIRJmdaevRbWeFzrpxYxMvOYA
module.exports = router;
