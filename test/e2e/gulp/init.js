'use strict';

const mysql = require('mysql');
const path = require('path');
const cfgUtils = require('../../../cfg/utils.js');
const devEnv = cfgUtils.getEnv('dev');
const consolidate = require('consolidate');
const ejs = require('ejs');
consolidate.requires.ejs = ejs;
const utils = require('../utils.js');
const data = require('../data/data.js');
const init = {};
module.exports = init;

init.uninstall = function() {
	console.log('->init uninstall', arguments);
	browser.get(data.mainUrl + 'install');
	element(by.css('button')).click();
	// browser.sleep(35000);
	const message = element(by.css('h1'));
	expect(message.getText()).toEqual('Installation');
	expect(utils.isDirectoryExisting('../../files/')).toBe(false);
};

init.install = function() {
	console.log('->init install', arguments);
	element(by.xpath('//label[@for=\'dbCreation\']')).click();
	element(by.id('smtp.server.from')).clear().sendKeys('protractor@test.com');
	element(by.css('button')).click();
	const message = element(by.css('h3'));
	expect(message.getText()).toEqual('Successfully installed');
};

init.goToWebsite = function() {
	console.log('->init go to website', arguments);
	element(by.linkText('Go to website')).click();
	expect(browser.getCurrentUrl()).toEqual(data.mainUrl);
};

init.geolocStub = function() {
	console.log('->init geoloc stub', arguments);	
	const connection = mysql.createConnection({
		host: devEnv.ws.host,
		port: devEnv.ws.port,
		user: devEnv.ws.user,
		password: devEnv.ws.password,
		database: devEnv.ws.database
	});

	connection.connect();

	consolidate.ejs(path.resolve(__dirname, '../data/geoloc.sql'), devEnv.ws).then(function(sql) {
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
				});
		});
	});
};
