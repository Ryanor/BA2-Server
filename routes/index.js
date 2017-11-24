var express = require('express');
var router = express.Router();

/* GET homepage. */
router.get('/', function (req, res, next) {
    res.render('index', {title: 'Bluetooth LE Profile Generator'});
});

router.get('/profile', function (req, res) {
    res.render('profile');
});

router.post('/profile', function (req, res) {
    console.log(req.body);
    res.send(req.body);
    //res.render('profile');
});

module.exports = router;
