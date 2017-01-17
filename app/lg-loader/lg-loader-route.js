'use strict';

var app = angular.module('lg-loader');

app.config(['$stateProvider', function($stateProvider) {

	$stateProvider.state({
		name: 'loader:list',
		url: '/ads/loaders',
		component: 'lgLoaderListRoute'
	});
	$stateProvider.state({
		name: 'loader:retrieve',
		url: '/loader/{id}',
		component: 'lgLoaderRetrieveRoute'
	});
	$stateProvider.state({
		name: 'loader:create',
		url: '/create-loader',
		component: 'lgLoaderCreateRoute'
	});
	$stateProvider.state({
		name: 'loader:created',
		url: '/create-loader',
		component: 'lgMessage',
		resolve: {
			service: function(user) {
				'ngInject';
				var login = user.account.content.login;
				console.log('login', login);
				var state = 'loader:list({login: \'' + login + '\'})';
				console.log('state', state);
				return {
					state: state,
					label: 'Revenir à la liste des chargements',
					message: 'Votre annonce de chargement a bien été ajoutée.'
				};
			}
		},
		needsUser: true,
		back: false
	});
	$stateProvider.state({
		name: 'loader:update',
		url: '/loader/{id}/update',
		component: 'lgLoaderUpdateRoute'
	});
	$stateProvider.state({
		name: 'loader:updated',
		url: '/updated-loader',
		component: 'lgMessage',
		resolve: {
			service: function(user, loader) {
				'ngInject';
				return user.waitForCheckConnection().then(function() {
					var login = user.account.content.login;
					console.log('login', login);
					var state = 'loader:list({login: \'' + login + '\'})';
					console.log('state', state);
					return {
						state: state,
						label: 'Revenir à la liste des chargements',
						message: 'Votre annonce de chargement a bien été modifiée.'
					};
				});
			}
		}
	});
	$stateProvider.state({
		name: 'loader:delete',
		url: '/loader/{id}/delete',
		component: 'lgConfirm',
		resolve: {
			service: function($rootScope, loader, $stateParams) {
				'ngInject';
				var result = {};
				result.doCancel = function() {
					$rootScope.back();
				};
				result.doConfirm = function() {
					loader.delete($stateParams.id).catch(function(error) {
						result.error = error;
					});
				};
				result.confirmationMsg = 'Voulez-vous vraiment supprimer cette annonce de chargement&nbsp;?';
				result.cancelMsg = 'Non, annuler';
				result.confirmMsg = 'Oui, supprimer';
				return result;
			}
		}
	});
	$stateProvider.state({
		name: 'loader:deleted',
		url: '/deleted-loader',
		component: 'lgMessage',
		resolve: {
			service: function(user, loader) {
				'ngInject';
				return user.waitForCheckConnection().then(function() {
					var login = user.account.content.login;
					console.log('login', login);
					var state = 'loader:list({login: \'' + login + '\'})';
					console.log('state', state);
					return {
						state: state,
						label: 'Revenir à la liste des chargements',
						message: 'Votre annonce de chargement a bien été supprimée.'
					};
				});
			}
		},
		back: false
	});

}]);

app.controller('LoaderListCtrl', ['$scope', '$injector', function LoaderCtrl($scope, $injector) {
	this.loader = $injector.get('loader');
	this.user = $injector.get('user');
	this.$onInit = function() {
		this.loader.list();
	};
}]);

app.controller('LoaderCtrl', ['$scope', '$injector', function LoaderCtrl($scope, $injector) {
	var ctrl = this;
	ctrl.loader = $injector.get('loader');
	ctrl.user = $injector.get('user');
	ctrl.isEditable = false;
	var $stateParams = $injector.get('$stateParams');
	console.log('ctrl.loader', ctrl.loader);
	console.log('$stateParams', $stateParams);
	ctrl.$onInit = function() {
		ctrl.loader.get($stateParams.id).then(function() {
			return ctrl.user.waitForCheckConnection();
		}).then(function() {
			ctrl.isEditable = (ctrl.loader.current.content.accountId === ctrl.user.account.id);
			console.log('ctrl.isEditable', ctrl.isEditable);
		}).catch(function() {
			ctrl.isEditable = false;
			console.log('ctrl.isEditable', ctrl.isEditable);
		});
	};
}]);

app.controller('LoaderCreateCtrl', function LoaderCreateCtrl($scope, $injector) {
	'ngInject';
	var ctrl = this;
	this.loader = $injector.get('loader');
	this.user = $injector.get('user');
	$scope.$watchGroup(['$ctrl.loader.createData.height', '$ctrl.loader.createData.deep',
		'$ctrl.loader.createData.width'], function() {
		ctrl.loader.createData.volume = ctrl.loader.createData.height *
			ctrl.loader.createData.deep * ctrl.loader.createData.width;
		ctrl.loader.createData.volume =	Number((ctrl.loader.createData.volume).toFixed(2));
		ctrl.volumeStr = ctrl.loader.createData.volume + ' m3';
		console.log('ctrl.loader.createData.volume', ctrl.loader.createData.volume);
	}, true);
});

app.controller('LoaderUpdateCtrl', function LoaderUpdateCtrl($scope, loader, user, $stateParams) {
	'ngInject';
	var ctrl = this;
	ctrl.loader = loader;
	ctrl.user = user;
	this.$onInit = function() {
		this.loader.get($stateParams.id).then(function() {
			return ctrl.user.waitForCheckConnection();
		}).then(function() {
			ctrl.loader.updateData = angular.copy(ctrl.loader.current.content);
			ctrl.loader.updateData.id = $stateParams.id;
			console.log('ctrl.loader.updateData', ctrl.loader.updateData);
		}).catch(function() {
			console.error('you should not see this');
		});
	};
});

var loaderCreateUrl = require('./tmpl/loader-create.html');
var loaderListUrl = require('./tmpl/loader-list.html');
var loaderDetailUrl = require('./tmpl/loader-detail.html');
var loaderUpdateUrl = require('./tmpl/loader-update.html');

app.component('lgLoaderCreateRoute', {
	templateUrl: loaderCreateUrl,
	controller: 'LoaderCreateCtrl',
});

app.component('lgLoaderListRoute', {
	templateUrl: loaderListUrl,
	controller: 'LoaderListCtrl',
});

app.component('lgLoaderRetrieveRoute', {
	templateUrl: loaderDetailUrl,
	controller: 'LoaderCtrl',
});

app.component('lgLoaderUpdateRoute', {
	templateUrl: loaderUpdateUrl,
	controller: 'LoaderUpdateCtrl',
});

