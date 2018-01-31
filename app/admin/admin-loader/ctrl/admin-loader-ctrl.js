export function AdminLoadersCtrl($filter, $stateParams, adminLoader, exportToCsv) {
	'ngInject';
	const ctrl = this;
	ctrl.adminLoader = adminLoader;

	ctrl.limit = function() {
		this.limit = 50;
		console.log('ctrl.limit', ctrl);
	};

	ctrl.loadMore = function() {
		console.log('ctrl.loadMore', ctrl.loadMore);
			const moreData = ctrl.limit + 50;
			ctrl.limit = moreData > ctrl.loader.length ? ctrl.loader.length : moreData;
	};

	ctrl.$onInit = function() {
		adminLoader.list().then(function(list) {
			ctrl.loaders = list;
			ctrl.limit();
			console.log('ctrl.loader', ctrl.loader);
		}).catch(function(error) {
			console.error('error', error);
		});
	};

	ctrl.export2Csv = () => {
		console.log('export2Csv');

		let csv = ctrl.loaders.map((loader) => {
			return [
				loader.id,
				loader.content.title,
				loader.content.transportCategory,
				loader.content.transportTruckType,
				loader.content.departureCity.city,
				$filter('date')(loader.content.departureDatetime, `EEEE d LLLL yyyy à H'h'`),
				loader.content.arrivalCity.city,
				$filter('date')(loader.content.arrivalDatetime, `EEEE d LLLL yyyy à H'h'`),				
				loader.content.conditioning,
				loader.content.typeOfGoods,
				loader.content.weightInterval,
				loader.content.priceWanted,
				loader.from
			];
		}).join('\n');
		/* eslint-disable */
		csv = `Sep=,
ID,TITRE,CATEGORIE,TYPE DE CAMION,VILLE DEPART,DATE DEPART,VILLE ARRIVEE,DATE ARRIVEE,CONDITIONING,TYPE DE MARCHANDISE,TRANCHE DE POIDS,PRIX SOUHAITE,AUTEUR
` + csv;
		/* eslint-enable */
		exportToCsv.export(csv);
	};
}