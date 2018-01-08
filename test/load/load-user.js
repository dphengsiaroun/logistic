const mysql = require('mysql');
const cfgUtils = require('../../cfg/utils.js');
const devEnv = cfgUtils.getEnv('dev');

const user = devEnv.ws.user;
const password = devEnv.ws.password;
const hostname = devEnv.ws.host;
const port = devEnv.ws.port;
const database = devEnv.ws.database;

const con = mysql.createConnection({
	host: hostname,
	port: port,
	user: user,
	database: database,
	password: password,
	multipleStatements: true,
});

con.connect(function(err) {
	if (err) throw err;
	console.log('Connected to the database!');
	for (let i = 1; i <= 1000; i++) {
		const sql = 'INSERT INTO xx_user (id, email, login, phone, password, content) VALUES ?';
		const values = [
			[i, 
				`toto${i}@mail.com`, `toto${i}`, '0741979983', 
				'9f86d081884c7d659a2feaa0c55ad015a3bf4f1b2b0b822cd15d6c15b0f00a08', 
				`{"login":"toto${i}","lastname":"toto${i}","firstname":"toto${i}",
				"profile":"both","address":{"street":"${i} rue de Paris","zipcode":"77200",
				"city":"Torcy","country":"Algerie"},"phone":"0654342214"}`]
		];
		con.query(sql, [values], function(err, result) {
			if (err) throw err;
			console.log('Number of records inserted: ', i);
		});
    }
});
