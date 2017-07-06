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
        url: '/created-loader',
        component: 'lgMessage',
        resolve: {
            service: function(user) {
                'ngInject';
                var login = user.current.content.login;
                console.log('login', login);
                var state = 'loader:list({login: \'' + login + '\'})';
                console.log('state', state);
                return {
                    state: state,
                    label: 'Voir les annonces de chargements',
                    message: 'Votre annonce de chargement a bien été ajoutée.'
                };
            }
        },
        needsUser: true
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
            service: function(connection, user, loader) {
                'ngInject';
                return connection.waitForCheckConnection('loader:updated').then(function() {
                    var login = user.current.content.login;
                    console.log('login', login);
                    var state = 'loader:list({login: \'' + login + '\'})';
                    console.log('state', state);
                    return {
                        state: state,
                        label: 'Voir les annonces de chargements',
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
            service: function(connection, user, loader) {
                'ngInject';
                return connection.waitForCheckConnection('loader:deleted').then(function() {
                    var login = user.current.content.login;
                    console.log('login', login);
                    var state = 'loader:list({login: \'' + login + '\'})';
                    console.log('state', state);
                    return {
                        state: state,
                        label: 'Voir les annonces de chargements',
                        message: 'Votre annonce de chargement a bien été supprimée.'
                    };
                });
            }
        }
    });
}]);

app.controller('LoaderListCtrl', function LoaderListCtrl(loader) {
	'ngInject';
	var ctrl = this;
    ctrl.loader = loader;
    ctrl.$onInit = function() {
        loader.list().then(function(loaders) {
			console.log('loaders', loaders);
			ctrl.loaders = loaders;
		}).catch(function(error) {
			console.error('error', error);
		});
    };

});

app.controller('LoaderCtrl', function LoaderCtrl($scope, $stateParams, loader, user, connection) {
	'ngInject';
    var ctrl = this;
    ctrl.loader = loader;
    ctrl.user = user;
    ctrl.isEditable = false;
    console.log('ctrl.loader', ctrl.loader);
    console.log('$stateParams', $stateParams);
    ctrl.$onInit = function() {
        ctrl.loader.get($stateParams.id).then(function() {
            return connection.waitForCheckConnection('LoaderCtrl');
        }).then(function() {
            ctrl.isEditable = (ctrl.loader.current.content.userId === ctrl.user.current.id);
            console.log('ctrl.isEditable', ctrl.isEditable);
        }).catch(function() {
            ctrl.isEditable = false;
            console.log('ctrl.isEditable', ctrl.isEditable);
        });
    };
});

app.controller('LoaderCreateCtrl', function LoaderCreateCtrl(
    $scope, $element, $http, $q, $window, $filter, loader, user, geoloc) {
    'ngInject';
    var ctrl = this;
    ctrl.user = user;
    ctrl.loader = loader;
    $scope.$watchGroup(['$ctrl.loader.createData.dimension.height', '$ctrl.loader.createData.dimension.depth',
        '$ctrl.loader.createData.dimension.width'
    ], function() {
        if (ctrl.loader.createData.dimension === undefined) {
            return;
        }
        ctrl.loader.createData.volume = ctrl.loader.createData.dimension.height *
            ctrl.loader.createData.dimension.depth * ctrl.loader.createData.dimension.width;
        ctrl.loader.createData.volume = Number((ctrl.loader.createData.volume).toFixed(2));
        console.log('ctrl.loader.createData.volume', ctrl.loader.createData.volume);
        if (ctrl.user.current) {
            ctrl.loader.createData.phone = ctrl.user.current.content.phone;
        }
        
    });

    geoloc.updateInfoRoute($scope, '$ctrl.loader.createData');

    ctrl.editDimension = function() {
        console.log('editDimension', arguments);
        var dimensionElt = $element.find('lg-dimension');
        console.log('dimensionElt', dimensionElt);
        var dimensionCtrl = dimensionElt.controller('lgDimension');
        console.log('dimensionCtrl', dimensionCtrl);
        dimensionCtrl.start();
    };

    $scope.$watchGroup(['$ctrl.loader.createData.departureDatetime', '$ctrl.loader.createData.arrivalDatetime'],
        function() {
            console.log('$ctrl.loader.createData.infoDuration update');
            if (!(ctrl.loader.createData.departureDatetime && ctrl.loader.createData.arrivalDatetime)) {
                ctrl.loader.createData.infoDuration = '';
                return;
            }
            ctrl.loader.createData.infoDuration = 'Durée effective : <b>' +
                $filter('duration')((ctrl.loader.createData.arrivalDatetime -
                    ctrl.loader.createData.departureDatetime) / 1000) +
                '</b>';
        }
    );
});

app.controller('LoaderUpdateCtrl', function LoaderUpdateCtrl($scope, loader, user, $stateParams, connection) {
    'ngInject';
    var ctrl = this;
    ctrl.loader = loader;
    ctrl.user = user;
    this.$onInit = function() {
        this.loader.get($stateParams.id).then(function() {
            return connection.waitForCheckConnection('LoaderUpdateCtrl');
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
