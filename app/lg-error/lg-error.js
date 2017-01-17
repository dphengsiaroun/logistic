'use strict';

module.exports = 'lg-error';

var app = angular.module(module.exports, []);

app.filter('message', function() {
	return function(error) {
		var cfg = {
			'-1': 'Oups ! Erreur technique PHP.',
			'0': 'Oups ! Erreur technique.',
			'1': 'Login/Mot de passe incorrect.',
			'2': 'Ce login est déjà pris.',
			'3': 'Aie... Erreur technique... désolé.',
			'4': 'Email déjà pris.',
			'5': 'Authentification requise.',
			'7': 'Ancien mot de passe incorrect.',
			'8': 'Code de réactivation non valide.',
			'9': 'Code de réactivation expiré.',
		};
		if (error === undefined) {
			return '';
		}
		if (error.data && error.data.errorCode) {
			if (cfg[error.data.errorCode]) {
				return cfg[error.data.errorCode];
			}
			return 'TODO: implement message for code ' + error.data.errorCode;
		}
		if (error.status && error.status >= 400) {
			return 'Technical Error: HTTP status = ' + error.status;
		}
		console.error('TODO: implement message for error ' + error.data);
		return 'Unknown error.';
	};
});

app.component('lgError', {
	template: '<span ng-show="$ctrl.error">{{$ctrl.error | message }}</span>',
	bindings: {
		error: '<'
	}
});
