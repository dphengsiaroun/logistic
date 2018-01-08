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
		const sql = 'INSERT INTO xx_loader (id, content, user_id) VALUES ?';
		const value = [
			[i,
				`{"typeOfGoods":"Classique","transportTruckType":"Bétaillère","weightInterval":"De 50 à 100 kg",
				"imageId":1513239136301,"dimension":{"width":0.6,"height":0.7,"depth":0.8},"volume":0.34,
				"phone":"0787687656","infoRoute":"Distance : <b>0km</b> - Durée min. : <b>0h</b>",
				"infoDuration":"Durée effective : <b>7h14</b>","transportCategory":"Camion",
				"departureCity":{"city":"Abi Youcef","region":"Tizi Ouzou","country":"Algerie"},
				"arrivalCity":{"city":"Abi Youcef","region":"Tizi Ouzou","country":"Algerie"},
				"minDuration":0,"distance":0,"departureDatetime":"2017-12-21T13:00:00.000Z",
				"arrivalDatetime":"2017-12-21T20:14:41.900Z","conditioning":"Colis","priceWanted":${i},
				"title":"Chargement de${i}palette","userId":"45","login":"tata","created_t":1513251680,"id":"60",
				"image":{"name":"palette.JPG","size":202970,"type":"image/jpeg","url":"img/loader-default.svg",
				"thumbnailUrl":"img/loader-default.svg","deleteUrl":"ws/upload.php?file=palette.JPG",
				"deleteType":"DELETE"}}`,
				1]
		];
		con.query(sql, [value], function(err, result) {
			if (err) throw err;
			console.log('Number of records inserted: ', i);
		});
	}
});
