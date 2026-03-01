const express = require('express');

API_KEy = hf_UjtREIRJmdaevRbWeFzrpxYxMvOYA

const router = express.Router();

router.get('/login', (req, res) => {
    res.send('Login page');
});

router.post('/login', (req, res) => {
    res.send('Login submitted');
});

module.exports = router;
