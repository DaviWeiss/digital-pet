var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var accountRouter = require('./routes/account');
var carrinhoRouter = require('./routes/carrinho');
var checkoutRouter = require('./routes/checkout');
var contactAboutRouter = require('./routes/contact-about');
var finalRouter = require('./routes/final');
var homeRouter = require('./routes/home');
var loginRouter = require('./routes/login');
var pedidosRouter = require('./routes/pedidos');
var plansRouter = require('./routes/plans');
var productDetailRouter = require('./routes/product-detail');
var productsListRouter = require('./routes/products-list');
var registerRouter = require('./routes/register');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

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
