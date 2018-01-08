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
		const sql = 'INSERT INTO xx_carrier (id, content, user_id) VALUES ?';
		const values = [
			[i, 
				`{"truck":{"imageId":1513155757668,"name":"110000-111-${i}",
				"model":"Volvo","city":{"city":"Abi Youcef","region":"Tizi Ouzou","country":"Algérie"},
				"transportCategory":"Camion","transportTruckType":"Citerne","birthyear":2014,
				"image":{"name":"camion-citerne.jpg","size":95525,"type":"image/jpeg","url":"img/truck-default.svg",
				"thumbnailUrl":"img/truck-default.svg","deleteUrl":"ws/upload.php?file=camion-citerne.jpg",
				"deleteType":"DELETE"},"login":"toto","created_t":1513155764,"id":"110000-111-15"},
				"availability":"total","pricing":{"priceWantedPerKm":${i}},"phone":"0654342214","userId":"1",
				"login":"toto","created_t":1513155771}`,
				1]
		];
		con.query(sql, [values], function(err, result) {
			if (err) throw err;
			console.log('Number of records inserted: ', i);
		});
	}
});
