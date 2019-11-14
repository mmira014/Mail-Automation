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
	var returnnames = [];
	var returnstreets = [];
	var returncities = [];
	var returnstates = [];
	var returnzip = [];
	var returncapdate = [];


	var names = ["hi", "my", "name", "is"];
	var streets = ["hi", "my", "name", "is"];
	var cities = ["hi", "my", "name", "is"];
	var states = ["hi", "my", "name", "is"];
	var zipcodes = ["92507", "92607", "92545", "92932"];
	var capturedate = new Date().toISOString().slice(0, 19).replace('T', ' ');


	var testfile = fs.readFileSync("../testfile.JPG")
	var index;
	for (index = 0; index < names.length; index++){
		var insertquery = "INSERT INTO Postal_Address (Name, Street, City, State, Zip, Valid, File, Capture_date,) VALUES (" + connection.escape(names[index]) + "," + connection.escape(streets[index]) + "," + connection.escape(cities[index]) + "," + connection.escape(states[index]) + "," + connection.escape(zipcodes[index]) + "," + connection.escape("yes") + "," + connection.escape(testfile) + "," + connection.escape(capturedate) + ")";
		connection.query(insertquery, function(err, result){
			if (err){
				console.error('sql error: ', err);
			}
			else{
				console.log("successfully inserted");
			}
		})
	}

	var retrievequery = "SELECT Name, Street, City, State, Zip, Capture_date FROM Postal_Address WHERE Valid = 'yes'";
	connection.query(retrievequery, function(err, result){
		if (err){
			console.error('sql error: ', err);
		}
		else{
			var i;
			for (i = 0; i < result.length; i++){
				returnnames.push(result[i].Name);
				returnstreets.push(result[i].Street);
				returncities.push(result[i].City);
				returnstates.push(result[i].State);
				returnzip.push(result[i].Zip);
				returncapdate.push(result[i].Capture_date);
			}
			res.json({
				names: JSON.stringify(returnnames),
				streets: JSON.stringify(returnstreets),
				cities: JSON.stringify(returncities),
				state: JSON.stringify(returnstates),
				zips: JSON.stringify(returnzip),
				capdates: JSON.stringify(returncapdate)
			});
		}
	});
});

router.post('/loadmain', function(req, res, next){
	var returnnames = [];
	var returnstreets = [];
	var returncities = [];
	var returnstates = [];
	var returnzip = [];
	var returncapdate = [];
	var retrievequery = "SELECT Name, Street, City, State, Zip, Capture_date FROM Postal_Address WHERE Valid = 'yes'";
	connection.query(retrievequery, function(err, result){
		if (err){
			console.error('sql error: ', err);
		}
		else{
			var i;
			for (i = 0; i < result.length; i++){
				returnnames.push(result[i].Name);
				returnstreets.push(result[i].Street);
				returncities.push(result[i].City);
				returnstates.push(result[i].State);
				returnzip.push(result[i].Zip);
				returncapdate.push(result[i].Capture_date);
			}
			console.log(returnnames);
			console.log(returnstreets);
			console.log(returncities);
			console.log(returnstates);
			console.log(returnzip);
			console.log(returncapdate);
			res.json({
				names: JSON.stringify(returnnames),
				streets: JSON.stringify(returnstreets),
				cities: JSON.stringify(returncities),
				state: JSON.stringify(returnstates),
				zips: JSON.stringify(returnzip),
				capdates: JSON.stringify(returncapdate)
			});
		}
	});
});

module.exports = router;