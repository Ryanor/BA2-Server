var process = require('child_process');
var path = require('path');
var fs = require('fs');
var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Profile = require('../schemas/profileSchema');
var profile = mongoose.model('Profile');

var child;
var childPID;
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

// route for existing profiles page
router.get('/profiles', function (req, res) {
   res.render('profiles', {title: 'Bluetooth LE Profile Generator'});
});


/**
 *  POST routes
 */
router.get('/checkSimulator', function (req, res) {
    var running = process.execFile(path.join(__dirname, '../','isSimulatorRunning.sh'), ['/usr/bin/node', '/home/pi/project/BA2-Simulator/main.js']);
    script.stdout.on('data',function(data){
        console.log(data); // process output will be displayed here
        if(data === 1) {
            res.send({msg: 'running'});
        }
    });
    script.stderr.on('data',function(data){
        console.log(data); // process error output will be displayed here
        if(data === 1) {
            res.send({msg: 'running'});
        }
    });
});

router.post('/selectProfile', function (req, res) {
   var file = path.join(__dirname, '../public/profiles', 'start_profile.json');
   console.log("Received data: " + JSON.stringify(req.body));
   fs.writeFileSync(file, JSON.stringify(req.body));
   res.send({ msg: 'Profile saved and ready for use.'});
});

router.post('/startSimulator', function (req, res) {

    var status = req.body.msg;
    if(status === "Start") {
        console.log("Received data: " + JSON.stringify(req.body));
        child = process.execFile('node',['/home/pi/project/BA2-Simulator/main.js']);
        childPID = child.pid;
        res.send({msg: 'Simulator started with PID: ' + childPID});
    } else  {
        console.log("Received data: " + JSON.stringify(req.body));
        if(childPID !== 0) {
            console.log("Process " + childPID + " will be stopped");
            child.stdin.pause();
            var script = process.execFile(path.join(__dirname, '../','stopSimulator.sh'), [childPID]);
            script.stdout.on('data',function(data){
                console.log(data); // process output will be displayed here
            });
            script.stderr.on('data',function(data){
                console.log(data); // process error output will be displayed here
            });
            res.send({msg: 'Simulator stopped'});
        } else {
            res.send({msg: 'Simulator not running!'});
        }
    }
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
