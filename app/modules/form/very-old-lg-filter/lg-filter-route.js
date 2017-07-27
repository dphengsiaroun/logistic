const app = angular.module('lg-filter');

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

app.controller('FilterCtrl', function FilterCtrl($scope, user, filter) {
    'ngInject';
	const ctrl = this;
    ctrl.filter = filter;
    ctrl.user = user;
	console.log('FilterCtrl', arguments);
});

app.controller('FilterListCtrl', function FilterCtrl($scope, user, filter, loader) {
	'ngInject';
	const ctrl = this;
    ctrl.filter = filter;
	ctrl.loader = loader;
    ctrl.user = user;
    this.$onInit = function() {
        this.truck.list();
    };
});

const filterCreateUrl = require('./tmpl/filter-create.html');
const filterListUrl = require('./tmpl/filter-list.html');

app.component('lgFilterCreateRoute', {
	templateUrl: filterCreateUrl,
	controller: 'FilterCtrl',
});

app.component('lgFilterListRoute', {
	templateUrl: filterListUrl,
	controller: 'FilterListCtrl',
});

