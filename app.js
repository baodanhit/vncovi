const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const autorun = require('./controllers/autorun');
const indexRouter = require('./routes/index');

const app = express();

// config views
app.set('view engine', 'ejs');
app.set('views', './views');

// use
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// routes
app.use('/', indexRouter);

// autorun task
autorun();

module.exports = app;