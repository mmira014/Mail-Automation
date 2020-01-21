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
var updateRouter = require('./routes/update');

var app = express();

var connection = mysql.createConnection({
	host: '127.0.0.1',
	user: 'Mil',
	password: '123MillionThanks!',
	database: 'million_thanks'
})

connection.connect(function(err){
	if(!err){
		console.log("Database connected");
	}
	else{
		console.log("Error connecting database: " + err.message);
		process.exit(1);
	}
})
global.connection = connection;

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
app.use('/update', updateRouter);

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
