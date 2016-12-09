(function() {
	'use strict';

	var app = angular.module('lg-widget', []);
	
	app.component('lgPrompt', {
		templateUrl: 'lg-widget/tmpl/lg-prompt.html',
		bindings: {
			service: '<'
		}
	});
	
})();
