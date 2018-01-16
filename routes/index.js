var express = require('express');
var router = express.Router();
var mongodb = require('mongodb');


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
    var db = null;
    var data = req.body;

    mongodb.MongoClient.connect('mongodb://localhost:27017/', function (err, database) {

        if (err) {
            console.log(err);
            process.exit(1);
        }

        db = database.db("BLEProfiles");
        if (db !== null) {
            console.log("Database connection ready");
        } else {
            console.log("Database not connected!");
        }

        db.listCollections({name: 'profiles'}).next(function (err, collinfo) {
            if (collinfo) {
                console.log("Collection exists");
            } else {
                db.createCollection("profiles", function (err, res) {
                    if (err) {
                        throw err;
                    }

                    console.log("Collection created!");
                });
            }
        });

        // insert POST request to database
        db.collection("profiles").insertOne(data, function (err, record) {
            if (err) {
                res.status(500).send("Database write error!");
                throw err;
            }
            res.status(200).send("Data written to database!");
            console.log("Record added as " + record);
        });

    });
});


module.exports = router;
