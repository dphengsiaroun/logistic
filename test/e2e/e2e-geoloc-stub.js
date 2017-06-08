'use strict';

const mysql = require('mysql');
const cfgUtils = require('../../cfg/utils.js');
var devEnv = cfgUtils.getEnv('dev');

describe('Geoloc STUB', function() {
	
	const connection = mysql.createConnection({
		host: devEnv.ws.host,
		user: devEnv.ws.user,
		password: devEnv.ws.mdp,
		database: devEnv.ws.bdd
	});

	connection.connect();

	connection.query('SELECT 1 + 1 AS solution', function(error, results, fields) {
		if (error) throw error;
		console.log('The solution is: ', results[0].solution);
	});

	connection.end();

});
