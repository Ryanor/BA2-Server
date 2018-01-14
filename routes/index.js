var express = require('express');
var router = express.Router();

/* GET homepage. */
router.get('/', function (req, res, next) {
    res.render('index', {title: 'Bluetooth LE Profile Generator'});
});

router.get('/profile', function (req, res) {
    res.render('profile', {title: 'Bluetooth LE Profile Generator'});
});

router.get('/about', function (req, res) {
   res.render('about', {title: 'Bluetooth LE Profile Generator'});
});

router.post('/submit', function (req, res) {
    console.log("Submit called form index.js via post");
    res.send(req.body);
});

router.post('/profile', function (req, res) {
    console.log("Submit profile data");

    // Logic goes here
    console.log(req.body);
    res.send(req.body);
});

module.exports = router;
