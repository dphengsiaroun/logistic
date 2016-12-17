(function() {
	'use strict';

	var camelize = function(str) {
		return str.replace(/(?:^\w|[A-Z]|\b\w)/g, function(letter, index) {
			return index == 0 ? letter.toLowerCase() : letter.toUpperCase();
		}).replace(/\s+/g, '');
	};

	var app = angular.module('lg-route', ['ui.router']);

	app.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {

		$stateProvider.state({
			name: 'home',
			url: '/',
			component: 'lgHomeRoute',
			back: false
		});
		/*['loader'].forEach(function(type) {
			$stateProvider.state({
				name: type + ':createAdStep1',
				url: '/' + type + '-create-ad',
				component: 'lg' + camelize(type) + 'CreateAdStep1Route'
			});
			$stateProvider.state({
				name: 'loader:createAdStep2',
				url: '/loader-create-ad',
				component: 'lgLoaderCreateAdStep2Route'
			});
			$stateProvider.state({
				name: 'loader:listAd',
				url: '/loader-list',
				component: 'lgLoaderListAdRoute'
			});
			$stateProvider.state({
				name: 'loader:ad',
				url: '/loader-ad',
				component: 'lgLoaderAdRoute'
			});
			$stateProvider.state({
				name: 'loader:createProposal',
				url: '/loader-create-proposal',
				component: 'lgLoaderCreateProposalRoute'
			});
			$stateProvider.state({
				name: 'loader:createProposalSent',
				url: '/loader-create-proposal',
				component: 'lgLoaderCreateProposalSentRoute'
			});
		});*/

		$stateProvider.state({
			name: 'test:calendar',
			url: '/test-calendar',
			component: 'lgTestCalendarRoute'
		});
		$stateProvider.state({
			name: 'test',
			url: '/test',
			component: 'lgTestRoute'
		});
		$stateProvider.state({
			name: 'test2',
			url: '/test2',
			component: 'lgTest2Route'
		});

		$urlRouterProvider.otherwise('/');
	}]);

	app.component('lgHomeRoute', {
		templateUrl: 'lg-route/tmpl/home.html'
	});

	app.component('lgTestRoute', {
		templateUrl: 'lg-route/tmpl/test.html'
	});

	app.component('lgTest2Route', {
		templateUrl: 'lg-route/tmpl/test2.html'
	});

	app.component('lgTestCalendarRoute', {
		templateUrl: 'lg-route/tmpl/test-calendar.html'
	});


})();
