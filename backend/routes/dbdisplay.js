var express = require('express');
var router1 = express.Router();


router1.post('/loadmain', function(req, res, next){
	var returnnames1 = [];
	var returnstreets1 = [];
	var returncities1 = [];
	var returnstates1 = [];
	var returnzip1 = [];
	var returncapdate1 = [];
	var retrievequery1 = "SELECT Name, Street, City, State, Zip, Capture_date FROM Postal_Address WHERE Valid = 'valid'";
	connection.query(retrievequery1, function(err, result){
		if (err){
			console.error('sql error: ', err);
		}
		else{
			var i;
			for (i = 0; i < result.length; i++){
				returnnames1.push(result[i].Name);
				returnstreets1.push(result[i].Street);
				returncities1.push(result[i].City);
				returnstates1.push(result[i].State);
				returnzip1.push(result[i].Zip);
				returncapdate1.push(result[i].Capture_date);
			}
			console.log(returnnames1);
			console.log(returnstreets1);
			console.log(returncities1);
			console.log(returnstates1);
			console.log(returnzip1);
			console.log(returncapdate1);
			res.json({
				names: JSON.stringify(returnnames1),
				streets: JSON.stringify(returnstreets1),
				cities: JSON.stringify(returncities1),
				state: JSON.stringify(returnstates1),
				zips: JSON.stringify(returnzip1),
				capdates: JSON.stringify(returncapdate1)
			});
		}
	});
});

module.exports = router1;