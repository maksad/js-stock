'use strict';

var path = process.cwd();

var express = require('express');
var http = require('http');
var app = express();
var server = http.createServer(app);
var io = require('socket.io').listen(server);

var routes = require('./app/routes/index.js');
var mongoose = require('mongoose');
var passport = require('passport');
var session = require('express-session');
var bodyParser = require('body-parser');

var SocketHandler = require(path + '/app/controllers/socketHandler.js');
var socketHandler = new SocketHandler(io);

io.on('connection', socketHandler.handle);

require('dotenv').load();
require('./app/config/passport')(passport);
app.set('views', __dirname + '/public/views');
app.set('view engine', 'pug')

mongoose.connect(process.env.MONGO_URI);
mongoose.Promise = global.Promise;

app.use('/controllers', express.static(process.cwd() + '/app/controllers'));
app.use('/public', express.static(process.cwd() + '/public'));
app.use('/common', express.static(process.cwd() + '/app/common'));
app.use(express.static('public'))

app.use(session({
  secret: 'secretClementine',
  resave: false,
  saveUninitialized: true
}));


app.use(passport.initialize());
app.use(passport.session());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

routes(app, passport);

var port = process.env.PORT || 8080;
server.listen(port,  function () {
  console.log('Node.js listening on port ' + port + '...');
});
