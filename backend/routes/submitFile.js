
var express = require('express');
var router = express.Router();
var fs = require('fs');
const vision = require('@google-cloud/vision');
const maps = require('@google/maps')



router.get('/', function(req, res, next){
	var returnnames = [];
	var returnstreets = [];
	var returncities = [];
	var returnstates = [];
	var returnzip = [];
	var returncapdate = [];

	var capturedate = new Date().toISOString().slice(0, 19).replace('T', ' ');
	var index;
	fs.readdir("./temp2", function(err, items){
		console.log(items);
		quickstart().then(addresses => {
			console.log(addresses);
			for (index = 0; index < addresses.length; index++){
				var oldloc = "./temp2/" + items[index];
				var testfile = "./public/tempresources/" + items[index];
				fs.rename(oldloc, testfile, function(error){
							if (error){
								throw error;
							}
							else{
								console.log("image successfully moved");
							}
				})
				console.log(testfile);
				var street_address = addresses[index][0].house_number + " " + addresses[index][0].road;
				var insertquery = "INSERT INTO Postal_Address (Name, Street, City, State, Zip, Valid, File, Capture_date, Lat, Lng) VALUES (" + connection.escape("test") + "," + connection.escape(street_address ) + "," + connection.escape(addresses[index][0].city) + "," + connection.escape(addresses[index][0].state) + "," + connection.escape(addresses[index][0].zipcode) + "," + connection.escape(addresses[index][1]) + "," + connection.escape(testfile) + "," + connection.escape(capturedate) + "," + connection.escape(addresses[index][0].lat) + "," + connection.escape(addresses[index][0].lng) + ")";
				connection.query(insertquery, function(err, result){
					if (err){
						throw err;
					}
					else{
						console.log("sucessfully inserted");
					}
				})
			}		
			res.send("finished inserts");			
		})
		
	})
	
});

module.exports = router;
















var filesystem = require("fs");
async function quickstart() {
	// [Starts text detection]
	// Imports the Google Cloud client library
	

	// Creates a client
	const client = new vision.ImageAnnotatorClient();

	const googleMapsClient = maps.createClient({
  		key: ''
	});

	// Function to acquire all files from a folder
	var _getAllFiles = function(dir) {
	    var results = [];

	    filesystem.readdirSync(dir).forEach(function(file) {

	        file = dir+'/'+file;
	        var stat = filesystem.statSync(file);

	        if (stat && stat.isDirectory()) {
	            results = results.concat(_getAllFiles(file))
	        } else results.push(file);

	    });

	    return results;

	};

	var images = _getAllFiles("./temp2");

	var parsed_array = [];
	var parsedJson = [];
	var coordinates_array = [];

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
		  	coordinates_array.push(response.json.results[0]['geometry']['location']);
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
			zipcode:"",
			lat: "",
			lng: ""
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
		temp['lat'] = coordinates_array[i]['lat'];
		temp['lng'] = coordinates_array[i]['lng'];
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
