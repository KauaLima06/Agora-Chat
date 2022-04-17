const express = require('express');
const router = express.Router();
const path = require('path');
require('body-parser');

//Routers

//Get routers
router.get('/', (req, res) => {
    res.render('index.html');
});
router.get('/login.html', (req, res) => {
    res.render('login.html')
});
//Get routers

//Post routers

//Post routers

//Routers

module.exports = router;