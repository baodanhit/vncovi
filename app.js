const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const db = require('./models/database');
const indexRouter = require('./routes/index');
const app = express();
// time in ms
let oneDay = 86400000;
// use .env 
const dotenv = require('dotenv');
dotenv.config();

// database connection
db.connect();

// config views
app.set('view engine', 'ejs');
app.set('views', './views');

// use
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public'), { maxAge: oneDay*15 }));

// routes
app.use('/', indexRouter);
app.use((req, res) => {
    res.status(404).render('404').end();
});
module.exports = app;