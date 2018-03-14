/**
 * This file contains the GET routes for the simulator
 * to get a single profile  as json data out of a file.
 *
 * @class startProfile
 *
 * @author gwu
 * @version 1.0
 */

/**
 * Required modules
 */
var express = require('express');
var path = require('path');
var router = express.Router();

/**
 * Route to GET the selected profile which is used in the simulator.
 *
 * @method router.get('/startProfile/profile')
 * @return res Returns a response containing profile as json data.
 * @for startProfile
 */
router.get('/profile', function (req, res, next) {
    res.set('Content-Type', 'application/json');
    res.sendFile(path.join(__dirname, '../public/profiles', 'start_profile.json'));
});

// export all functions from router to the express application
module.exports = router;
