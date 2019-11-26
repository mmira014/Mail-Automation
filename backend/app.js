var createError = require('http-errors');
var fs = require('fs');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var cors = require('cors');
var logger = require('morgan');
var mysql = require('mysql');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var dbdisplayRouter = require('./routes/dbdisplay');
var fixaddressRouter = require('./routes/fixaddress');
var submitFileRouter = require('./routes/submitFile');

var app = express();

var connection = mysql.createConnection({
	host: '35.235.91.217',
	user: 'glim005',
	database: 'Many_thanks'
})

connection.connect(function(err){
	if(!err){
		console.log("Database connected");
	}
	else{
		console.log("Error connecting database: " + err.message);
	}
})
global.connection = connection;

//THIS SECTION IS FOR DEMO PURPOSES ONLY (BEGIN)
	var returnnames = [];
	var returnstreets = [];
	var returncities = [];
	var returnstates = [];
	var returnzip = [];
	var returncapdate = [];

	
	//var ts = Date.now();
	//var date_obj = new Date(ts);
	//var date = date_obj.getDate();
	//var month = date_obj.getMonth() + 1;
	//var year = date_obj.getFullYear();
	//var capturedate = year + "-" + month + "-" + date;
	
	var capturedate = new Date().toISOString().slice(0, 19).replace('T', ' ');
	var index;
	fs.readdir("tempresources", function(err, items){
		
		quickstart().then(addresses => {
			console.log(addresses)
			for (index = 0; index < addresses.length; index++){
				//console.log(addresses[index][0].lat);
				//console.log(addresses[index][0].lng);
				//var testfile = fs.readFileSync("tempresources/" + items[index]);
				var testfile = "tempresources/" + items[index];
				var street_address = addresses[index][0].house_number + " " + addresses[index][0].road;
				var insertquery = "INSERT INTO Postal_Address (Name, Street, City, State, Zip, Valid, File, Capture_date, Lat, Lng) VALUES (" + connection.escape("test") + "," + connection.escape(street_address ) + "," + connection.escape(addresses[index][0].city) + "," + connection.escape(addresses[index][0].state) + "," + connection.escape(addresses[index][0].zipcode) + "," + connection.escape(addresses[index][1]) + "," + connection.escape(testfile) + "," + connection.escape(capturedate) + "," + connection.escape(addresses[index][0].lat) + "," + connection.escape(addresses[index][0].lng) + ")";
				connection.query(insertquery, function(err, result){
					if (err){
						//console.error('sql error: ', err);
						//console.log('hi');
						throw err
					}
					else{
						console.log("sucessfully inserted");
					}
				})
			}
			
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
				}
			});
			
		})
		
	})


//THIS SECTION IS FOR DEMO PURPOSES ONLY (END)

app.use(function(req, res, next){
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
	next();
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/dbdisplay', dbdisplayRouter);
app.use('/fixaddress', fixaddressRouter);
app.use('/submitFile', submitFileRouter)

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;


//google cloud vision stuff
'use strict';
const vision = require('@google-cloud/vision');
const maps = require('@google/maps')
var filesystem = require("fs");
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

	    filesystem.readdirSync(dir).forEach(function(file) {

	        file = dir+'/'+file;
	        var stat = filesystem.statSync(file);

	        if (stat && stat.isDirectory()) {
	            results = results.concat(_getAllFiles(file))
	        } else results.push(file);

	    });

	    return results;

	};

	var images = _getAllFiles("./tempresources");

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
// [END vision_quickstart]

//quickstart().catch(console.error);

//quickstart().then(x => console.log(x));

