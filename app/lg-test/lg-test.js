'use strict';

require('./lg-test.scss');
module.exports = 'lg-test';

var app = angular.module(module.exports, ['ui.router']);

var testsUrl = require('./tmpl/tests.html');

app.config(function($stateProvider) {

	$stateProvider.state({
		name: 'tests',
		url: '/tests',
		templateUrl: testsUrl
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
});

var testNumUrl = require('./tmpl/test-num.html');
var test2Url = require('./tmpl/test2.html');
var testCalendarUrl = require('./tmpl/test-calendar.html');

app.component('lgTestNumRoute', {
	templateUrl: testNumUrl
});

app.component('lgTest2Route', {
	templateUrl: test2Url
});

app.component('lgTestCalendarRoute', {
	templateUrl: testCalendarUrl
});

