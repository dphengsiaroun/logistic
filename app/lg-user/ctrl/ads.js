'use strict';

var app = angular.module('lg-user');

app.config(function($stateProvider) {
	'ngInject';
	$stateProvider.state({
		name: 'user:ads',
		url: '/user/ads',
		component: 'lgUserAdsRoute'
	});
});

var adsUrl = require('../tmpl/ads.html');
app.component('lgUserAdsRoute', {
	templateUrl: adsUrl,
	controller: function LgUserAdsRouteCtrl($state, $stateParams, user, carrier, loader) {
		'ngInject';
		var ctrl = this;
		ctrl.loader = loader;
		ctrl.carrier = carrier;
		ctrl.user = user;
		// ctrl.$onInit = function() {
		// 	ctrl.loader.list();
		// 	ctrl.carrier.list();
		// };
		ctrl.$onInit = function() {
        ctrl.loader.get($stateParams.id).then(function() {
            return ctrl.user.waitForCheckConnection('LgUserAdsRouteCtrl');
        }).then(function() {
            ctrl.loader.carrierAds = angular.copy(ctrl.loader.current.content);
            ctrl.loader.carrierAds.oldId = $stateParams.id;
            console.log('ctrl.loader.carrierAds', ctrl.loader.carrierAds);
        }).catch(function() {
            console.error('you should not see this');
        });
    };
	}
});
