'use strict';

const mysql = require('mysql');
const fs = require('fs');
const path = require('path');
const cfgUtils = require('../../cfg/utils.js');
var devEnv = cfgUtils.getEnv('dev');

describe('Geoloc STUB', function() {

	it('should stub geoloc', function(done) {

		const connection = mysql.createConnection({
			host: devEnv.ws.host,
			port: devEnv.ws.port,
			user: devEnv.ws.user,
			password: devEnv.ws.mdp,
			database: devEnv.ws.bdd
		});

		connection.connect();

		var sql = fs.readFileSync(path.resolve(__dirname, './data/geoloc.sql'), 'utf8').toString();

		connection.query(sql, function(error, results, fields) {
			if (error) throw error;
			// `results` is an array with one element for every statement in the query:
			connection.query('SELECT COUNT(*) AS count FROM xx_geoloc', function(error, results, fields) {
				if (error) throw error;
				connection.end();
				expect(results[0].count).toEqual(15);
				done();
			});
		});
	});

});
