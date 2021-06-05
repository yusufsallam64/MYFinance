var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var session = require('express-session');
var MySQLStore = require('express-mysql-session')(session);
require('dotenv').config();

var dashboardRouter = require('./routes/dashboard');
var loginRouter = require('./routes/login');
var registrationRouter = require('./routes/registration');
var stockwatchRouter = require('./routes/stockwatch');
var logoutRouter = require('./routes/logout');

var app = express();

// CONSTANTS
const TWO_HOURS = 1000 * 60 * 60 * 2

var options = {
    host: process.env.DB_HOST || "localhost",
    port: 3306,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    connectTimeout: parseInt(process.env.DB_CONNECT_TIMEOUT) || 10000
};

var sessionStore = new MySQLStore(options);

const IN_PROD = process.env.NODE_ENV === 'production';

app.use(session({
  store: sessionStore,
  name: process.env.SESS_NAME,
  resave: false,
  saveUninitialized: false,
  secret: process.env.SESS_SECRET,
  cookie: {
     maxAge: TWO_HOURS,
     sameSite: true, // 'strict' (does the same thing)
     secure: IN_PROD
  }
}));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
app.set('view options', { layout: 'layout' });

// important stuff dont touch
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true })); // research more into setting it true might open up a vuln apparently
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//Routers for different parts of the website
app.use('/', loginRouter);
app.use('/dashboard', dashboardRouter);
app.use('/registration', registrationRouter);
app.use('/stockwatch', stockwatchRouter);
app.use('/logout', logoutRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error', {style: 'error.css',
                       layout: 'error' }); 
});

module.exports = app;
