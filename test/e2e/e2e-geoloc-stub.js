'use strict';

const mysql = require('mysql');
const fs = require('fs');
const path = require('path');
const cfgUtils = require('../../cfg/utils.js');
var devEnv = cfgUtils.getEnv('dev');

describe('Geoloc STUB', function() {

	it('should stub geoloc', function() {

		const connection = mysql.createConnection({
			host: devEnv.ws.host,
			port: devEnv.ws.port,
			user: devEnv.ws.user,
			password: devEnv.ws.mdp,
			database: devEnv.ws.bdd
		});

		connection.connect();

		connection.query('SELECT 1 + 1 AS solution', function(error, results, fields) {
			if (error) throw error;
			console.log('The solution is: ', results[0].solution);
		});

		var sql = fs.readFileSync(path.resolve(__dirname, './data/geoloc.sql'), 'utf8').toString();

		connection.query(sql, function(error, results, fields) {
			if (error) throw error;
			// `results` is an array with one element for every statement in the query:
			console.log('SQL Inserted.');
		});

		connection.end();
	});

});
