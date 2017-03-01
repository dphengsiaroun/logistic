'use strict';

var app = angular.module('lg-carrier');

app.config(['$stateProvider', function ($stateProvider) {

	$stateProvider.state({
		name: 'carrier:create',
		url: '/carrier-create',
		component: 'lgCarrierCreateRoute',
	});
	$stateProvider.state({
		name: 'carrier:create:truck:choose',
		url: '/carrier-create/truck-choose',
		component: 'lgCarrierCreateTruckChooseRoute',
	});
	$stateProvider.state({
		name: 'carrier:create:truck:create',
		url: '/carrier-create/truck-create',
		component: 'lgCarrierCreateTruckCreateRoute',
	});
	$stateProvider.state({
		name: 'carrier:created',
		url: '/created-carrier',
		component: 'lgMessage',
		resolve: {
			service: function (user) {
				'ngInject';
				var login = user.account.content.login;
				console.log('login', login);
				var state = 'carrier:list({login: \'' + login + '\'})';
				console.log('state', state);
				return {
					state: state,
					label: 'Revenir à la liste des chargements',
					message: 'Votre annonce de transport a bien été ajoutée.'
				};
			}
		},
		needsUser: true
	});



}]);

var carrierCreateUrl = require('./tmpl/carrier-create.html');
app.component('lgCarrierCreateRoute', {
	templateUrl: carrierCreateUrl
});

var carrierCreateTruckChooseUrl = require('./tmpl/carrier-create-truck-choose.html');
app.component('lgCarrierCreateTruckChooseRoute', {
	templateUrl: carrierCreateTruckChooseUrl,
	controller: function lgCarrierCreateTruckChooseRouteCtrl(truck) {
		'ngInject';
		var ctrl = this;
		ctrl.hasTruck = false;
		truck.empty().then(function() {
			ctrl.hasTruck = true;
		}).catch(function() {
			ctrl.hasTruck = false;
		});
	}
});

var lgCarrierCreateTruckCreateUrl = require('./tmpl/carrier-create-truck-create.html');
app.component('lgCarrierCreateTruckCreateRoute', {
	templateUrl: lgCarrierCreateTruckCreateUrl
});
