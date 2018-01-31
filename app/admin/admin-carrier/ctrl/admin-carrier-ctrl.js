export function AdminCarriersCtrl($filter, $stateParams, adminCarrier, exportToCsv) {
	'ngInject';
	const ctrl = this;
	ctrl.adminCarrier = adminCarrier;

	ctrl.limit = function() {
		this.limit = 50;
		console.log('ctrl.limit', ctrl);
	};

	ctrl.loadMore = function() {
		console.log('ctrl.loadMore', ctrl.loadMore);
		const moreData = ctrl.limit + 50;
		ctrl.limit = moreData > ctrl.carrier.length ? ctrl.carrier.length : moreData;
	};

	console.log('AdminCarriersCtrl');
	ctrl.$onInit = function() {
		adminCarrier.list().then(function(list) {
			ctrl.carriers = list;
			ctrl.limit();
			console.log('ctrl.carriers', ctrl.carriers);
		}).catch(function(error) {
			console.error('error', error);
		});
	};

	ctrl.export2Csv = () => {
		console.log('export2Csv');

		let csv = ctrl.carriers.map((carrier) => {
			return [
				carrier.id,
				$filter('date')(new Date(carrier.content.created_t * 1000), `short`),
				carrier.content.truck.name,
				carrier.content.truck.city.city,
				carrier.content.truck.city.region,
				(carrier.content.availability === 'total') ? 'Disponibilité totale' : 'Disponible pour un trajet spécifique',
				carrier.content.truck.transportCategory,
				carrier.content.truck.transportTruckType,
				carrier.content.pricing.priceWantedPerKm,
				carrier.from,
			];
		}).join('\n');
		/* eslint-disable */
		csv = `Sep=,
ID,DATE CREATION,TITRE,VILLE D'ORIGINE,REGION,DISPONIBILITE,CATEGORIE,TYPE DE TRANSPORT,PRIX DZD/KM,AUTEUR
` + csv;
		/* eslint-enable */
		exportToCsv.export(csv, 'annonces_transporteurs.csv');
	};
}
