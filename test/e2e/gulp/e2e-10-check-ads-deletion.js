'use strict';

const init = require('./init.js');
const utils = require('../utils.js');
const data = require('../data/data.js');
const user = data.users[0];


describe('CHECK ADS DELETION', function() {

	beforeEach(function() {
		console.log('Test CHECK ADS DELETION', arguments);
	});

	it('should make uninstall', function() {
		console.log('-> should make uninstall', arguments);
		init.uninstall();
	});

	it('should make install', function() {
		console.log('-> should make install', arguments);
		init.install();
	});

	it('should go to website', function() {
		console.log('-> should go to website', arguments);
		init.goToWebsite();
	});

	it('should create a user', function() {
		console.log('-> create a user', arguments);
		utils.user.create(user);
	});

	it('should create a Loader ad', function() {
		console.log('-> create a Loader ad', arguments);
		utils.user.loaderAd.create(data.loaderAd[0]);
		console.log('-> Loader ad created', arguments);
	});

	it('should delete a user', function() {
		console.log('-> delete a user', arguments);
		element(by.css('menu-bar')).click();
		element(by.linkText('Mon profil')).click();
		element(by.linkText('Supprimer mon compte')).click();
		element.all(by.css('button.confirm')).click();
		element.all(by.css('button.ok')).click();
		console.log('-> user deleted');
		element(by.id('pr-retrieve-loader-ads-button')).click();
		const nbAds = element(by.id('noAds')).getText();
		expect(nbAds).toEqual('Aucune annonce de chargeur');
	});
});
