'use strict';

var app = angular.module('lg-route', ['ui.router']);

app.config(function($stateProvider, $urlRouterProvider, $locationProvider) {
	$locationProvider.hashPrefix('');
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
		name: 'test:num',
		url: '/test-num',
		component: 'lgTestNumRoute'
	});
	$stateProvider.state({
		name: 'test2',
		url: '/test2',
		component: 'lgTest2Route'
	});

	$urlRouterProvider.otherwise('/');
});

var homeUrl = require('./tmpl/home.html');
var testNumUrl = require('./tmpl/test-num.html');

app.component('lgHomeRoute', {
	templateUrl: homeUrl
});

app.component('lgTestNumRoute', {
	templateUrl: testNumUrl
});

app.component('lgTest2Route', {
	templateUrl: 'lg-route/tmpl/test2.html'
});

app.component('lgTestCalendarRoute', {
	templateUrl: 'lg-route/tmpl/test-calendar.html'
});

