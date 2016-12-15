(function() {
	'use strict';

	var app = angular.module('lg-truck', ['ui.router']);

	app.config(['$stateProvider', function($stateProvider) {

		$stateProvider.state({
			name: 'truck:list',
			url: '/truck-list',
			component: 'lgTruckListRoute'
		});
		$stateProvider.state({
			name: 'truck:detail',
			url: '/truck-detail',
			component: 'lgTruckDetailRoute'
		});
		$stateProvider.state({
			name: 'truck:updateMyTruck',
			url: '/truck-update',
			component: 'lgTruckUpdateRoute'
		});
		$stateProvider.state({
			name: 'truck:update',
			url: '/truck_update',
			component: 'lgMessage',
			resolve: {
				service: function() {
					return {
						state: 'home',
						label: 'Accueil',
						message: 'Votre camion a bien été ajouté à votre liste.'
					}
				}
			},
			back: false
		});
		$stateProvider.state({
			name: 'truck:deleted',
			url: '/truck_delete',
			component: 'lgMessage',
			resolve: {
				service: function() {
					return {
						state: 'home',
						label: 'Accueil',
						message: 'Votre camion a bien été supprimé.'
					}
				}
			},
			back: false
		});

	}]);

	app.service('truck', ['$injector', function Truck($injector) {
		var $http = $injector.get('$http');
		var $state = $injector.get('$state');
		this.user = $injector.get('user');

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
			console.log('updateTruck->update');
			if (this.user.account === undefined) {
				$state.go('user:signin');
				return;
			}

			$http({
				url: 'ws/truck/update.php',
				method: 'POST',
				data: service.updateData,
				headers: {'Content-Type': 'application/x-www-form-urlencoded'}
			}).then(function(response) {
				console.log('response', response);
				if (response.data.status === 'ko') {
					service.isTruckcarrierError = true;
					return;
				}
				service.isTruckcarrierError = false;
				service.trucks = response.data.trucks;
				$state.go('truck:update');
			}).catch(function(error) {
				console.error('error', error);
			});
		};

		this.delete = function() {
			console.log('user->delete');
			
			$http({
				url:  'ws/truck/delete.php',
				method: 'POST',
				data: {
					id: service.ads.id
				},
				headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
			}).then(function(response) {
				console.log('response', response);
				if (response.data.status === "ko") {
					service.isDeleteError = true;
					return;
				}
				service.isDeleteError = false;
				service.trucks = undefined;
				$state.go('truck:deleted');
			});
		};

	}]);

	app.controller('TruckCtrl', ['$scope', '$injector', function TruckCtrl($scope, $injector) {
		this.user = $injector.get('user');
		this.truck = $injector.get('truck');
	}]);

	app.component('lgTruckListRoute', {
		templateUrl: 'lg-truck/tmpl/truck-list.html',
		controller: 'TruckCtrl',
	});

	app.component('lgTruckDetailRoute', {
		templateUrl: 'lg-truck/tmpl/truck-detail.html',
		controller: 'TruckCtrl',
	});

	app.component('lgTruckUpdateRoute', {
		templateUrl: 'lg-truck/tmpl/truck-update.html',
		controller: 'TruckCtrl',
	});


})();
