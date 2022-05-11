const express = require('express');
const router = express.Router();
const path = require('path');
const bcrypt = require('bcrypt');
const axios = require('axios');
require('dotenv').config();
require('body-parser');
const passport = require('passport');
const passaportConfig = require('../config/localStrategy')(passport);
const sendEmail = require('../src/sendMail.js');
const urlBase = 'https://agora-api-rest.herokuapp.com';
// const urlBase = 'http://localhost:2929';

//MongoDB
const mongoose = require('mongoose');
//Routers

//Get Routers 
router.get('/', (req, res) => {
    res.render('index.html');
});
router.get('/chat', checkIsAuthenticate, checkIsConfirmed, async(req, res) => {
    const { userId } = req.session.passport.user;
    res.render('chat.html');
});
router.get('/login', (req, res) => {
    res.render('login.html');
});
router.get('/signup', (req, res) => {
    res.render('sign-up.html');
});
router.get('/profile', checkIsAuthenticate, checkIsConfirmed, (req, res) => {
    res.render('profile.html');
});
router.get('/sendemail', checkIsAuthenticate, (req, res) => {
    res.render('sendEmailToConfirm.html');
});
router.get('/emailConfirmed', (req, res) => {
    res.render('emailConfirmed.html');
});

//confirm email
router.get('/confirmEmail/:userId', async(req, res) => {

    const id = req.params.userId;
    const findUser = axios.get(`${urlBase}/user/findById/${id}`)
    .then(async response => {
        const user = response.data;
        if(!user || user == null || user == undefined) return res.redirect('/404');

        const { isConfirmed } = user;
        if(isConfirmed) return res.redirect('/login');

        const userUpdate = await axios.patch(`${urlBase}/user/confirmEmail/${id}`, 
        {isConfirmed: true})
        .then(response => {
            const { error } = response;
            if(error){
                if(response.status == 404) return res.redirect('/404');
                if(response.status == 500) return res.redirect('/500');
            } 

            return res.redirect('/emailConfirmed');
        })
        .catch(err => {
            console.log(err);
            return res.redirect('/500');
        })
    })
    .catch(err => {
        console.log(err);
        return res.redirect('/500');
    })

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

    const userId = req.session.passport.user;
    if(req.isAuthenticated()){
        console.log(userId)
        return res.redirect(`/chat?user=${userId}`);
    }

    next();

};

async function checkIsConfirmed(req, res, next){

    const { isConfirmed, userId } = req.session.passport.user;
    if(isConfirmed) return next();

    return res.redirect(`/sendemail`);

}
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

            sendEmail(response.data);
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
    successRedirect: '/chat',
    failureRedirect: '/500',
    failureFlash: true,
}));

router.post('/sendemail', async(req, res) => {
    if(req.session.passport.user){
        const { userId } = req.session.passport.user;
        const findUser = await axios.get(`${urlBase}/user/findById/${userId}`)
        .then(response => {
            const user = response.data;
            if(!user || user == null || user == undefined) return res.redirect('404');
    
            sendEmail(user);
        })
        .catch(err => {
            console.log(err);
            return res.redirect('/500');
        })
    }

    return res.redirect('/login');
});
//Post Routers

//Routers

module.exports = router;