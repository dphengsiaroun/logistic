'use strict';

var app = angular.module('lg-user');

app.config(function($stateProvider) {
	'ngInject';
	$stateProvider.state({
		name: 'user:ads',
		url: '/{login}/ads',
		component: 'lgUserAdsRoute'
	});
});

var adsUrl = require('../tmpl/ads.html');
app.component('lgUserAdsRoute', {
	templateUrl: adsUrl,
	controller: function LgUserAdsRouteCtrl($state, $stateParams, user, carrier, loader) {
		'ngInject';
		var ctrl = this;
		ctrl.user = user;
		ctrl.carrier = carrier;
		ctrl.loader = loader;
		console.log('user', user);
		ctrl.$onInit = function() {
			user.waitForCheckConnection().then(function() {
				return carrier.list({
					accountId: user.account.id
				});
			}).then(function(carriers) {
				console.log('carriers', carriers);
				ctrl.carriers = carriers;
			}).catch(function(error) {
				console.error('error', error);
			});
		};
	}
});
