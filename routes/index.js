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
    var profile = [{}];

    // get input form by id
    var form = document.getElementById('profile');

    // get child divs of services
    var childDivs = document.getElementById('services').getElementsByTagName('div');

    var amountOfServices = document.getElementsByClassName('service');
    var amountOfCharacteristics = document.getElementsByClassName('characteristic');
    var amountOfDescriptors = document.getElementsByClassName('descriptor');

    // parse
    if(amountOfServices !== 0) {
        for (var i = 0; i < amountOfServices.length; i++) {
            var service = {};
            var currentService = amountOfServices[i];

            // get all input and select elements from currentService
            var elements = service.querySelectorAll("input, select");

            for (var i = 0; i < elements.length; i++) {
                var element = elements[i];
                var id = element.id;

                var key = element.name;
                var value = element.value;
                service[key] = value;
            }
            profile["service"] = service;
        }
    }

    console.log(JSON.stringify(profile));
    res.send(req.body);
});

module.exports = router;
