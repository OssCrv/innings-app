
const express = require('express');
const path = require('path');
const dotenv = require('dotenv');
const session = require('express-session');

//Routes
const indexRouter = require('./routes/index');

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.set('port', process.env.PORT || 6969);

//app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended:false}));
// app.use(cookieParser()); require('cookie-parser')
app.use('/resources', express.static(path.join(__dirname, '../public')));

//Use of Routes
app.use('/', indexRouter);

dotenv.config({path: path.join(__dirname, '.env')});

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
    res.render('error');
  });
  
app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
}));

module.exports = app;