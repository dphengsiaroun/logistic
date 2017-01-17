'use strict';

module.exports = 'lg-config';

var app = angular.module(module.exports, []);

app.run(['$injector', function($injector) {
	console.log('lg-config run', arguments);
	var $rootScope = $injector.get('$rootScope');
	$rootScope.config = {};
	$rootScope.config.typeOfGoods = ['Classique', 'Dangereux', 'Animaux', 'Massif', 'Frigo'];
	$rootScope.config.vehicleTypes = ['Bâche', 'Benne', 'Frigo'];
	$rootScope.config.countries = ['Algérie', 'France', 'Maroc'];
	$rootScope.config.cities = ['Alger', 'Abbana', 'Bejaia', 'Biskra', 'Constantine', 'Oran'];
	$rootScope.config.conditioningTypes = ['Colis', 'Palette', 'Vrac', 'Indifférent'];
	$rootScope.config.years = ['2005', '2006', '2007', '2008', '2009', '2010', '2011', '2012'];
	$rootScope.config.loaderTypes = ['Animaux', 'Classique', 'Dangereux', 'Frigo', 'Massif'];

	$rootScope.config.transportCategories = ['Camion', 'Avion', 'Bateau'];
	$rootScope.config.transportTruckTypes = ['Benne', 'Bâché', 'Frigo', 'Citerne', 'Porte voiture', 'Semi-remorque',
		'Semi-frigo', 'Bétaillère', 'Taxi'];
	$rootScope.config.transportBoatTypes = ['Bateau Barge', 'Navire Lo-Lo', 'Navire Réfrigéré & Reefer',
		'Navire Ro-Ro', 'Porte Conteneurs', 'Vraquiers', 'Ferries', 'Paquebots de croisière',
		'Chimiques Polyvalents', 'Chimiques Spécialisés', 'Gaz', 'Pétrole Brut & Tanker',
		'Pétrole Produits', 'Chalutier', 'Dragueur', 'Remorqueur', 'Service Offshore'];
	$rootScope.config.transportPlaneTypes = ['Avion Cargo', 'Avion Passagers', 'Avion d’affaire', 'Avion mixte',
		'Hélicoptère', 'Hydravion', 'Epandage Agricole', 'Avion de Tourisme', 'Avion lutte contre Incendie'];

	$rootScope.config.weightIntervals = ['Moins de 20 kg', 'De 20 à 50 kg', 'De 50 à 100 kg', 'De 100 à 500 kg',
		'De 500 kg à 1 tonne', 'De 1 à 5 tonnes', 'Plus de 5 tonnes'];
	$rootScope.config.volumes = ['100', '130', '180', '200'];
	$rootScope.config.prices = ['100', '200', '1000', '2000'];
	$rootScope.config.times = ['1 semaine', '15 jours', 'Maximum'];
	$rootScope.config.Address = ['2 rue de Paris, 1000 ALGER', '15 rue de Tripoli, 1100 ORAN'];
	$rootScope.config.goodTypes = ['Fruits frais', 'Légumes frais', 'Fruits et légumes frais'];
}]);
