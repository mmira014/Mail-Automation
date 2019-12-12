var express = require('express');
var router = express.Router();

router.post('/', (req, res) => {
    console.log('good post');
    console.log(req.body);
    let target_id = req.body.id;
    let newStreet = req.body.street;
    let newCity = req.body.city;
    let newState = req.body.state;
    let newZip = req.body.zip;
    const UPDATE_QUERY = "UPDATE Postal_Address SET street="+ connection.escape(newStreet)+", city="+connection.escape(newCity)+", state="+ connection.escape(newState)+ ", zip="+connection.escape(newZip)+" WHERE idPostalAddress="+connection.escape(target_id);
    console.log(UPDATE_QUERY);
    connection.query(UPDATE_QUERY, function(err, result) {
        if(err) {
            throw err;
        }
        else {
            console.log("Update successful.")
        }
    })
    res.send('update_done');
});

module.exports = router;