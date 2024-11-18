const express = require('express');
const router = express.Router();
const {registerUser} = require('../controllers/authController')

router.get('/', (req, res) => {
    res.send("hey, userRouter is working");
});

router.post('/register', registerUser);

module.exports = router;