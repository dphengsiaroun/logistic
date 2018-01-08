function CarrierListCtrl($scope, carrier, lgFilterList) {
	'ngInject';
	const ctrl = this;
	ctrl.carrier = carrier;
	ctrl.lgFilterList = lgFilterList;

	ctrl.limit = function() {
		this.limit = 50;
		console.log('ctrl.limit', ctrl);
	};

	ctrl.loadMore = function() {
		console.log('ctrl.loadMore', ctrl.loadMore);
			const moreData = ctrl.limit + 50;
			ctrl.limit = moreData > ctrl.carrier.length ? ctrl.carrier.length : moreData;
	};

	ctrl.$onInit = function() {
		carrier.list().then(function(list) {
			ctrl.list = list;
			ctrl.limit();
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
