(function() {
	'use strict';

	var app = angular.module('lg-carrier', ['ui.router']);

	app.config(['$stateProvider', function($stateProvider) {

		$stateProvider.state({
			name: 'carrier:createAdStep1',
			url: '/carrier-create-ad',
			component: 'lgCarrierCreateAdStep1Route'
		});
		$stateProvider.state({
			name: 'carrier:createAdStep2',
			url: '/carrier-create-ad',
			component: 'lgCarrierCreateAdStep2Route'
		});
		$stateProvider.state({
			name: 'carrier:listAd',
			url: '/carrier-list',
			component: 'lgCarrierListAdRoute'
		});
		$stateProvider.state({
			name: 'carrier:ad',
			url: '/carrier-ad',
			component: 'lgCarrierAdRoute'
		});
		$stateProvider.state({
			name: 'carrier:createProposal',
			url: '/carrier-create-proposal',
			component: 'lgCarrierCreateProposalRoute'
		});
		$stateProvider.state({
			name: 'carrier:createProposalSent',
			url: '/carrier-create-proposal',
			component: 'lgCarrierCreateProposalSentRoute'
		});
		
	}]);

	app.service('carrier', ['$injector', function($injector) {
		var $http = $injector.get('$http');
		var $state = $injector.get('$state');
		var $window = $injector.get('$window');
		this.user = $injector.get('user');

		var service = this;
		this.createData = {
			content: {
				type: 'bache',
				country: 'Algerie',
				city: 'Alger',
				conditioning: 'Palette',
				birthyear: '2008',
			}
		};

		this.create = function() {
			console.log('carrier->create');
			if (this.user.account === undefined) {
				$state.go('user:signin');
				return;
			}
			
			$http({
				url: 'ws/carrier/create.php',
				method: 'POST',
				data: service.createData,
				headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
			}).then(function(response) {
				console.log('response', response);
				if (response.data.status === "ko") {
					ctrl.isAdcarrierError = true;
					return;
				}
				service.isAdcarrierError = false;
				service.ads = response.data.ads;
				$state.go('carrier:createAdStep2');
			});
		};

	}]);

	app.controller('CarrierCtrl', ['$scope', '$injector', function($scope, $injector) {
		this.user = $injector.get('user');
		this.carrier = $injector.get('carrier');

	}]);

	app.component('lgCarrierCreateAdStep1Route', {
		templateUrl: 'lg-carrier/tmpl/carrier-create-ad-step1.html',
		controller: 'CarrierCtrl',
	});

	app.component('lgCarrierCreateAdStep2Route', {
		templateUrl: 'lg-carrier/tmpl/carrier-create-ad-step2.html',
		controller: 'CarrierCtrl',
	});

	

})();
