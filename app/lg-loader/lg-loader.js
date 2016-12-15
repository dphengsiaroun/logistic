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
			name: 'loader:listAd',
			url: '/loader-list',
			component: 'lgLoaderListAdRoute'
		});
		$stateProvider.state({
			name: 'loader:detailAd',
			url: '/loader-detail-ad',
			component: 'lgLoaderDetailAdRoute'
		});
		$stateProvider.state({
			name: 'loader:listMyAd',
			url: '/loader-list-my-ad',
			component: 'lgLoaderListMyAdRoute'
		});
		$stateProvider.state({
			name: 'loader:detailMyAd',
			url: '/loader-detail-my-ad',
			component: 'lgLoaderDetailMyAdRoute'
		});
		$stateProvider.state({
			name: 'loader:updateMyAd',
			url: '/loader-update-my-ad',
			component: 'lgLoaderUpdateMyAdRoute'
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
		$stateProvider.state({
			name: 'loader:adDeleted',
			url: '/loader_ad_delete',
			component: 'lgMessage',
			resolve: {
				service: function() {
					return {
						state: 'home',
						label: 'Accueil',
						message: 'Votre annonce a bien été supprimé.'
					}
				}
			},
			back: false
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

		this.delete = function() {
			console.log('user->delete');
			
			$http({
				url:  'ws/loader/delete.php',
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
				service.ads = undefined;
				$state.go('loader:adDeleted');
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

	app.component('lgLoaderDetailAdRoute', {
		templateUrl: 'lg-loader/tmpl/loader-detail-ad.html',
		controller: 'LoaderCtrl',
	});

	app.component('lgLoaderListMyAdRoute', {
		templateUrl: 'lg-loader/tmpl/loader-list-my-ad.html',
		controller: 'LoaderCtrl',
	});

	app.component('lgLoaderDetailMyAdRoute', {
		templateUrl: 'lg-loader/tmpl/loader-detail-my-ad.html',
		controller: 'LoaderCtrl',
	});

	app.component('lgLoaderUpdateMyAdRoute', {
		templateUrl: 'lg-loader/tmpl/loader-update-my-ad.html',
		controller: 'LoaderCtrl',
	});

	app.component('lgLoaderCreateProposalRoute', {
		templateUrl: 'lg-loader/tmpl/loader-create-proposal.html',
		controller: 'LoaderCtrl',
	});


})();
