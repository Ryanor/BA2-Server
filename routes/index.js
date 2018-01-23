var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Profile = require('../schemas/profileSchema');
var profile = mongoose.model('Profile');

/**
 *  GET routes
 */
// get start page
router.get('/', function (req, res) {
    res.render('index', {title: 'Bluetooth LE Profile Generator'});
});

// route to get a profile form file
router.get('/profile', function (req, res) {
    res.render('profile', {title: 'Bluetooth LE Profile Generator'});
});

// route to information page
router.get('/about', function (req, res) {
    //res.render('about', {title: 'Bluetooth LE Profile Generator'});
});

router.get('/profilelist', function (req, res) {
   res.render('profilelist', {title: 'Bluetooth LE Profile Generator'});
});


/**
 *  POST routes
 */
// post route to store a profile to the database
router.post('/profile', function (req, res) {

   profile.create(req.body, function (err, profile) {
       if (err) {
           res.status(500).send("Database write error!");
       } else {
           res.status(201).send("Data written to database with ID: " + profile._id);
       }
   });
});

router.post('/submit', function (req, res) {
    console.log("Submit called form index.js via post");
    res.send(req.body);
});

/**
 * REST API routes
 */
// load all profiles from database
router.get('/loadprofiles', function (req, res, next) {

    profile.find(function (err, profile) {
        if (err) {
            return next(err);
        }
        res.json(profile);
    });
});

// load a single profile from the database using its ID
router.get('/loadprofile/:id', function (req, res, next){

    profile.findById(req.params.id, function (err, profile) {
        if (err) {
            return next(err);
        }
        res.json(profile);
    });
});

// delete a single profile from database using ID
router.delete('/deleteprofile/:id', function (req, res, next) {

    profile.remove({_id : req.params.id} , function (err, profile) {
        if (err) {
            return next(err);
        }
        res.send({ msg: 'Profile with ID: ' + req.params.id + ' removed!' });
    });
});

// export all functions from router to the express application
module.exports = router;
