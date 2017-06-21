'use strict';

var app = angular.module('lg-filter');

app.config(['$stateProvider', function($stateProvider) {

	$stateProvider.state({
		name: 'filter:create',
		url: '/create-filter',
		component: 'lgFilterCreateRoute'
	});

    $stateProvider.state({
        name: 'filter:list',
        url: '/list-filter',
        component: 'lgFilterListRoute',
    });

}]);

app.controller('FilterCreateCtrl', function FilterCreateCtrl($scope, $window, $stateParams, filter,
	user, connection, loader, carrier) {
	'ngInject';
	var ctrl = this;
	ctrl.filter = filter;
	ctrl.loader = loader;
	ctrl.carrier = carrier;
	ctrl.user = user;
	console.log('FilterCreateCtrl', arguments);
	this.$onInit = function() {
		console.log('FilterCreateCtrl init', arguments);
		connection.waitForCheckConnection('FilterCreateCtrl').then(function() {
			console.log('connection ok', $stateParams);
			ctrl.filter.createData.name = ctrl.user.current.content.login;
			ctrl.filter.createData.email = ctrl.user.current.email;
			ctrl.filter.createData.filterAccountId = ctrl.user.current.id;
			ctrl.filter.createData.adId = $stateParams.id;
			if ($stateParams.type === 'loader') {
				ctrl.filter.createData.titleAd = ctrl[$stateParams.type].current.content.title;
			} else {
				ctrl.filter.createData.titleAd = ctrl[$stateParams.type].current.content.truck.name;
			}
			ctrl.filter.createData.adAccountId = ctrl[$stateParams.type].current.content.userId;
			ctrl.filter.createData.adType = $stateParams.type;
			console.log('ctrl.filter.createData', ctrl.filter.createData);
			console.log('$stateParams', $stateParams);
		}).catch(function() {
			console.error('you should not see this');
		});
	};
});

app.controller('FilterListCtrl', function FilterCtrl($scope, user, filter) {
	'ngInject';
	var ctrl = this;
    ctrl.filter = filter;
    ctrl.user = user;
    this.$onInit = function() {
        this.truck.list();
    };
});

var filterCreateUrl = require('./tmpl/filter-create.html');
var filterListUrl = require('./tmpl/filter-list.html');

app.component('lgFilterCreateRoute', {
	templateUrl: filterCreateUrl,
	controller: 'FilterCreateCtrl',
});

app.component('lgFilterListRoute', {
	templateUrl: filterListUrl,
	controller: 'FilterListCtrl',
});

