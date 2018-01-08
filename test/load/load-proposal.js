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
		const sql = 'INSERT INTO xx_proposal (id, content, user_id, ad_id, ad_user_id, ad_type) VALUES ?';
		const value = [
			[i, 
				'{"message":"Bonjour, j\'aimerais vous faire une offre contactez-moi. Merci.","name":"toto10","email":"toto10@mail.com","proposalAccountId":"10","adId":"107","titleAd":"110000-111-24","imageUrl":"img/truck-default.svg","adAccountId":"1","adType":"carrier","userId":"10","login":"toto10","created_t":1514880767}', 
				10, 107, 1, 'carrier']
		];
		con.query(sql, [value], function(err, result) {
			if (err) throw err;
			console.log('Number of records inserted: ' + i);
		});
    }
});
