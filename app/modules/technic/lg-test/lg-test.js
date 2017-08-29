import './lg-test.scss';
module.exports = 'lg-test';

import { lgTestSliderRoute } from './lg-test-slider-route.component.js';
import { lgTestCalendarRoute } from './lg-test-calendar-route.component.js';


import testsHtml from './tmpl/tests.html';
import testDatetimeHtml from './tmpl/test-datetime.html';

import testNumHtml from './tmpl/test-num.html';
import testLoadImageHtml from './tmpl/test-load-image.html';

angular.module(module.exports, ['ui.router'])
	.config(function($stateProvider) {

		$stateProvider.state({
			name: 'tests',
			url: '/tests',
			template: testsHtml
		});
		$stateProvider.state({
			name: 'test:slider',
			url: '/test-slider',
			component: 'lgTestSliderRoute',
		});
		$stateProvider.state({
			name: 'test:datetime',
			url: '/test-datetime',
			template: testDatetimeHtml
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
			name: 'test:load-image',
			url: '/test/load-image',
			component: 'lgTestLoadImageRoute'
		});
	})
	.component('lgTestNumRoute', {
		template: testNumHtml
	})
	.component('lgTestLoadImageRoute', {
		template: testLoadImageHtml,
		controller: function TestLoadImageCtrl() {}
	})
	.component('lgTestSliderRoute', lgTestSliderRoute)
	.component('lgTestCalendarRoute', lgTestCalendarRoute);
