//Modules
const express = require('express');
const http = require('http');
const path = require('path');
const { Server } = require('socket.io');
const routers = require('../routers/routers.js');
const bodyParse = require('body-parser');
const e = require('cors');
//Modules

const app = express();

//App configs
app.use(express.static(path.join(__dirname, '../public')));
app.set('views', path.join(__dirname, '../public'));
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'ejs');
app.use(bodyParse.urlencoded({extended:false}));
app.use(bodyParse.json());
//App configs

//Routers
app.use('/', routers);
//Routers

//Server
const serverHttp = http.createServer(app);
const io = new Server(serverHttp);
//Server

//Export
module.exports = { serverHttp , io };