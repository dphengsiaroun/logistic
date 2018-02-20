import lgCarrierCreateAvailabilityHtml from '../tmpl/carrier-create-availability.html';
import { breadcrumb } from '../carrier.breadcrumb.js';

export const lgCarrierCreateAvailabilityRoute = {
	template: lgCarrierCreateAvailabilityHtml,
	controller: function LgCarrierCreateAvailabilityRouteCtrl($state, connection, carrier) {
		'ngInject';
		this.breadcrumb = breadcrumb;
		this.select = (str) => {
			carrier.stepData.availability = str;
			if (str === 'total') {
				if (carrier.type === 'create') {
					$state.go('carrier:create');
				} else {
					$state.go('carrier:' + carrier.type, 
						{ login: connection.user.content.login, id: carrier.stepData.availability.id });
				}
			}
			if (str === 'specificTrip') {
				$state.go('carrier:create:trip:create');
			}
		};
	}
};
