var express = require('express');
var router = express.Router();

/* GET homepage. */
router.get('/', function (req, res) {
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
    var profile = convertForm(req);

    if(profile === null) {
        res.status(400);
    } else {
        console.log(JSON.stringify(profile));
        res.send(req.body);
    }
});

function convertForm(request) {
    var profileString = "[";

    // get amount of services
    var amountOfServices = document.getElementsByClassName('service');
    //var amountOfCharacteristics = document.getElementsByClassName('characteristic');
    //var amountOfDescriptors = document.getElementsByClassName('descriptor');

    // parse only if service is available
    if(amountOfServices !== 0) {
        for (var i = 0; i < amountOfServices.length; i++) {
            var service = {};
            var currentService = amountOfServices[i];

            // get all input and select elements from currentService
            var serviceElements = currentService.querySelectorAll("input, select");

            for (var j = 0; j < serviceElements.length; j++) {
                var sElement = serviceElements[j];

                if(sElement.key) {
                    service[sElement.name] = sElement.value;
                }
            }
            profileString += '{' + service + '"characteristics" : [';

            // get all nested characteristic elements from currentService
            var characteristicElements = currentService.getElementsByClassName('characteristic');
            if(characteristicElements.length !== 0) {
                for (var k = 0; k < characteristicElements.length; k++) {
                    var characteristic = {};
                    var cElement = characteristicElements[k];

                    if(cElement.key) {

                    }
                }
            } else {
                profileString += ']';
            }
        }
    } else {
        return null;
    }
    var profile = JSON.parse(profileString);
    console.log(JSON.stringify(profile));
    /*
    // iterate over all selected elements of the input form
    for (var i = 0; i < elements.length; i++) {
        // current element, either of type input of select
        var element = elements[i];
        var id = element.id;

        var key = element.name;
        var value = element.value;

        if(id.indexOf('descriptor') !== -1) {
            // add key value pair to object
            if (key) {
                descriptors[key] = value;
            }
        } else if(id.indexOf('characteristic') !== -1) {
            if (key) {
                characteristics[key] = value;
            }
        } else {
            if (key) {
                services[key] = value;
            }
        }

    }*/

    /*
    console.log(JSON.stringify(services));
    console.log(JSON.stringify(characteristics));
    console.log(JSON.stringify(descriptors));
    */
}

module.exports = router;
