'use strict';

require('./css/lg-home-route.scss');
module.exports = 'lg-route';

var app = angular.module(module.exports, ['ui.router']);

app.config(function($stateProvider, $urlRouterProvider, $locationProvider) {
	$locationProvider.hashPrefix('');
	$stateProvider.state({
		name: 'home',
		url: '/',
		component: 'lgHomeRoute',
		back: false
	});

	$urlRouterProvider.otherwise('/');
});

var homeUrl = require('./tmpl/home.html');

app.component('lgHomeRoute', {
	templateUrl: homeUrl,
	controller: function LgHomeCtrl(user) {
		'ngInject';
		console.log('LgHomeCtrl', arguments);
		user.waitForCheckConnection('LgHomeCtrl').then(function() {
			user.goToStateAfterConnect();
		}).catch(function() {
			console.log('No user connected.');
		});
	}
});
