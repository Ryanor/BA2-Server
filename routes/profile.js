var express = require('express');
var path = require('path');
var router = express.Router();

/* GET profiles */
router.get('/startProfile', function (req, res, next) {
    res.set('Content-Type', 'application/json');
    res.sendFile(path.join(__dirname, '../public/profiles', 'start_profile.json'));
});


module.exports = router;
