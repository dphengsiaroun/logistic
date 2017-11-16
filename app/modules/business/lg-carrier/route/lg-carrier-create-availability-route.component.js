import lgCarrierCreateAvailabilityHtml from '../tmpl/carrier-create-availability.html';

export const lgCarrierCreateAvailabilityRoute = {
	template: lgCarrierCreateAvailabilityHtml,
	controller: function LgCarrierCreateAvailabilityRouteCtrl($state, connection, carrier) {
		'ngInject';
		const ctrl = this;
		ctrl.select = function(str) {
			carrier.createData.availability = str;
			if (str === 'total') {
				if (carrier.type === 'create') {
					$state.go('carrier:create');
				} else {
					$state.go('carrier:' + carrier.type, 
						{ login: connection.user.content.login, id: carrier.current.id });
				}
			}
			if (str === 'specificTrip') {
				$state.go('carrier:create:trip:create');
			}
		};
	}
};
