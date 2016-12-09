(function() {
	'use strict';

	var app = angular.module('lg-error', []);
	
	app.filter('message', function() {
		return function(code) {
			var cfg = {
				'1': 'Login/Mot de passe incorrect.',
				
			};
			if (cfg[code]) {
				return cfg[code];
			}
			return 'TODO: implement message for code ' + code;
		};
	});
	
	app.component('lgError', {
		template: '<span ng-show="$ctrl.error">{{$ctrl.error.errorCode | message }}</span>',
		bindings: {
			error: '<'
		}
	});
	
})();
