'use strict';

var app = angular.module('lg-user');

app.config(function ($stateProvider) {
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
		ctrl.$onInit = function () {
			carrier.list();
		};
	}
});
