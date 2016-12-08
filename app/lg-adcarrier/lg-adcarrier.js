(function() {
	'use strict';

	var app = angular.module('lg-adcarrier', []);

	app.controller('AdCarrierCtrl', ['$scope', '$injector', function($scope, $injector) {
		var $http = $injector.get('$http');
		var $location = $injector.get('$location');
		var $window = $injector.get('$window');

		var ctrl = this;

		this.adcarrierData = {
			content: {
				type: 'bache',
				country: 'Algerie',
				city: 'Alger',
				conditioning: 'Palette',
				birthyear: '2008',
			}
		};

		this.insertadcarrier = function() {
			console.log('insert ad carrier');
			var data = angular.copy(ctrl.adcarrierData);
			
			$http({
				url: 'ws/insertAdCarrier.php',
				method: 'POST',
				data: data,
				headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
			}).then(function(response) {
				console.log('response', response);
				if (response.data.status === "ko") {
					ctrl.isAdcarrierError = true;
					return;
				}
				ctrl.isAdcarrierError = false;
				ctrl.ads = response.data.ads;
				$location.path('/carrier-create-ad-step2');
			});
		};
	}]);
})();
