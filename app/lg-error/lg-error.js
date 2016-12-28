(function() {
	'use strict';

	var app = angular.module('lg-error', []);

	app.filter('message', function() {
		return function(error) {
			var cfg = {
				'-1': 'Oups ! Erreur technique PHP.',
				'0': 'Oups ! Erreur technique.',
				'1': 'Login/Mot de passe incorrect.',
				'2': 'Ce pseudo est déjà pris.',
				'3': 'Aie... Erreur technique... désolé.',
				'4': 'Email déjà pris.',
				'7': 'Ancien mot de passe incorrect.',

			};
			if (error === undefined) {
				return '';
			}
			if (error.data && error.data.errorCode && cfg[error.data.errorCode]) {
				return cfg[code];
			}
			if (error.status && error.status >= 400) {
				return 'Technical Error: HTTP status = ' + error.status;
			}
			return 'TODO: implement message for code ' + code;
		};
	});

	app.component('lgError', {
		template: '<span ng-show="$ctrl.error">{{$ctrl.error | message }}</span>',
		bindings: {
			error: '<'
		}
	});

})();
