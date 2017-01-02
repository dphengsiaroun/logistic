'use strict';

module.exports = 'lg-carrier';

var app = angular.module(module.exports, ['ui.router']);

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
		url: '/carrier-list-ad',
		component: 'lgCarrierListAdRoute'
	});
	$stateProvider.state({
		name: 'carrier:detailAd',
		url: '/carrier-detail-ad',
		component: 'lgCarrierDetailAdRoute'
	});
	$stateProvider.state({
		name: 'carrier:listMyAd',
		url: '/carrier-list-my-ad',
		component: 'lgCarrierListMyAdRoute'
	});
	$stateProvider.state({
		name: 'carrier:detailMyAd',
		url: '/carrier-detail-my-ad',
		component: 'lgCarrierDetailMyAdRoute'
	});
	$stateProvider.state({
		name: 'carrier:updateMyAd',
		url: '/carrier-update-my-ad',
		component: 'lgCarrierUpdateMyAdRoute'
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
	$stateProvider.state({
		name: 'carrier:adDeleted',
		url: '/carrier_ad_delete',
		component: 'lgMessage',
		resolve: {
			service: function() {
				return {
					state: 'home',
					label: 'Accueil',
					message: 'Votre annonce a bien été supprimé.'
				};
			}
		},
		back: false
	});
	$stateProvider.state({
		name: 'carrier:truckAdd',
		url: '/carrier_truck_add',
		component: 'lgMessage',
		resolve: {
			service: function() {
				return {
					state: 'home',
					label: 'Accueil',
					message: 'Votre camion a bien été ajouté.'
				};
			}
		},
		back: false
	});

}]);

app.service('carrier', ['$injector', function Carrier($injector) {
	var $http = $injector.get('$http');
	var $state = $injector.get('$state');
	this.user = $injector.get('user');

	var service = this;
	this.createData = {
		content: {
			type: 'Bâche',
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
			headers: {'Content-Type': 'application/x-www-form-urlencoded'}
		}).then(function(response) {
			console.log('response', response);
			if (response.data.status === 'ko') {
				service.isAdcarrierError = true;
				return;
			}
			service.isAdcarrierError = false;
			service.ads = response.data.ads;
			$state.go('carrier:createAdStep2');
		}).catch(function(error) {
			console.error('error', error);
		});
	};

	this.createTruck = function() {
		console.log('carrier->createTruck');
		if (this.user.account === undefined) {
			$state.go('user:signin');
			return;
		}

		$http({
			url: 'ws/truck/create.php',
			method: 'POST',
			data: service.createData,
			headers: {'Content-Type': 'application/x-www-form-urlencoded'}
		}).then(function(response) {
			console.log('response', response);
			if (response.data.status === 'ko') {
				service.isTruckcarrierError = true;
				return;
			}
			service.isTruckcarrierError = false;
			service.ads = response.data.ads;
			$state.go('carrier:truckAdd');
		}).catch(function(error) {
			console.error('error', error);
		});
	};

	var service = this;
	this.updateData = {
		content: {
			type: 'benne',
			country: 'Algerie',
			city: 'Alger',
			conditioning: 'Palette',
			birthyear: '2008',
		}
	};

	this.update = function() {
		console.log('carrier->update');
		if (this.user.account === undefined) {
			$state.go('user:signin');
			return;
		}

		$http({
			url: 'ws/carrier/update.php',
			method: 'POST',
			data: service.updateData,
			headers: {'Content-Type': 'application/x-www-form-urlencoded'}
		}).then(function(response) {
			console.log('response', response);
			if (response.data.status === 'ko') {
				service.isAdcarrierError = true;
				return;
			}
			service.isAdcarrierError = false;
			service.ads = response.data.ads;
			$state.go('carrier:createAdStep2');
		}).catch(function(error) {
			console.error('error', error);
		});
	};

	this.delete = function() {
		console.log('user->delete');

		$http({
			url: 'ws/carrier/delete.php',
			method: 'POST',
			data: {
				id: service.ads.id
			},
			headers: {'Content-Type': 'application/x-www-form-urlencoded'}
		}).then(function(response) {
			console.log('response', response);
			if (response.data.status === 'ko') {
				service.isDeleteError = true;
				return;
			}
			service.isDeleteError = false;
			service.ads = undefined;
			$state.go('carrier:adDeleted');
		});
	};

}]);

app.controller('CarrierCtrl', ['$scope', '$injector', function CarrierCtrl($scope, $injector) {
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

app.component('lgCarrierListAdRoute', {
	templateUrl: 'lg-carrier/tmpl/carrier-list-ad.html',
	controller: 'CarrierCtrl',
});

app.component('lgCarrierDetailAdRoute', {
	templateUrl: 'lg-carrier/tmpl/carrier-detail-ad.html',
	controller: 'CarrierCtrl',
});

app.component('lgCarrierListMyAdRoute', {
	templateUrl: 'lg-carrier/tmpl/carrier-list-my-ad.html',
	controller: 'CarrierCtrl',
});

app.component('lgCarrierDetailMyAdRoute', {
	templateUrl: 'lg-carrier/tmpl/carrier-detail-my-ad.html',
	controller: 'CarrierCtrl',
});

app.component('lgCarrierUpdateMyAdRoute', {
	templateUrl: 'lg-carrier/tmpl/carrier-update-my-ad.html',
	controller: 'CarrierCtrl',
});

app.component('lgCarrierCreateProposalRoute', {
	templateUrl: 'lg-carrier/tmpl/carrier-create-proposal.html',
	controller: 'CarrierCtrl',
});

