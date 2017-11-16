import lgCarrierCreateTripCreateHtml from '../tmpl/carrier-create-trip-create.html';
export const lgCarrierCreateTripCreateRoute = {
	template: lgCarrierCreateTripCreateHtml,
	controller: function LgCarrierCreateTripCreateRouteCtrl($scope, $state, connection, carrier, geoloc) {
		'ngInject';
		const ctrl = this;
		if (carrier.type === 'create') {
			ctrl.tripData = {};
		} else {
			ctrl.tripData = carrier.createData.trip;
			
		}
		ctrl.addTrip = function() {
			carrier.createData.trip = ctrl.tripData;
			
			if (carrier.type === 'create') {
				$state.go('carrier:create');
			} else {
				$state.go('carrier:' + carrier.type, {login: connection.user.content.login, id: carrier.current.id});
			}
		};

		geoloc.updateInfoRoute($scope, '$ctrl.tripData');

	}
};
