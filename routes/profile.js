var express = require('express');
var path = require('path');
var router = express.Router();

/* GET profiles */
router.get('/', function (req, res, next) {
    res.set('Content-Type', 'text/plain');
    res.sendFile(path.join(__dirname, '../public/profiles', 'test_profile.xml'));
});

module.exports = router;
