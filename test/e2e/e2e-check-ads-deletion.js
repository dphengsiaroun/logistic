'use strict';

const utils = require('./utils.js');
const data = require('./data/data.js');

describe('Test CHECK ADS DELETION', function() {

	beforeEach(function() {
		console.log('Test CHECK ADS DELETION', arguments);
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
