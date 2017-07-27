require('./lg-test.scss');
module.exports = 'lg-test';

const app = angular.module(module.exports, ['ui.router']);

const testsUrl = require('./tmpl/tests.html');
const testDatetimeUrl = require('./tmpl/test-datetime.html');
const testSliderUrl = require('./tmpl/test-slider.html');

app.config(function($stateProvider) {

	$stateProvider.state({
		name: 'tests',
		url: '/tests',
		template: testsUrl
	});
	$stateProvider.state({
		name: 'test:slider',
		url: '/test-slider',
		template: testSliderUrl,
		controller: function TestSliderCtrl($scope) {
			'ngInject';
			const ctrl = this;
			this.width = 100;
			this.height = 150;
			this.depth = 500;

			this.coef = 0.429;
			this.tx = 341;
			this.ty = 438;
			this.scale = 1.07;

			$scope.$watchGroup(['$ctrl.height', '$ctrl.depth', '$ctrl.width'], function() {
				ctrl.volume = ctrl.height *	ctrl.depth * ctrl.width / (100 * 100 * 100);
				ctrl.volume = Number((ctrl.volume).toFixed(2));
			}, true);
		},
		controllerAs: '$ctrl'
	});
	$stateProvider.state({
		name: 'test:datetime',
		url: '/test-datetime',
		template: testDatetimeUrl
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

const testNumUrl = require('./tmpl/test-num.html');
const test2Url = require('./tmpl/test2.html');
const testCalendarUrl = require('./tmpl/test-calendar.html');

app.component('lgTestNumRoute', {
	template: testNumUrl
});

app.component('lgTest2Route', {
	template: test2Url
});

app.component('lgTestCalendarRoute', {
	template: testCalendarUrl
});

