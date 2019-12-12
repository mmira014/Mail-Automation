var express = require('express');
var router = express.Router();


router.post('/invalid', function(req, res, next){
	var returnnames = [];
	var returnstreets = [];
	var returncities = [];
	var returnstates = [];
	var returnzip = [];
	var returncapdate = [];
	var returnID = [];
	var returnFile = [];
	var retrievequery = "SELECT File, idPostalAddress, Name, Street, City, State, Zip, Capture_date FROM Postal_Address WHERE Valid = 'invalid'";
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
				returnID.push(result[i].idPostalAddress);
				returnFile.push(result[i].File)
			}
			console.log(returnnames);
			console.log(returnstreets);
			console.log(returncities);
			console.log(returnstates);
			console.log(returnzip);
			console.log(returncapdate);
			console.log(returnID);
			console.log(returnFile);
			res.json({
				names: JSON.stringify(returnFile),
				streets: JSON.stringify(returnstreets),
				cities: JSON.stringify(returncities),
				state: JSON.stringify(returnstates),
				zips: JSON.stringify(returnzip),
				capdates: JSON.stringify(returncapdate),
				ids: JSON.stringify(returnID),
				Files: JSON.stringify(returnFile)
			});
		}
	});
});

module.exports = router;