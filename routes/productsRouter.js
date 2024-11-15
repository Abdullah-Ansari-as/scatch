const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.send("hey, productRoute is running");
});

module.exports = router;