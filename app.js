const createError = require('http-errors');
const express = require('express');
const cors = require('cors')

const path = require('path');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const logger = require('morgan');

// Routes
const indexRouter = require('./routes/index');
const app = express();

/** Localhost Cors bug fix => Access-Control-Allow-Origin...  */
app.use(cors());

//db connection
const db = require('./config/db.js')();

//Secret key
const config = require('./config/config');
app.set('api_secret_key', config.api_secret_key );

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');



app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


// Routes
app.use('/', indexRouter);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

// error handler
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.json({ error: { message: err.message, code: err.code } });
});

module.exports = app;
