(function() {
	'use strict';

	var app = angular.module('lg-loader', ['ui.router']);

	app.config(['$stateProvider', function($stateProvider) {

		$stateProvider.state({
			name: 'loader:createAdStep1',
			url: '/loader-create-ad',
			component: 'lgLoaderCreateAdStep1Route'
		});
		$stateProvider.state({
			name: 'loader:createAdStep2',
			url: '/loader-create-ad',
			component: 'lgLoaderCreateAdStep2Route'
		});
		$stateProvider.state({
			name: 'loader:updateAd',
			url: '/loader-update-ad',
			component: 'lgLoaderUpdateAdRoute'
		});
		$stateProvider.state({
			name: 'loader:listAd',
			url: '/loader-list',
			component: 'lgLoaderListAdRoute'
		});
		$stateProvider.state({
			name: 'loader:ad',
			url: '/loader-ad',
			component: 'lgLoaderAdRoute'
		});
		$stateProvider.state({
			name: 'loader:createProposal',
			url: '/loader-create-proposal',
			component: 'lgLoaderCreateProposalRoute'
		});
		$stateProvider.state({
			name: 'loader:createProposalSent',
			url: '/loader-create-proposal',
			component: 'lgLoaderCreateProposalSentRoute'
		});

	}]);

	app.service('loader', ['$injector', function Loader($injector) {
		var $http = $injector.get('$http');
		var $state = $injector.get('$state');
		this.user = $injector.get('user');

		var service = this;
		this.createData = {
			content: {
				countryDepart: 'Maroc',
				cityDepart: 'Oran',
				countryArrived: 'Algérie',
				cityArrived: 'Alger',
				loaderType: 'Classique',
				conditionment: 'Palettes',
				transportType: 'Camion',
				truckType: 'Frigo',
				loaderWeight: 'entre 100 et 200 kilos',
				preciseWeight: 'entre 100 et 200 kilos',
				volume: '200',
				priceWanted: '2300',
				adTimes: '15 jours',
			}
		};

		this.create = function() {
			console.log('loader->create');
			if (this.user.account === undefined) {
				$state.go('user:signin');
				return;
			}

			$http({
				url: 'ws/loader/create.php',
				method: 'POST',
				data: service.createData,
				headers: {'Content-Type': 'application/x-www-form-urlencoded'}
			}).then(function(response) {
				console.log('response', response);
				if (response.data.status === 'ko') {
					service.isAdloaderError = true;
					return;
				}
				service.isAdloaderError = false;
				service.ads = response.data.ads;
				$state.go('loader:createAdStep2');
			}).catch(function(error) {
				console.error('error', error);
			});
		};

		this.update = function() {
			console.log('loader->update');
			if (this.user.account === undefined) {
				$state.go('user:signin');
				return;
			}

			$http({
				url: 'ws/loader/update.php',
				method: 'POST',
				data: service.updateData,
				headers: {'Content-Type': 'application/x-www-form-urlencoded'}
			}).then(function(response) {
				console.log('response', response);
				if (response.data.status === 'ko') {
					service.isAdloaderError = true;
					return;
				}
				service.isAdloaderError = false;
				service.ads = response.data.ads;
				$state.go('loader:createAdStep2');
			}).catch(function(error) {
				console.error('error', error);
			});
		};

	}]);

	app.controller('LoaderCtrl', ['$scope', '$injector', function LoaderCtrl($scope, $injector) {
		this.user = $injector.get('user');
		this.loader = $injector.get('loader');
	}]);

	app.component('lgLoaderCreateAdStep1Route', {
		templateUrl: 'lg-loader/tmpl/loader-create-ad-step1.html',
		controller: 'LoaderCtrl',
	});

	app.component('lgLoaderCreateAdStep2Route', {
		templateUrl: 'lg-loader/tmpl/loader-create-ad-step2.html',
		controller: 'LoaderCtrl',
	});

	app.component('lgLoaderListAdRoute', {
		templateUrl: 'lg-loader/tmpl/loader-list-ad.html',
		controller: 'LoaderCtrl',
	});


})();
