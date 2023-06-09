var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

const error404Handler = require('./middleware/handler404NotFound');
const error400CustomHandler = require('./middleware/customErrorHandler');
const error500Handler = require('./middleware/handler500ServerError');
var pushData = require('./app/pushData/route');
var testGetData = require('./app/tesgetdata/route');
var v1 = require("./routes/v1");
var app = express();

require('dotenv').config({path: __dirname+ '/.env'});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
// app.use(express.static(path.join(__dirname, 'public')));


app.use('/api/v1', v1);
// app.use('/fetchdata', pushData);
// app.use('/getdata', testGetData);


app.use(error400CustomHandler);
app.use(error404Handler);
app.use(error500Handler);

// error handler
// app.use(function(err, req, res, next) {
//   // set locals, only providing error in development
//   res.locals.message = err.message;
//   res.locals.error = req.app.get('env') === 'development' ? err : {};

//   // render the error page
//   res.status(err.status || 500);
//   res.render('error');
// });

module.exports = app;
