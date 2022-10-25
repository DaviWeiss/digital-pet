const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const methodOverride = require("method-override");
const multer = require("multer");

const accountRouter = require('./routes/account');
const carrinhoRouter = require('./routes/carrinho');
const checkoutRouter = require('./routes/checkout');
const contactAboutRouter = require('./routes/contact-about');
const finalRouter = require('./routes/final');
const homeRouter = require('./routes/home');
const loginRouter = require('./routes/login');
const pedidosRouter = require('./routes/pedidos');
const plansRouter = require('./routes/plans');
const productDetailRouter = require('./routes/product-detail');
const productsListRouter = require('./routes/products-list');
const registerRouter = require('./routes/register');

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

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(methodOverride("_method"));

app.use('/minha-conta', accountRouter);
app.use('/carrinho', carrinhoRouter);
app.use('/checkout', checkoutRouter);
app.use('/contato-sobre-nos', contactAboutRouter);
app.use('/final', finalRouter);
app.use('/', homeRouter);
app.use('/login', loginRouter);
app.use('/pedidos', pedidosRouter);
app.use('/planos', plansRouter);
app.use('/detalhe-produto', productDetailRouter);
app.use('/lista-produtos', productsListRouter);
app.use('/registro', registerRouter);

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
