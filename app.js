const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const methodOverride = require("method-override");
const multer = require("multer");
const session = require('express-session');

const otherRoutes = require('./routes/otherRoutes');
const planRoutes = require('./routes/planRoutes');
const productRoutes = require('./routes/productRoutes');
const userRoutes = require('./routes/userRoutes');
const orderRoutes = require('./routes/orderRoutes');

const dataFromUserLoggedMiddleware = require('./middlewares/dataFromUserLoggedMiddleware');

const storage = multer.diskStorage({
  destination: function(req, file, cb)
  {
    cb(null, "public/images");
  },
  filename: function(req, file, cb)
  {
    cb(null, "nome-" + Date.now());
  },
});

const upload = multer({
  storage: storage
});

const app = express();

app.use(session({
  secret: "DigitalPet",
  resave: false,
  saveUninitialized: false
}))

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(methodOverride("_method"));

app.use(dataFromUserLoggedMiddleware);

app.use('/', otherRoutes);
app.use('/planos', planRoutes);
app.use('/produtos', productRoutes);
app.use('/usuario', userRoutes);
app.use('/pedidos', orderRoutes);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
/*
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});
*/
module.exports = app;
