var express     = require('express');
var app         = express();

var port        = process.env.PORT || 3000;

var path        = require('path');
var mongoose    = require('mongoose');
var passport    = require('passport');
var flash       = require('connect-flash');
var morgan      = require('morgan');
var cookieParser= require('cookie-parser');
var bodyParser  = require('body-parser');
var session     = require('express-session');
var jwt         = require('jsonwebtoken');
var cors        = require('cors');
var fs          = require('fs');


// Set up Database
var dbConfig = require('./config/database.js');
mongoose.connect(dbConfig.url);

// Check Database status
mongoose.connection.on('connected', function(){
  console.log('MongoDB connected: ' + dbConfig.url);
});
mongoose.connection.on('error', function(){
  console.log('MongoDB error: ' + dbConfig.url);
});
mongoose.connection.on('disconnected', function(){
  console.log('MongoDB disconnected: ' + dbConfig.url);
});

// Passport config
//require('./config/passport.js')(passport);

// Setup Express
app.use(morgan('dev'));
app.use(cookieParser());
app.use(bodyParser());
app.use(cors());

// Routes
//require('./app/routes/routes.js')(app, passport); TODO add passport
require('./app/routes/routes.js')(app);

app.use(express.static(__dirname + '/public'));

// Routes
//require('./app/routes/routes.js')(app, passport); TODO add passport
require('./app/routes/routes.js')(app);


// Start app
var server = app.listen(port);
console.log('Compete-Server on port ' + port);
