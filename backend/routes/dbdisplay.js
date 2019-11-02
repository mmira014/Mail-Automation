var express = require('express');
var router = express.Router();
var fs = require('fs');

router.post('/', function(req, res, next){
	/*
	var names = req.body.names;
	var streets = req.body.streets;
	var cities = req.body.cities;
	var states = req.body.states;
	var zipcodes = req.body.zipcodes;
	*/
	var names = ["hi", "my", "name", "is"];
	var streets = ["hi", "my", "name", "is"];
	var cities = ["hi", "my", "name", "is"];
	var states = ["hi", "my", "name", "is"];
	var zip = ["92507", "92607", "92545", "92932"];


	var testfile = fs.readFileSync("C:\Users\GlimReaper\Documents\final-project-getjeff-d\backend/testfile.JPG")
	var index;
	for (index = 0; index < names.length; index++){
		var insertquery = "INSERT INTO Postal_Address (Street, City, State, Zip, Valid, File) VALUES (" + connection.escape(streets[index]) + "," + connection.escape(cities[index]) + "," + connection.escape(states[index]) + "," + connection.escape(zipcodes[index]) + "," + connection.escape("yes") + "," + connection.escape(testfile) + ")";
		connection.query(insertquery, function(err, result){
			if (err){
				console.error('sql error: ', err);
			}
			else{
				console.log("successfully inserted player profile link");
			}
		})
	}
})

module.exports = router;