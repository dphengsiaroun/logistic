function CarrierDetailCtrl($scope, $stateParams, connection, carrier) {
	'ngInject';
	const ctrl = this;
	ctrl.carrier = carrier;
	ctrl.connection = connection;
	ctrl.isEditable = false;
	
	
	ctrl.$onInit = function() {
		ctrl.carrier.get($stateParams.id).then(function() {
			return connection.waitForCheckConnection('CarrierCtrl');
		}).then(function() {
			ctrl.isEditable = (ctrl.carrier.current.content.userId === ctrl.connection.user.id);
			
		}).catch(function() {
			ctrl.isEditable = false;
		});
	};
}

import carrierDetailHtml from '../tmpl/carrier-detail.html';

export const lgCarrierRetrieveRoute = {
    template: carrierDetailHtml,
    controller: CarrierDetailCtrl,
};
