var process = require('child_process');
var path = require('path');
var fs = require('fs');
var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Profile = require('../schemas/profileSchema');
var profile = mongoose.model('Profile');

/**
 *  GET routes
 */
// get index page
router.get('/', function (req, res) {
    res.render('index', {title: 'Bluetooth LE Profile Generator'});
});

// route for page create new profile
router.get('/profile', function (req, res) {
    res.render('profile', {title: 'Bluetooth LE Profile Generator'});
});

// route to information page
router.get('/about', function (req, res) {
    //res.render('about', {title: 'Bluetooth LE Profile Generator'});
});

// route for existing profiles page
router.get('/profiles', function (req, res) {
   res.render('profiles', {title: 'Bluetooth LE Profile Generator'});
});


/**
 *  POST routes
 */

// TODO post route to start simulator with argument id for the correct profile using nodejs
router.post('/startSimulator/', function (req, res) {
    var file = path.join(__dirname, '../public/profiles', 'start_profile.json');
    console.log("Received data: " + req.body);
    fs.writeFileSync(file, req.body);
    process.execFile('node',['--version']); //'/home/pi/project/BA-Simulator/main.js']);
    res.send({ msg: 'Simulator started...'});
});


/**
 * REST API routes
 */
// load all profiles from database
router.get('/profile/all', function (req, res, next) {

    profile.find(function (err, profile) {
        if (err) {
            return next(err);
        }
        res.json(profile);
    });
});

// post route to create a new profile in the database
router.post('/profile', function (req, res) {

    profile.create(req.body, function (err, profile) {
        if (err) {
            res.status(500).send("Database write error!");
        } else {
            res.status(201).send(JSON.stringify({id : profile._id}));
        }
    });
});

// load a single profile from the database using its ID
router.get('/profile/:id', function (req, res, next){

    profile.findById(req.params.id, function (err, profile) {
        if (err) {
            return next(err);
        }
        res.json(profile);
    });
});

// delete a single profile from database using ID
router.delete('/profile/:id', function (req, res, next) {

    profile.remove({_id : req.params.id} , function (err, profile) {
        if (err) {
            return next(err);
        }
        res.send({ msg: 'Profile with ID: ' + req.params.id + ' removed!' });
    });
});

// export all functions from router to the express application
module.exports = router;
