//Admin Routers
const express = require('express');
const router = express.Router();
const path = require('path');
require('body-parser');

//MongoDB
const mongoose = require('mongoose');
// const { send } = require('process');
// require('../models/User');
// const User = mongoose.model('users');
//MongoDB

//Routers
router.get('/', (req, res) => {
    res.send('Paienl do admin')
})
//Routers

module.exports = router;