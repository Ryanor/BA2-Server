var express = require('express');
var path = require('path');
var router = express.Router();



/* GET profiles */
router.get('/json1', function (req, res, next) {
    res.set('Content-Type', 'application/json');
    //var parser = new xml2js.Parser();
    res.sendFile(path.join(__dirname, '../public/profiles', 'test_profile.json'));
});


router.post('/profile', function (req, res) {

    res.send(req.body);
    //res.render('profile');
});

module.exports = router;
