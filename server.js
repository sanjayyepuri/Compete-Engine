var express		= require('express');
var app			= express();
var path 		= require('path');
var port 		= process.env.PORT || 3000;
var mongoose 	= require('mongoose');
var passport 	= require('passport');
var path		= require('path');
var flash 		= require('connect-flash');

var morgan		= require('morgan');
var cookieParser= require('cookie-parser');
var bodyParser 	= require('body-parser');
var session		= require('express-session');


//Database Setup
var configDB = require('./config/database.js');
mongoose.connect(configDB.url);
//Error Handling 
mongoose.connection.on('error', function(){
	console.log('MongoDB error: ' + configDB.url);
});
mongoose.connection.on('disconnected', function(){
	console.log('MongoDB disconnected: ' + configDB.url);
});

//Express Setup
app.use(morgan('dev'));
app.use(cookieParser());
app.use(bodyParser());
app.use('/public', express.static(path.join(__dirname, 'public')));

//Socket.io
var server = app.listen(port);
var io = require('socket.io').listen(server);
require('./app/socket.js')(io);

//Jade
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

//Session
app.use(session({secret:'hellomynameistevet'}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

//Passport   
require('./config/passport')(passport)

//Routes
require('./app/routes.js')(app, passport);

//Main

console.log('On Port' + port);