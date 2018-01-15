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
    console.log(req.body);

    // Logic goes here
  /*  var profile = convertForm(req.body);

    if (profile === null) {
        res.status(400);
    } else {
        //console.log(JSON.stringify(profile, null , 2));
        res.send(JSON.stringify(profile, null , 2));
    }
*/
});

function convertForm(data) {
    // boolean for comma separation
    var first = true;
    var count = 0;
    // boolean to set service start bracket
    var startServ = true;
    // boolean for service end bracket
    var endServ = false;
    var startChar = true;
    var endChar = false;
    var startDesc = true;
    var endDesc = false;

    // start profile as string
    var profileString = "[";

    var validKey;
    // get data out of json strings looking like
    // "service[1].name":"",
    // "service[1]characteristic[1].name":"",
    // "service[1]characteristic[1]descriptor[1].name":"",

    for (var key in data) {

        // before to start new service close the old service, its characteristics and descriptors first
        // false, false, false, key = service[X].Y
        if(endServ && endChar && endDesc && (key.indexOf('descriptor') === -1) ) {
            // close descriptors array first, characteristic next and  characteristics array last
            profileString += "] } ] }";
            startServ = true;
            endServ = false;
            startChar = true;
            endChar = false;
            startDesc = true;
            endDesc = false;
            //first = true;
        }

        // after first entry comma separation
        if (!first) {
            profileString += ',';
        }

        if (key.indexOf('service') !== -1) {
            first = false;

            // first service needs to start with {
            if (startServ) {
                profileString += "{";
                startServ = false;
                endServ = true;
            }

            if(key.indexOf('characteristic') === -1 && startChar) {
                validKey = getValidKey(key);
                profileString += '"' + validKey + '" : "' + data[key] + '"';
            } else if(!endChar) {
                profileString += '"characteristics" : [';
            }

            if (key.indexOf('characteristic') !== -1) {
                first = false;

                // first characteristic needs to start with {
                if (startChar) {
                    profileString += "{";
                    startChar = false;
                    endChar = true;
                }

                // not descriptor
                if(key.indexOf('descriptor')  === -1 && startDesc) {
                    validKey = getValidKey(key);
                    profileString += '"' + validKey + '" : "' + data[key] + '"';
                } else if (!endDesc) {
                    profileString += '"descriptors" : [';
                }
                if(key.indexOf('descriptor')  !== -1) {
                    first = false;

                    // first descriptor needs to start with {
                    if (startDesc) {
                        profileString += "{";
                        startDesc = false;
                        endDesc = true;
                    }

                    validKey = getValidKey(key);
                    profileString += '"' + validKey + '" : "' + data[key] + '"';

                    count ++;
                    // counter for max entries in a descriptor
                    if( count === 4) {
                        count = 0;
                        startDesc = true;
                        // close bracket of description
                        profileString += "}";
                    }
                } else {

                }
            }
        }
        console.log("Key: " + validKey + " / Value: " + data[key]);
    }

    // close service and profile array
    profileString += "}]";
    console.log(profileString);

    return JSON.parse(profileString);
}

function getValidKey(key) {
    return key.split('.')[1];
}

module.exports = router;
