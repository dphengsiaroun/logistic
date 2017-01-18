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

app.component('lgTestNumRoute', {
	templateUrl: testNumUrl
});

app.component('lgTest2Route', {
	templateUrl: test2Url
});

app.component('lgTestCalendarRoute', {
	templateUrl: testCalendarUrl
});

