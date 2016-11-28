(function() {
	'use strict';

	var app = angular.module('lg-config', []);

	app.run(['$injector', function ($injector) {
		console.log('lg-config run', arguments);
		var $rootScope = $injector.get('$rootScope');
		$rootScope.config = {};
		$rootScope.config.vehicleTypes = ['Bâche', 'Benne', 'Frigo'];
		$rootScope.config.countries = ['Algérie', 'France', 'Maroc'];
		$rootScope.config.cities = ['Alger', 'Abbana','Bejaia', 'Biskra', 'Constantine', 'Oran'];
		$rootScope.config.conditionings = ['Colis', 'Palette','Vrac'];
		$rootScope.config.years = ['2005', '2006', '2007', '2008', '2009', '2010', '2011', '2012'];
		$rootScope.config.loaderTypes = ['Animaux', 'Classique', 'Dangereux', 'Frigo', 'Massif'];
		$rootScope.config.transportTypes = ['Avion', 'Bateau', 'Camion', 'Train'];
		$rootScope.config.weight = ['100', '130', '180', '200'];
		$rootScope.config.volumes = ['100', '130', '180', '200'];
		$rootScope.config.prices = ['100', '200', '1000', '2000'];
		$rootScope.config.times = ['1 semaine', '15 jours', 'Maximum'];
		$rootScope.config.Address = ['2 rue de Paris, 1000 ALGER', '15 rue de Tripoli, 1100 ORAN'];
		$rootScope.config.goodTypes = ['Fruits frais', 'Légumes frais', 'Fruits et légumes frais' ];
	}]);

	

})();
