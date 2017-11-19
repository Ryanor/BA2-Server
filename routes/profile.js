var express = require('express');
var path = require('path');
var fs = require('fs');
var xml2js = require('xml2js');

var router = express.Router();

/* GET profiles */
router.get('/json', function (req, res, next) {
    res.set('Content-Type', 'application/json');
    //var parser = new xml2js.Parser();
    res.sendFile(path.join(__dirname, '../public/profiles', 'myjsonfile.json'));
});

router.get('/json1', function (req, res, next) {
    res.set('Content-Type', 'application/json');
    //var parser = new xml2js.Parser();
    res.sendFile(path.join(__dirname, '../public/profiles', 'test_profile.json'));
});

router.get('/xml', function (req, res, next) {
    res.set('Content-Type', 'application/xml');
    res.sendFile(path.join(__dirname, '../public/profiles', 'test_profile.xml'));
});

module.exports = router;
