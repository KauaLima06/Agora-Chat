//Modules
const express = require('express');
const http = require('http');
const path = require('path');
const { Server } = require('socket.io');
const bodyParse = require('body-parser');
const momgoose = require('mongoose');
const flash = require('express-flash');
const session = require('express-session');
const passport = require('passport');
const passportConfig = require('../config/localStrategy')(passport);
const methodOverride = require('method-override');
require('dotenv').config();

//Routers
const chatRouters = require('../routers/chatRouters.js');
const res = require('express/lib/response');
//Routers

//Modules

const app = express();

//App configs
app.use(express.urlencoded({ extended: false }))
app.use(flash());
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 2 * 60 * 60 * 1000
    }
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(methodOverride('_method'));

app.use(express.static(path.join(__dirname, '../public')));
app.set('views', path.join(__dirname, '../public'));
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'ejs');
app.use(bodyParse.json());
//App configs

//Routers
app.use('/', chatRouters);
//Routers

//Server
const serverHttp = http.createServer(app);
const io = new Server(serverHttp);
//Server

//Export
module.exports = { serverHttp , io , app};