import './lg-test.scss';
module.exports = 'lg-test';

import { lgTestSliderRoute } from './lg-test-slider-route.component.js';
import { lgTestCalendarRoute } from './lg-test-calendar-route.component.js';
import { lgTestLoadImageRoute } from './lg-test-load-image-route.component.js';
import { lgTestNumRoute } from './lg-test-num-route.component.js';


import testsHtml from './tmpl/tests.html';
import testDatetimeHtml from './tmpl/test-datetime.html';

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
	.component('lgTestNumRoute', lgTestNumRoute)
	.component('lgTestLoadImageRoute', lgTestLoadImageRoute)
	.component('lgTestSliderRoute', lgTestSliderRoute)
	.component('lgTestCalendarRoute', lgTestCalendarRoute);
