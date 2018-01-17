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
// load module for mongodb
var mongodb = require('mongodb');

// global variable to store database connection, used to use it in our routes
var db = null;

/**
 *  Routes leading to our web pages which are used for navigation
 *  and rest api calls
 */
var index = require('./routes/index');
var profile = require('./routes/profile');
var submit = require('./routes/submit');

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
mongodb.MongoClient.connect('mongodb://localhost:27017/', function (err, database) {

    if (err) {
        console.log(err);
        process.exit(1);
    }

    db = database.db("BLEProfiles");
    if (db !== null) {
        console.log("Database connection ready");
    } else {
        console.log("Database not connected!");
    }

    db.listCollections({name: 'profiles'}).next(function (err, collinfo) {
        if (collinfo) {
            console.log("Collection exists");
        } else {
            db.createCollection("profiles", function (err, res) {
                if (err) {
                    throw err;
                }

                console.log("Collection created!");
            });
        }
    });
});


/**
 * This method is used to make our database accessible in the routes.
 * It must be placed before the routes are set.
 */
app.use(function(req, res, next) {
   req.db = db;
   next();
});

/**
 * Set routes for our web pages
 */
app.use('/', index);
app.use('/profile', profile);
app.use('/submit', submit);


/**
 * HTTP status and error handling is automatically done for a new project
 */
// catch 404 and forward to error handler
app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;
