var mongodb = require('mongodb');

var db = null;

function connectDatabase() {
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
    });
    return db;
}

module.exports = connectDatabase();