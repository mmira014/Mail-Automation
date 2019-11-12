'use strict';

async function quickstart() {
	// [Starts text detection]
	// Imports the Google Cloud client library
	const vision = require('@google-cloud/vision');

	// Creates a client
	const client = new vision.ImageAnnotatorClient();

	const googleMapsClient = require('@google/maps').createClient({
  		key: 'AIzaSyCetpay9unzzY9ILi4F5bUUOr6DK3UHpuc'
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
	var postal = require('node-postal');

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
		  	// console.log(response.json.results[0]['formatted_address']);

		  	// Parsing cleaned address using libpostal C library
		  	parsed_array.push(postal.parser.parse_address(response.json.results[0]['formatted_address']));

		  	// console.log("\nparsed result: ");
			// console.log(postal.parser.parse_address(response.json.results[0]['formatted_address']));
		  }
		});
		
		// fullTextAnnotation.pages.forEach(page => {
		//   page.blocks.forEach(block => {
		//     console.log(`Block confidence: ${block.confidence}`);
		//     block.paragraphs.forEach(paragraph => {
		//       console.log(`Paragraph confidence: ${paragraph.confidence}`);
		//       paragraph.words.forEach(word => {
		//         const wordText = word.symbols.map(s => s.text).join('');
		//         console.log(`Word text: ${wordText}`);
		//         console.log(`Word confidence: ${word.confidence}`);
		//         word.symbols.forEach(symbol => {
		//           console.log(`Symbol text: ${symbol.text}`);
		//           console.log(`Symbol confidence: ${symbol.confidence}`);
		//         });
		//       });
		//     });
		//   });
		// });
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

		for (var j = 0; j < parsed_array[i].length; j++) {
			if (parsed_array[i][j]['component'] == 'house_number') {
				temp['house_number'] = parsed_array[i][j]['value'];
			}
			else if (parsed_array[i][j]['component'] == 'road') {
				temp['road'] = parsed_array[i][j]['value'];
			}
			else if (parsed_array[i][j]['component'] == 'city') {
				temp['city'] = parsed_array[i][j]['value'];
			}
			else if (parsed_array[i][j]['component'] == 'state') {
				temp['state'] = parsed_array[i][j]['value'];
			}
			else if (parsed_array[i][j]['component'] == 'postcode') {
				temp['zipcode'] = parsed_array[i][j]['value'];
			}
		}
		parsedJson.push(temp);		
	}

	//console.log(parsedJson);
	return parsedJson;
}
// [END vision_quickstart]

//quickstart().catch(console.error);

quickstart().then(x => console.log(x));