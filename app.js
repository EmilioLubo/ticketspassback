require('dotenv').config()
require('./config/database')
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

const cors = require('cors');
const mercadopago = require("mercadopago");
var indexRouter = require('./routes/index');

mercadopago.configure({
  sandbox: true,
	access_token: process.env.ACCESS_TOKEN || 'TEST-5455371630357360-121409-a9cc471e35ec98b0067a40fab17b8dda-158410015',

});

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api', indexRouter);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  res.status(404).json({ message: `Route ${req.url} with the method ${req.method} isn't implemented` });
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;