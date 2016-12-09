(function() {
	'use strict';

	var app = angular.module('lg-error', []);
	
	app.filter('message', function() {
		return function(code) {
			var cfg = {
				'1': 'Login/Mot de passe incorrect.',
				'2': 'Ce pseudo est déjà pris.',
				'3': 'Aie... Erreur technique... désolé.',
				'4': 'Email déjà pris.',
				
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
