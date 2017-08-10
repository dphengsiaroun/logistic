export function LgConfig($rootScope, $http, $window, $state, $parse) {
	'ngInject';
	const config = this;
	config.init = () => {
		$rootScope.config = config;

		$rootScope.back = function() {
			console.log('back', arguments);
			$window.history.back();
		};

		$rootScope.goto = function(url) {
			console.log('goto', arguments);
			$window.location.href = url;
		};

		$rootScope.goToState = function(state) {
			console.log('goToState', arguments);
			const array = state.split(/[()]/);
			const to = array[0];
			const params = $parse(array[1])({});
			console.log('goto', to, params);
			$state.go(to, params);
		};

		$rootScope.hello = function() {
			// alert('hello');
		};

		// Fix the jQuery issue
		/* eslint-disable angular/window-service */
		$window.jQuery = window.jQuery;
		$window.$ = window.jQuery;
		/* eslint-enable */
	};

	config.typeOfGoods = ['Classique', 'Dangereux', 'Animaux', 'Massif', 'Frigo'];
	config.vehicleTypes = ['Bâche', 'Benne', 'Frigo'];
	config.countries = ['Algérie', 'France', 'Maroc'];
	config.conditioningTypes = ['Colis', 'Palette', 'Vrac', 'Indifférent'];
	const year = (new Date()).getFullYear();
	config.years = [...Array(19).keys()].map((n, i) => year - i);
	config.years.push('avant ' + (year - 18));
	console.log('config.years', config.years);
	config.loaderTypes = ['Animaux', 'Classique', 'Dangereux', 'Frigo', 'Massif'];

	config.transportCategories = ['Camion', 'Avion', 'Bateau'];
	config.transportTruckTypes = ['Benne', 'Bâché', 'Frigo', 'Citerne', 'Porte voiture', 'Semi-remorque',
		'Semi-frigo', 'Bétaillère', 'Taxi'
	];
	config.transportBoatTypes = ['Bateau Barge', 'Navire Lo-Lo', 'Navire Réfrigéré & Reefer',
		'Navire Ro-Ro', 'Porte Conteneurs', 'Vraquiers', 'Ferries', 'Paquebots de croisière',
		'Chimiques Polyvalents', 'Chimiques Spécialisés', 'Gaz', 'Pétrole Brut & Tanker',
		'Pétrole Produits', 'Chalutier', 'Dragueur', 'Remorqueur', 'Service Offshore'
	];
	config.transportPlaneTypes = ['Avion Cargo', 'Avion Passagers', 'Avion d’affaire', 'Avion mixte',
		'Hélicoptère', 'Hydravion', 'Epandage Agricole', 'Avion de Tourisme', 'Avion lutte contre Incendie'
	];

	config.weightIntervals = ['Moins de 20 kg', 'De 20 à 50 kg', 'De 50 à 100 kg', 'De 100 à 500 kg',
		'De 500 kg à 1 tonne', 'De 1 à 5 tonnes', 'Plus de 5 tonnes'
	];
	config.volumes = ['100', '130', '180', '200'];
	config.prices = ['100', '200', '1000', '2000'];
	config.times = ['1 semaine', '2 Semaines', '1 mois', '2 mois', 'Illimité'];
	config.Address = ['2 rue de Paris, 1000 ALGER', '15 rue de Tripoli, 1100 ORAN'];
	config.goodTypes = ['Fruits frais', 'Légumes frais', 'Fruits et légumes frais'];

	config.getCityLabel = function(obj) {
		if (obj.city === undefined) {
			return obj;
		}

		return '<b>' + obj.city + '</b>, <span class="region">' + obj.region + ', ' + obj.country + '</span>';
	};

	config.getCityIcon = function() {
		return '<i class="fa fa-map-marker" aria-hidden="true"></i>';
	};

	config.getWeightIcon = function() {
		return '<i class="fa fa-balance-scale" aria-hidden="true"></i>';
	};

	config.getLoaderTypesIcon = function(label) {
		switch (label) {
			case 'Animaux':
				return '<i class="fa fa-paw" aria-hidden="true"></i>';
			case 'Classique':
				return '<i class="fa fa-archive" aria-hidden="true"></i>';
			case 'Dangereux':
				return '<i class="fa fa-exclamation-triangle" aria-hidden="true"></i>';
			case 'Frigo':
				return '<i class="fa fa-snowflake-o" aria-hidden="true"></i>';
			case 'Massif':
				return '<i class="fa fa-th-large" aria-hidden="true"></i>';
		}
		return '<i class="fa fa-archive" aria-hidden="true"></i>';
	};


	config.getCityLabelToFilter = function(obj) {
		if (obj.city === undefined) {
			return obj;
		}

		return obj.city;
	};

	$http.get('ws/cities').then(function(response) {
		config.cities = response.data;
		config.cities.forEach((obj) => {
			obj.country = 'Algérie';
		});
	}).catch(function(error) {
		console.error('error', error);
	});

	$http.get('ws/config/retrieve.php').then(function(response) {
		config.serverConfig = response.data.serverConfig;
		console.log('config', config);
	}).catch(function(error) {
		console.error('error', error);
	});

	config.getTruckTypesIcon = function(label) {
		['Benne', 'Bâché', 'Frigo', 'Citerne', 'Porte voiture', 'Semi-remorque',
			'Semi-frigo', 'Bétaillère', 'Taxi'
		];
		switch (label) {
			case 'Benne':
				return '<img-svg src="/img/truck-type/benne.svg"></img-svg>';
			case 'Bâché':
				return '<img-svg src="/img/truck-type/covered-truck.svg"></img-svg>';
			case 'Frigo':
				return '<img-svg src="/img/truck-type/frigo.svg"></img-svg>';
			case 'Citerne':
				return '<img-svg src="/img/truck-type/tank-truck.svg"></img-svg>';
			case 'Porte voiture':
				return '<img-svg src="/img/truck-type/evacuator.svg"></img-svg>';
			case 'Semi-remorque':
				return '<img-svg src="/img/truck-type/semi-trailer.svg"></img-svg>';
			case 'Semi-frigo':
				return '<img-svg src="/img/truck-type/semi-trailer-fridge.svg"></img-svg>';
			case 'Bétaillère':
				return '<img-svg src="/img/truck-type/animal-truck.svg"></img-svg>';
			case 'Taxi':
				return '<img-svg src="/img/truck-type/taxi-truck.svg"></img-svg>';

		}
		return '<img-svg src="/img/questions.svg"></img-svg>';
	};
}
