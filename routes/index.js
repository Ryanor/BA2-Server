var express = require('express');
var router = express.Router();
var mongodb = require('mongodb');

/**
 *  GET routes
 */
// get start page
router.get('/', function (req, res) {
    res.render('index', {title: 'Bluetooth LE Profile Generator'});
});

// route to get a profile form file
router.get('/profile', function (req, res) {
    res.render('profile', {title: 'Bluetooth LE Profile Generator'});
});

// route to information page
router.get('/about', function (req, res) {
    //res.render('about', {title: 'Bluetooth LE Profile Generator'});
});

router.get('/profilelist', function (req, res) {
   res.render('profilelist', {title: 'Bluetooth LE Profile Generator'});
});


/**
 *  POST routes
 */
// post route to store a profile to the database
router.post('/profile', function (req, res) {
    var db = req.db;
    var data = req.body;

    // insert POST request to database
    if(db != null) {
        db.collection("profiles").insertOne(data, function (err, record) {
            if (err) {
                res.status(500).send("Database write error!");
                throw err;
            }
            res.status(201).send("Data written to database!");
            console.log("Record added as " + record);
        });
    } else {
        res.status(500).send("Database not found!");
        console.log("Database not found!");
    }
});

router.post('/submit', function (req, res) {
    console.log("Submit called form index.js via post");
    res.send(req.body);
});

/**
 * REST API routes
 */
// load all profiles from database
router.get('/loadprofiles', function (req, res) {
    var db = req.db;

    db.collection('profiles').find({}).toArray( function(err, docs){
        if(err) {
            throw err;
        }
        res.json(docs);
    });
});

// delete a single profile from database using ID
router.delete('/deleteprofile/:id', function (req, res) {
    var db = req.db;

    var profile = req.params.id;
    db.collection('profiles').deleteOne({_id: new mongodb.ObjectID(profile) }, function(err) {
        res.send((err === null) ? { msg: '' } : { msg:'error: ' + err });
    });
});

// export all functions from router to the express application
module.exports = router;
