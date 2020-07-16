var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');


var app = express();
const db = require('./db/database.js');
var cors = require('cors');

var systemhealthcheck = require('./routes/systemhealthcheck')(db);
var systemhealthlearnercheck = require('./routes/systemhealthlearnercheck')(db);
var systemhealthlearnercheckdetails = require('./routes/systemhealthlearnercheckdetails')(db);
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(cors());
// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


app.use('/api', systemhealthcheck);
app.use('/api', systemhealthlearnercheck);
app.use('/api', systemhealthlearnercheckdetails);
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.send({
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

// listen (start app with node server.js) ======================================
app.listen(8002);
console.log("App listening on port 8002");
// module.exports = app;
