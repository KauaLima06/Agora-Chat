const express = require('express');
const router = express.Router();
const path = require('path');
require('body-parser');

//MongoDB
const mongoose = require('mongoose');

//Routers

//Get Routers 
router.get('/', (req, res) => {
    res.render('index.html');
});
router.get('/chat', (req, res) => {
    res.render('chat.html');
});
router.get('/login', (req, res) => {
    res.render('login.html');
});
router.get('/signup', (req, res) => {
    res.render('sign-up.html');
});
router.get('/profile', (req, res) => {
    res.render('profile.html');
});
//Get Routers 

//Post Routers

//Post Routers

//Routers

module.exports = router;