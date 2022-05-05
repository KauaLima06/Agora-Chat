const express = require('express');
const router = express.Router();
const path = require('path');
const bcrypt = require('bcrypt');
const axios = require('axios');
const urlBase = 'https://agora-api-rest.herokuapp.com';
require('dotenv').config();
require('body-parser');
const passport = require('passport');
const passaportConfig = require('../config/localStrategy')(passport);


//MongoDB
const mongoose = require('mongoose');
//Routers

//Get Routers 
router.get('/', (req, res) => {
    res.render('index.html');
});
router.get('/chat', checkIsAuthenticate, (req, res) => {
    console.log(req.session)
    res.render('chat.html');
});
router.get('/login', (req, res) => {
    res.render('login.html');
});
router.get('/signup', (req, res) => {
    res.render('sign-up.html');
});
router.get('/profile', checkIsAuthenticate, (req, res) => {
    res.render('profile.html');
});

//Message routers
router.get('/404', (req, res) => res.render('redirectPages/notFound.html'));
router.get('/401', (req, res) => res.render('redirectPages/unauthorization.html'));
router.get('/201', (req, res) => res.render('redirectPages/accountCreated.html'));
router.get('/500', (req, res) => res.render('redirectPages/error.html'));
//Message routers

//Get Routers 

//Middlewares
function verifyToken(req, res, next){

    const authorization = req.headers['authorization'];
    
    console.log(authorization)

};

function checkIsAuthenticate(req, res, next){

    if(req.isAuthenticated()) return next();

    res.redirect('/401');

};

function checkIsNoAuthenticate(req, res, next){

    if(req.isAuthenticated()) return res.redirect('/chat');

    next();

};
//Middlewares

//Post Routers
router.post('/signup', async(req, res) => {

    const userName = req.body.userName;
    const email = req.body.email;
    const password = req.body.pass;

    await axios.post(`${urlBase}/user/register`, {
        userName: userName,
        email: email,
        password: password,
    })
    .then(response => {
        // res.send(response.data)
        if(response.status == 201){
            res.redirect('/201');
        }else{
            res.redirect('/500');
        }
    })
    .catch(error => {
        console.log(error);
        return res.redirect('/500');
    })

});

router.post('/login', passport.authenticate('local', {
    successRedirect: '/Chat',
    failureRedirect: '/500',
    failureFlash: true
}));

//Post Routers

//Routers

module.exports = router;