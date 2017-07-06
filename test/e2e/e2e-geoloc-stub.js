'use strict';

const mysql = require('mysql');
const fs = require('fs');
const path = require('path');
const cfgUtils = require('../../cfg/utils.js');
var devEnv = cfgUtils.getEnv('dev');
const consolidate = require('consolidate');
const ejs = require('ejs');
consolidate.requires.ejs = ejs;

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

		consolidate.ejs(path.resolve(__dirname, './data/geoloc.sql'), devEnv.ws).then(function(sql) {
			connection.query(sql, function(error, results, fields) {
				if (error) throw error;
				// `results` is an array with one element for every statement in the query:
				const query = `
SELECT
	COUNT(*) AS count 
FROM
	${devEnv.ws.prefix}geoloc
`;
				connection.query(query,
					function(error, results, fields) {
						if (error) throw error;
						connection.end();
						expect(results[0].count).toEqual(15);
						done();
					});
			});
		});

	});

});
