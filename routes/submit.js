var express = require('express');
var router = express.Router();

router.get('/submit', function(req, res) {
    console.log("Submit get page:");
    console.log(req);
});

router.post('/submit', function(req, res) {
    console.log("Submit post page:");
    console.log(req);
    res.status(400);
});

module.exports = router;