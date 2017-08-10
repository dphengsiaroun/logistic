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

		$window.values = function(obj) {
			return Object.keys(obj).map(function(key) {
				return obj[key];
			});
		};

		$window.makeMap = function(array) {
			const map = {};
			array.forEach(function(n) {
				map[n.id] = n;
			});
			return map;
		};

		$window.mobilecheck = function() {
			let check = false;
			/* eslint-disable */
			(function(a) {
				if (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0, 4))) check = true;
			})(navigator.userAgent || navigator.vendor || window.opera);
			/* eslint-enable */
			return check;
		};

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
