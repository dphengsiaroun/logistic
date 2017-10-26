export function AdminCarriersCtrl($stateParams, adminCarrier) {
	'ngInject';
	const ctrl = this;
	ctrl.adminCarrier = adminCarrier;
	console.log('AdminCarriersCtrl');
	ctrl.$onInit = function() {
		adminCarrier.list().then(function(list) {
			ctrl.carrier = list;
			console.log('ctrl.carrier', ctrl.carrier);
		}).catch(function(error) {
			console.error('error', error);
		});
	};
}
