/**
 * Javascript file index.js contains:
 *     GET routes for the three web pages
 *     GET and POST routes for the simulator control
 *     REST API routes with GET, POST and DELETE
 *
 * @class index
 * @author gwu
 * @version 1.0
 */

/**
 * Required modules
 */
var process = require('child_process');
var path = require('path');
var fs = require('fs');
var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var profileSchema = require('../schemas/profileSchema');
var profileDB = mongoose.model('Profile');

/**
 *  GET routes for the three web pages
 */
/**
 * Route to get the root page
 *
 * @method router.get('/')
 * @return res Returns the web page as response
 * @for index
 */
router.get('/', function (req, res) {
    res.render('index', {title: 'Bluetooth LE Profile Generator'});
});

/**
 * Route to get the create profile page
 *
 * @method router.get('/profile')
 * @return res Returns the web page as response
 * @for index
 */
router.get('/profile', function (req, res) {
    res.render('profile', {title: 'Bluetooth LE Profile Generator'});
});

/**
 * Route to get the existing profiles page
 *
 * @method router.get('/profiles')
 * @return res Returns the web page as response
 * @for index
 */
router.get('/profiles', function (req, res) {
    res.render('profiles', {title: 'Bluetooth LE Profile Generator'});
});

/**
 * Simulator
 */
/**
 * Route to check if the simulator is running.
 * Shell script is used to get the PID of the running process.
 * If a process is found the simulator is running.
 *
 * @method router.get('/checkSimulator')
 * @return res Returns a response containing the status code and a message whether the simulator is running or not
 * @for index
 */
router.get('/checkSimulator', function (req, res) {
    console.log("Checking for running simulator...");
    var running = process.execFile(path.join(__dirname, '../', 'isSimulatorRunning.sh'), ['/usr/bin/node', '/home/pi/project/BA2-Simulator/main.js']);
    running.on('close', function (code) {
        if (code === 0) {
            console.log("Simulator running");
            res.status(200).send("running");
        } else {
            console.log("Simulator not running");
            res.status(200).send("not running");
        }
    });
});

/**
 * Route to start the simulator.
 * Simulator is executed as a child process of the web app.
 * If simulator could not start error message is printed to the console.
 *
 * @method router.post('/startSimulator')
 * @return res Returns a response containing a success message
 * @for index
 */
router.post('/startSimulator', function (req, res) {

    console.log("Simulator will start up...");
    var starting = process.execFile('/usr/bin/node', ['/home/pi/project/BA2-Simulator/main.js']);
    starting.on('error', function (error) {
       console.log(error);
    });
    res.send({msg: 'Simulator started'});

});

/**
 * Route to stop the simulator.
 * Shell script is used to get the PID of the running process and kills the running process.
 * Prompts result code to the console.
 *
 * @method router.post('/stopSimulator')
 * @return res Returns a response containing a success message.
 * @for index
 */
router.post('/stopSimulator', function (req, res) {
    console.log("Simulator will be stopped...");
    var stopping = process.execFile(path.join(__dirname, '../', 'stopSimulator.sh'), ['/usr/bin/node', '/home/pi/project/BA2-Simulator/main.js']);
    stopping.on('close', function (code) {
        console.log(code);
    });
    res.send({msg: 'Simulator stopped'});
});

/**
 * Route to save the selected profile json data to a file.
 * If writing data to file failed error message is prompted to the console.
 *
 * @method router.post('/selectProfile')
 * @return res Returns a response containing a success message
 * @for index
 */
router.post('/selectProfile', function (req, res) {
    var file = path.join(__dirname, '../public/profiles', 'start_profile.json');
    console.log("Received data: " + JSON.stringify(req.body));
    if(fs.writeFileSync(file, JSON.stringify(req.body))){
        res.send({msg: 'Profile saved and ready for use.'});
    } else {
        console.log("Error saving selected profile to file!");
    }
});

/**
 * REST API routes
 */
/**
 * Route to GET all profiles stored in the database.
 *
 * @method router.get('/profiles/all')
 * @return res Returns a response containing profiles as json data.
 * @for index
 */
router.get('/profile/all', function (req, res, next) {

    profileDB.find(function (err, profile) {
        if (err) {
            return next(err);
        }
        res.json(profile);
    });
});

/**
 * POST route to create a new profile in the database.
 *
 * @method router.post('/profile')
 * @return res Returns a response containing the status code and a message.
 * @for index
 */
router.post('/profile', function (req, res) {

    profileDB.create(req.body, function (err, profile) {
        if (err) {
            res.status(500).send("Database write error!");
        } else {
            res.status(201).send(JSON.stringify({id: profile._id}));
        }
    });
});

/**
 * Route to GET a profile by its ID from the database.
 *
 * @method router.get('/profile/:id')
 * @return res Returns a response containing profile as json data or propagate error.
 * @for index
 */
router.get('/profile/:id', function (req, res, next) {

    profileDB.findById(req.params.id, function (err, profile) {
        if (err) {
            return next(err);
        }
        res.json(profile);
    });
});

/**
 * Route to DELETE a profile by its ID from the database.
 *
 * @method router.delete('/profile/:id')
 * @return res Returns a response containing a message or propagate error.
 * @for index
 */
router.delete('/profile/:id', function (req, res, next) {

    profileDB.remove({_id: req.params.id}, function (err, profile) {
        if (err) {
            return next(err);
        }
        res.send({msg: 'Profile with ID: ' + req.params.id + ' removed!'});
    });
});

// export all functions from router to the express application
module.exports = router;
