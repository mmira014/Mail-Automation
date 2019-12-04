var createError = require('http-errors');
var fs = require('fs');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var cors = require('cors');
var logger = require('morgan');
var mysql = require('mysql');
var busboy = require('connect-busboy');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var dbdisplayRouter = require('./routes/dbdisplay');
var fixaddressRouter = require('./routes/fixaddress');
var submitFileRouter = require('./routes/submitFile');
var uploadFilesRouter = require('./routes/uploadFiles');
var heatmapRouter = require('./routes/latlng');

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
/*
//THIS SECTION IS FOR DEMO PURPOSES ONLY (BEGIN)
	var returnnames = [];
	var returnstreets = [];
	var returncities = [];
	var returnstates = [];
	var returnzip = [];
	var returncapdate = [];


	
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
*/
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
app.use(busboy())

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/dbdisplay', dbdisplayRouter);
app.use('/fixaddress', fixaddressRouter);
app.use('/submitFile', submitFileRouter);
app.use('/upload', uploadFilesRouter);
app.use('/heatmap', heatmapRouter);

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

// app.use(cors());

// app.get('/process', (res,req) => {
// 	// quickstart();
// 	console.log("FIXME: PROCESS");
// })

module.exports = app;
