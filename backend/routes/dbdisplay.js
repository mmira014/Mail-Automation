var express = require('express');
var router = express.Router();
var fs = require('fs');
const vision = require('@google-cloud/vision');
const maps = require('@google/maps')
//var filesystem = require("fs");

async function quickstart() {
	// [Starts text detection]
	// Imports the Google Cloud client library
	

	// Creates a client
	const client = new vision.ImageAnnotatorClient();

	const googleMapsClient = maps.createClient({
  		key: 'AIzaSyCetpay9unzzY9ILi4F5bUUOr6DK3UHpuc'
	});

	// Function to acquire all files from a folder
	var _getAllFiles = function(dir) {

	    
	    var results = [];

	    fs.readdirSync(dir).forEach(function(file) {

	        file = dir+'/'+file;
	        var stat = fs.statSync(file);

	        if (stat && stat.isDirectory()) {
	            results = results.concat(_getAllFiles(file))
	        } else results.push(file);

	    });

	    return results;

	};

	var images = _getAllFiles("./tempresources");

	var parsed_array = [];
	var parsedJson = [];

	// Beginning text detection for all image files
	for (var i = 0; i < images.length; i++) {
		//console.log("\n");
		//console.log(images[i]);

		const [result] = await client.documentTextDetection(images[i]);
		const fullTextAnnotation = result.fullTextAnnotation;


		//console.log(`Full text: ${fullTextAnnotation.text}`);
		//console.log(fullTextAnnotation.text);

		//Converting text to a single line for parsing purposes
		var temp = fullTextAnnotation.text.replace(/\n/g, " ");

		// console.log("Single line: ");
		// console.log(temp);

		//Geocoding api used to clean addresses
		googleMapsClient.geocode({
		  address: temp
		}, function(err, response) {
		  if (!err) {
		  	// console.log("Cleaning address result: ");
		  	//console.log(response.json.results[0]['formatted_address']);
		  	parsed_array.push(response.json.results[0]['address_components']);
		  }
		});
	}

	//Further parsing for readability and usage purposes
	for (var i = 0; i < parsed_array.length; i++) {
		let temp = {
			house_number: "",
			road: "",
			city: "",
			state: "",
			zipcode:""
		};
		//console.log(parsed_array[i]);

		var valid = 0;

		for (var j = 0; j < parsed_array[i].length; j++) {
			if (parsed_array[i][j]['types'] == 'street_number') {
				temp['house_number'] = parsed_array[i][j]['long_name'];
				valid++;
			}
			else if (parsed_array[i][j]['types'] == 'route') {
				temp['road'] = parsed_array[i][j]['long_name'];
				valid++;
			}
			else if (parsed_array[i][j]['types'][0] == 'locality') {
				temp['city'] = parsed_array[i][j]['long_name'];
				valid++;
			}
			else if (parsed_array[i][j]['types'][0] == 'administrative_area_level_1') {
				temp['state'] = parsed_array[i][j]['long_name'];
				valid++;
			}
			else if (parsed_array[i][j]['types'] == 'postal_code') {
				temp['zipcode'] = parsed_array[i][j]['long_name'];
				valid++;
			}
		}
		
		if (valid >= 5) {
			parsedJson.push([temp, "valid"]);
		}		
		else {
			parsedJson.push([temp, "invalid"]);
		}
	}

	//console.log(parsedJson);
	return parsedJson;
}
// [END vision_quickstart]

//quickstart().catch(console.error);

quickstart().then(x => console.log(x));

router.post('/filesubmit', function(req, res, next){
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
	/*
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
	*/
});

router.post('/loadmain', function(req, res, next){
	var returnnames = [];
	var returnstreets = [];
	var returncities = [];
	var returnstates = [];
	var returnzip = [];
	var returncapdate = [];
	var retrievequery = "SELECT Name, Street, City, State, Zip, Capture_date FROM Postal_Address WHERE Valid = 'valid'";
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