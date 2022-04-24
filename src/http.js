//Modules
const express = require('express');
const http = require('http');
const path = require('path');
const { Server } = require('socket.io');
const bodyParse = require('body-parser');
const momgoose = require('mongoose');
//Routers
const chatRouters = require('../routers/chatRouters.js');
const userRouters = require('../routers/userRouters.js');
const adminRouters = require('../routers/adminRouters.js');
//Routers
//Modules

const app = express();

//App configs
app.use(express.static(path.join(__dirname, '../public')));
app.set('views', path.join(__dirname, '../public'));
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'ejs');
app.use(bodyParse.urlencoded({extended: true}));
app.use(bodyParse.json());
//App configs

//Middlewares
// app.use((req, res, next) => {
//     console.log('Hello, i am a middleware!!');

//     next();
// });
//Middlewares

//MongoDB
momgoose.Promise = global.Promise;
momgoose.connect('mongodb://localhost/agora-chat').then(()=>{
    console.log('MongoDB connected');
}).catch((err)=>{
    console.log(`connection to mongodb failed: ${err}`);
});
//MongoDB

//Routers
app.use('/', chatRouters);
app.use('/user', userRouters);
app.use('/admin', adminRouters);
//Routers

//Server
const serverHttp = http.createServer(app);
const io = new Server(serverHttp);
//Server

//Export
module.exports = { serverHttp , io , app};