const express = require('express');
const router = express.Router();
const path = require('path');
require('body-parser');

//MongoDB
const mongoose = require('mongoose');
require('../models/User');
const User = mongoose.model('users');
//MongoDB

//Routers

//Get Routers 
router.get('/', (req, res) => {
    res.render('index.html')
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
router.post('/signUp', (req, res) => {
    const newUserToSignUp = {
        userName: req.body.userName,
        email: req.body.email,
        password: req.body.pass,
    };

    new User(newUserToSignUp).save().then(()=>{
        console.log('New user registered');
    }).catch((err) => {
        console.log(`error when registering new user: ${err}`);
    });
    
    res.redirect('/login');
    // res.redirect('/signUp/success');
});
router.post('/login', (req, res) => {
    // db.users.find({userId:"OPtOP33"})
    /* { "_id" : ObjectId("625f378ac446e25127ba67a4"), "userName" : "Kauas", 
    "userId" : "OPtOP33", "email" : "kaualimatube@gmail.com", 
    "password" : "kaualimagostosodojs", "contactList" : [ ], "__v" : 0 } */
    let userOrEmail = req.body.userOrEmail;
    User.find({email: userOrEmail}).then((user) => {
    /*  res.send(user[0].userId); -- Mostra dados especícos do usuário  */
    }).catch((err) => {
        res.send(`Error: ${err}`);
    });
});
//Post Routers

//Routers

module.exports = router;