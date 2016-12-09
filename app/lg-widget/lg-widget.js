(function() {
	'use strict';

	var app = angular.module('lg-widget', []);

	app.component('lgPrompt', {
		templateUrl: 'lg-widget/tmpl/lg-prompt.html',
		bindings: {
			service: '<'
		}
	});

	app.component('lgConfirm', {
		templateUrl: 'lg-widget/tmpl/lg-confirm.html',
		bindings: {
			service: '<'
		}
	});

	app.component('lgMessage', {
		templateUrl: 'lg-widget/tmpl/lg-message.html',
		bindings: {
			service: '<'
		}
	});

	app.component('lgFooter', {
		templateUrl: 'lg-widget/tmpl/lg-footer.html'
	});

})();
