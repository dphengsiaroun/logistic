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
	/*
	['loader'].forEach(function(type) {
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
var test2Url = require('./tmpl/test2.html');
var testCalendarUrl = require('./tmpl/test-calendar.html');

app.component('lgHomeRoute', {
	templateUrl: homeUrl
});

app.component('lgTestNumRoute', {
	templateUrl: testNumUrl
});

app.component('lgTest2Route', {
	templateUrl: test2Url
});

app.component('lgTestCalendarRoute', {
	templateUrl: testCalendarUrl
});

