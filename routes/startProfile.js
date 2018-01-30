var express = require('express');
var path = require('path');
var router = express.Router();

/* GET profiles */
router.get('/profile', function (req, res, next) {
    res.set('Content-Type', 'application/json');
    res.sendFile(path.join(__dirname, '../public/profiles', 'start_profile.json'));
});

router.get('/json', function (req, res, next) {
    res.set('Content-Type', 'application/json');
    res.sendFile(path.join(__dirname, '../public/profiles', 'test_profile.json'));
});

// export all functions from router to the express application
module.exports = router;
