const express = require('express');
const router = express.Router();
const path = require('path');
require('body-parser');

//Routers
router.get('/', (req, res) => {
    res.render('index.html');
});
//Routers

module.exports = router;