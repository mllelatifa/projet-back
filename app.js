require("dotenv").config() //active le .env
require("./config/mongo"); //ramene le fichier moongo
require("jsonwebtoken");
const cors = require('cors') //permet de gerer la permision des  route du serveur 
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
// var session = require('express-session')
// var mongoose = require('mongoose')
// const MongoStore = require("connect-mongo")(session)
var indexRouter = require('./routes/index');
var congerRouter = require('./routes/conger');

var app = express();
app.use(cors("*"));
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({
  extended: false
}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// app.use(
//   session({
//     secret: process.env.SESSION_SECRET,
//     cookie: {
//       maxAge: 60000
//     }, // in millisec
//     store: new MongoStore({
//       mongooseConnection: mongoose.connection, // a demander a guillaume
//       ttl: 24 * 60 * 60, // 1 day
//     }),
//     saveUninitialized: true,
//     resave: false,
//   })
// );

app.use('/', indexRouter);
app.use('/conger', congerRouter);
app.use('/auth', require('./routes/auth'));

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;