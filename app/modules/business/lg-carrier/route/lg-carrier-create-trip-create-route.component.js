import lgCarrierCreateTripCreateHtml from '../tmpl/carrier-create-trip-create.html';
import { breadcrumb } from '../carrier.breadcrumb.js';

export const lgCarrierCreateTripCreateRoute = {
	template: lgCarrierCreateTripCreateHtml,
	controller: function LgCarrierCreateTripCreateRouteCtrl(
		$scope, $state, $filter, connection, carrier, geoloc, formValidator) {
		'ngInject';

		this.breadcrumb = breadcrumb;
		this.fv = formValidator;
		if (carrier.type === 'create') {
			this.tripData = {};
		} else {
			this.tripData = carrier.stepData.trip;

		}
		this.addTrip = () => {
			carrier.stepData.trip = this.tripData;
			if (carrier.type === 'create') {
				$state.go('carrier:create');
			} else {
				$state.go('carrier:' + carrier.type, { login: connection.user.content.login, id: carrier.current.id });
			}
		};

		geoloc.updateInfoRoute($scope, '$ctrl.tripData');

		$scope.$watch('$ctrl.tripData.departureDatetime', (newValue, oldValue) => {
			console.log('watch date', arguments);
			if (this.tripData.infoRoute === '') {
				this.tripData.arrivalDatetime = '';
			} else {
				if (this.tripData.departureDatetime && oldValue === undefined) {
					this.tripData.arrivalDatetime =
						new Date(this.tripData.departureDatetime.getTime() + 
						this.tripData.minDuration * 1000);
				}
			}
		});

		$scope.$watchGroup(['$ctrl.tripData.departureDatetime', '$ctrl.tripData.arrivalDatetime'],
			(newValues, oldValues) => {

				if (!(this.tripData.departureDatetime && this.tripData.arrivalDatetime)) {
					this.tripData.infoDuration = '';
					return;
				}
				this.tripData.infoDuration = 'Durée effective : <b>' +
					$filter('duration')((this.tripData.arrivalDatetime -
						this.tripData.departureDatetime) / 1000) +
					'</b>';

			}
		);

	}
};
