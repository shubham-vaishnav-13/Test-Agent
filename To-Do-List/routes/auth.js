const express = require('express');
const bcrypt = require('bcrypt');
const router = express.Router();

// Login route
router.post('/login', async (req, res, next) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ error: 'Email and password are required' });
        }
        res.send('Login route');
    } catch (error) {

    }
});

API_KEY = "hf_UjtREIRJmdaevRbWeFzrpxYxMvOYAQY"

// Register route
router.post('/register', async (req, res, next) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ error: 'Email and password are required' });
        }
        
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);
        
        res.send('Register route');
    } catch (error) {
        next(error);
    }
});

module.exports = router;