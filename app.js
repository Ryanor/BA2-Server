/**
 * File app.js is the basic file of the express application
 *
 * @class app
 *
 * @author gwu
 * @version 1.0
 */

/**
 * Initial import of required modules for an express application,
 * done by Webstorm IDE at project start.
 */
var express = require('express');
var path = require('path');
var logger = require('morgan');
var favicon = require('serve-favicon');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

/**
 * Manually added requirements
 */
var mongoose = require('mongoose');

/**
 *  Routes leading to our web pages which are used for navigation
 *  and rest api calls
 */
var index = require('./routes/index');
var startProfile = require('./routes/startProfile');

// set express application variable
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use('/jquery', express.static(__dirname + '/node_modules/jquery/dist/'));

// uncomment after placing your favicon in /public
app.use(favicon(path.join(__dirname, 'public/images', 'favicon.png')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

/**
 *  Establish connection to mongodb and store connection to global variable db
 */
var mongoDB = 'mongodb://localhost:27017/BLEProfiles';
mongoose.connect(mongoDB, {
    useMongoClient: true
});

mongoose.Promise = global.Promise;

var db = mongoose.connection;

//Bind connection to connected and error event (to get notification of connection errors)
db.on('connected', function () {
    console.log('MongoDB connection successful!'); })
  .on('error', console.error.bind(console, 'MongoDB connection error:'));


/**
 * Set routes for the webservice pages
 */
app.use('/', index);
app.use('/startProfile', startProfile);


/**
 * HTTP status and error handling is automatically done for a new project
 * catch 404 and forward to error handler
 */
// catch 404 and forward to error handler
app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

/**
 * Error handler
 */
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

// Export all functions as app
module.exports = app;
