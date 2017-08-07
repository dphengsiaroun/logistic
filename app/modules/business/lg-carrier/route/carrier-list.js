function CarrierListCtrl($scope, carrier, lgFilterList) {
	'ngInject';
	const ctrl = this;
	ctrl.carrier = carrier;
	ctrl.lgFilterList = lgFilterList;
	ctrl.$onInit = function() {
		carrier.list().then(function(list) {
			console.log('list', list);
			ctrl.list = list;
			lgFilterList.setup($scope, '$ctrl', ctrl);
		}).catch(function(error) {
			console.error('error', error);
		});
	};
}


import carrierListHtml from '../tmpl/carrier-list.html';

export const lgCarrierListRoute = {
	template: carrierListHtml,
	controller: CarrierListCtrl,
};
