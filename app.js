const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

//localizando as rotas
const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');

//aplicação express
const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views')); //pasta qual vai buscar as views
app.set('view engine', 'ejs');//engine do view

//o que o express vai usar
app.use(logger('dev'));//instanciou um logger
app.use(express.json());//vai usar dados json
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

//Simulando um error
app.use("/sobre", (req, res, next) => {
  try {
    throw new Error("Erro não conhecido"); //criando um erro

    res.send(
      "Esse sistema foi desenvolvido na aula da DH"
    );
  } catch(error) { //pegou o error
      next(error); //passou o error
    }
});

// catch 404 and forward to error handler
//Vai tratar o error
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
  res.render('error'); //manda redenrizar o error, ou seja o error.ejs dentro da views
});

module.exports = app;
