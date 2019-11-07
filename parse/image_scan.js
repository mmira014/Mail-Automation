'use strict';

async function quickstart() {
	// [Starts text detection]
	// Imports the Google Cloud client library
	const vision = require('@google-cloud/vision');

	// Creates a client
	const client = new vision.ImageAnnotatorClient();

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

	// Beginning text detection for all image files
	for (var i = 0; i < images.length; i++) {
		console.log("\n");
		console.log(images[i]);

		const [result] = await client.documentTextDetection(images[i]);
		const fullTextAnnotation = result.fullTextAnnotation;
		console.log(`Full text: ${fullTextAnnotation.text}`);
		//console.log(fullTextAnnotation.text);
		var temp = fullTextAnnotation.text.replace(/\n/g, " ");
		//console.log(postal.expand.expand_address(temp));
		console.log(postal.parser.parse_address(temp));
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
}
// [END vision_quickstart]

quickstart().catch(console.error);