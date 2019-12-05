var express = require('express');
var router = express.Router();

const fs = require('fs');

router.get('/', function(req, res, next) {
    res.send("Good GET");
});

router.post('/', (req, res) => {
    var fstream;
    req.pipe(req.busboy);
    req.busboy.on('file', function(fieldname, file, filename) {
        console.log("Uploading:" + filename);
        fstream = fs.createWriteStream('./temp2/' + filename);
        file.pipe(fstream);
        fstream.on('close', function() {
            console.log("Done");
            // res.redirect('back');
        });
    });
    res.send("done");
});

module.exports = router;