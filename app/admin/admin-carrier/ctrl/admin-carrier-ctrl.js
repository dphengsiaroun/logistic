export function AdminCarriersCtrl($stateParams, adminCarrier) {
	'ngInject';
	const ctrl = this;
	ctrl.adminCarrier = adminCarrier;
	
	ctrl.limit = function() {
		this.limit = 40;
		console.log('ctrl.limit', ctrl);
	};

	ctrl.loadMore = function() {
		console.log('ctrl.loadMore', ctrl.loadMore);
			const moreData = ctrl.limit + 10;
			ctrl.limit = moreData > ctrl.carrier.length ? ctrl.carrier.length : moreData;
	};

	console.log('AdminCarriersCtrl');
	ctrl.$onInit = function() {
		adminCarrier.list().then(function(list) {
			ctrl.carrier = list;
			ctrl.limit();
			console.log('ctrl.carrier', ctrl.carrier);
		}).catch(function(error) {
			console.error('error', error);
		});
	};
}
