import lgCarrierCreateTripCreateHtml from '../tmpl/carrier-create-trip-create.html';
import { breadcrumb } from '../carrier.breadcrumb.js';

export const lgCarrierCreateTripCreateRoute = {
	template: lgCarrierCreateTripCreateHtml,
	controller: function LgCarrierCreateTripCreateRouteCtrl(
		$scope, $state, connection, carrier, geoloc, formValidator) {
		'ngInject';
		this.breadcrumb = breadcrumb;
		this.fv = formValidator;
		if (carrier.type === 'create') {
			this.tripData = {};
		} else {
			this.tripData = carrier.createData.trip;
			
		}
		this.addTrip = () => {
			carrier.createData.trip = this.tripData;
			if (carrier.type === 'create') {
				$state.go('carrier:create');
			} else {
				$state.go('carrier:' + carrier.type, {login: connection.user.content.login, id: carrier.current.id});
			}
		};

		geoloc.updateInfoRoute($scope, '$ctrl.tripData');

	}
};
