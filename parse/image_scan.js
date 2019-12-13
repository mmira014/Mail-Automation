'use strict';

async function quickstart() {
	// [Starts text detection]
	// Imports the Google Cloud client library
	const vision = require('@google-cloud/vision');

	// Creates a client
	const client = new vision.ImageAnnotatorClient();

	const googleMapsClient = require('@google/maps').createClient({
  		//key: 'Your Key'
	});

	// Function to acquire all files from a folder
	var _getAllFiles = function(dir) {

	    var filesystem = require("fs");
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

	var images = _getAllFiles("./resources");

	var parsed_array = [];
	var coordinates_array = [];
	var parsedJson = [];

	// Beginning text detection for all image files
	for (var i = 0; i < 2; i++) {
		//console.log("\n");
		//console.log(images[i]);

		const [result] = await client.documentTextDetection(images[i]);
		const fullTextAnnotation = result.fullTextAnnotation;


		console.log(`Full text: ${fullTextAnnotation.text}`);
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
		  	coordinates_array.push(response.json.results[0]['geometry']['location']);
		  	console.log("\n");
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
			zipcode: "",
			lat: 0,
			lng: 0
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
		//console.log(coordinates_array[i]['lat']);
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

