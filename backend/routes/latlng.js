var express = require('express');
var router = express.Router();


router.post('/heatmap', function(req, res, next){
	var returnlat = [];
	var returnlng = [];
	var retrievequery = "SELECT Lat, Lng FROM Postal_Address WHERE Valid = 'valid'";
	connection.query(retrievequery, function(err, result){
		if (err){
			console.error('sql error: ', err);
		}
		else{


			var i;
			for (i = 0; i < result.length; i++){
				returnlat.push(result[i].Lat);
				returnlng.push(result[i].Lng);
			}
			console.log(returnlat);
			console.log(returnlng);

			res.json({
   				Lat: JSON.stringify(returnlat),
   				Lng: JSON.stringify(returnlng)
			});
		}
	});
});

module.exports = router;